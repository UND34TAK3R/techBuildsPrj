import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/Firebase/firebase'; // Adjust the import based on your firebase configuration
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getClosestBuild } from '../BuilderAuth/buildAuth'; // Adjust based on your path to the function
import { useAuth } from '../../backend/Context/authContext'; // Adjust based on your auth context
import CoolerFilter from 'components/Filters/CoolerFilter';
import '../../css/filter.css';

function CPU_Cooler() {
    const [coolers, setCoolers] = useState([]);
    const navigate = useNavigate();
    const { CurrentUser } = useAuth();
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pendingFilters, setPendingFilters] = useState({});


    useEffect(() => {
    const fetchData = async () => {
        try {
            const coolerCollection = collection(db, 'Cooler');
            let queryConstraints = [];

            // Conditionally add filters if they exist
            if (appliedFilters.brand?.length > 0) {
                queryConstraints.push(where('brand', 'in', appliedFilters.brand));
            }
            if (appliedFilters.cooler_type?.length > 0) {
                queryConstraints.push(where('cooler_type', 'in', appliedFilters.cooler_type));
            }
            if (appliedFilters.price) {
                const { min, max } = appliedFilters.price;
                queryConstraints.push(where('price', '>=', min), where('price', '<=', max));
            }
            if (appliedFilters.fan_height) {
                const { min, max } = appliedFilters.fan_height;
                queryConstraints.push(where('fan_height', '>=', min), where('fan_height', '<=', max));
            }
            // Execute the query with the accumulated constraints
            const coolerQuery = query(coolerCollection, ...queryConstraints);
            const querySnapshot = await getDocs(coolerQuery);

            // Map query results to an array and update state
            const coolerList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setCoolers(coolerList);
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


    const handleAddToBuild = async (coolerId) => {
        try {
            // Get the closest build for the current user
            const closestBuild = await getClosestBuild(CurrentUser);
            if (closestBuild) {
                // Reference the specific build document
                const buildRef = doc(db, 'Build', closestBuild.id);

                // Update the build document with the selected cooler ID
                await updateDoc(buildRef, {
                    cooler_id: coolerId,
                });

                // Navigate back to the Builder page after update
                navigate('/Builder');
            } else {
                console.log("No builds found for this user.");
            }
        } catch (error) {
            console.error("Error updating build with CPU cooler ID:", error);
        }
    };

    return (
        <div className="case-page"><CoolerFilter filters={pendingFilters} 
            onFilterChange={handleFilterChange} 
            onApplyFilters={handleApplyFilters} 
            onResetFilters={handleResetFilters}  />
            <div className="case-table">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Brand</th>
                        <th scope="col">Model</th>
                        <th scope="col">Type</th>
                        <th scope="col">Noise Level</th>
                        <th scope="col">Size</th>
                        <th scope="col">Price</th>
                        <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                    {coolers.map((item) => (
                        <tr key={item.id}>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.cooler_type}</td>
                            <td>{item.max_noize}</td>
                            <td>{item.fan_height}</td>
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

export default CPU_Cooler;
