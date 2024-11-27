import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/Firebase/firebase'; // Adjust the import based on your firebase configuration
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getClosestBuild } from '../BuilderAuth/buildAuth';
import { useAuth } from '../../backend/Context/authContext'; // Adjust based on your auth context
import CaseFilter from 'components/Filters/CaseFilter';
import '../../css/filter.css';

function Case() {
    const [cases, setCases] = useState([]);
    const navigate = useNavigate();
    const { CurrentUser } = useAuth();
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pendingFilters, setPendingFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const caseCollection = collection(db, 'Case');
                let queryConstraints = [];

                // Conditionally add filters if they exist
                if (appliedFilters.brand?.length > 0) {
                    queryConstraints.push(where('brand', 'in', appliedFilters.brand));
                }
                if (appliedFilters.color?.length > 0) {
                    queryConstraints.push(where('color', 'in', appliedFilters.color));
                }
                if (appliedFilters.material?.length > 0) {
                    queryConstraints.push(where('material', 'in', appliedFilters.material));
                }
                if (appliedFilters.type?.length > 0) {
                    queryConstraints.push(where('type', 'in', appliedFilters.type));
                }
                if (appliedFilters.form_factor?.length > 0) {
                    queryConstraints.push(where('form_factor', 'in', appliedFilters.form_factor));
                }
                if (appliedFilters.price) {
                    const { min, max } = appliedFilters.price;
                    queryConstraints.push(where('price', '>=', min), where('price', '<=', max));
                }
                if (appliedFilters.max_gpu_length) {
                    const { min, max } = appliedFilters.max_gpu_length;
                    queryConstraints.push(where('max_gpu_length', '>=', min), where('max_gpu_length', '<=', max));
                }
                if (appliedFilters.max_cooler_height) {
                    const { min, max } = appliedFilters.max_cooler_height;
                    queryConstraints.push(where('max_cooler_height', '>=', min), where('max_cooler_height', '<=', max));
                }
                // Execute the query with the accumulated constraints
                const caseQuery = query(caseCollection, ...queryConstraints);
                const querySnapshot = await getDocs(caseQuery);

                // Map query results to an array and update state
                const caseList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setCases(caseList);
            } catch (error) {
                console.error("Error fetching data with filters:", error);
            }
        };

        fetchData();
    }, [appliedFilters]);

    const handleFilterChange = (key, value) => {
        setPendingFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleApplyFilters = () => {
        setAppliedFilters(pendingFilters); // Apply the pending filters
    };

    const handleResetFilters = () => {
        setPendingFilters({});
        setAppliedFilters({}); // Reset to show all Cases
    };

    const handleAddToBuild = async (caseId) => {
        try {
            // Get the closest build for the current user
            const closestBuild = await getClosestBuild(CurrentUser);
            if (closestBuild) {
                // Reference the specific build document
                const buildRef = doc(db, 'Build', closestBuild.id);

                // Update the build document with the selected case ID
                await updateDoc(buildRef, {
                    case_id: caseId,
                });

                // Navigate back to the Builder page after update
                navigate('/Builder');
            } else {
                console.log("No builds found for this user.");
            }
        } catch (error) {
            console.error("Error updating build with case ID:", error);
        }
    };

    return (
        <div className="case-page"><CaseFilter filters={pendingFilters} 
            onFilterChange={handleFilterChange} 
            onApplyFilters={handleApplyFilters} 
            onResetFilters={handleResetFilters}  />
            <div className="case-table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Brand</th>
                            <th scope="col">Model</th>
                            <th scope="col">Form Factor</th>
                            <th scope="col">Color</th>
                            <th scope="col">Material</th>
                            <th scope="col">Volume</th>
                            <th scope="col">Fan Count</th>
                            <th scope="col">Price</th>
                            <th scope="col">Selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map((item) => (
                            <tr key={item.id}>
                                <td>{item.brand}</td>
                                <td>{item.model}</td>
                                <td>{item.form_factor}</td>
                                <td>{item.color}</td>
                                <td>{item.material}</td>
                                <td>{item.volume}</td>
                                <td>{item.fan_count}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button onClick={() => handleAddToBuild(item.id)}>
                                        Add To Build
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Case;
