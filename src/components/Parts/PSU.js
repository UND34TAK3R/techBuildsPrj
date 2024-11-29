import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/Firebase/firebase'; // Adjust the import based on your firebase configuration
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getClosestBuild } from '../BuilderAuth/buildAuth'; // Adjust based on your path to the function
import { useAuth } from '../../backend/Context/authContext'; // Adjust based on your auth context
import PSUFilter from 'components/Filters/PSUFilter';
import '../../css/filter.css';

function PSU() {
    const [psu, setPSU] = useState([]);
    const navigate = useNavigate();
    const { CurrentUser } = useAuth();
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pendingFilters, setPendingFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const psuCollection = collection(db, 'PSU');
                let queryConstraints = [];

                // Conditionally add filters if they exist
                if (appliedFilters.brand?.length > 0) {
                    queryConstraints.push(where('brand', 'in', appliedFilters.brand));
                }
                if (appliedFilters.efficiency_rating?.length > 0) {
                    queryConstraints.push(where('efficiency_rating', 'in', appliedFilters.efficiency_rating));
                }
                if (appliedFilters.modularity?.length > 0) {
                    queryConstraints.push(where('modularity', 'in', appliedFilters.modularity));
                }
                if (appliedFilters.form_factor?.length > 0) {
                    queryConstraints.push(where('form_factor', 'in', appliedFilters.form_factor));
                }
                if (appliedFilters.price) {
                    const { min, max } = appliedFilters.price;
                    queryConstraints.push(where('price', '>=', min), where('price', '<=', max));
                }
                if (appliedFilters.wattage) {
                    const { min, max } = appliedFilters.wattage;
                    queryConstraints.push(where('wattage', '>=', min), where('wattage', '<=', max));
                }
                // Execute the query with the accumulated constraints
                const psuQuery = query(psuCollection, ...queryConstraints);
                const querySnapshot = await getDocs(psuQuery);

                // Map query results to an array and update state
                const psuList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setPSU(psuList);
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


    const handleAddToBuild = async (psuId) => {
        try {
            // Get the closest build for the current user
            const closestBuild = await getClosestBuild(CurrentUser);
            if (closestBuild) {
                // Reference the specific build document
                const buildRef = doc(db, 'Build', closestBuild.id);

                // Update the build document with the selected PSU ID
                await updateDoc(buildRef, {
                    psu_id: psuId, // Assuming you're adding the PSU ID here
                });

                // Navigate back to the Builder page after update
                navigate('/Builder');
            } else {
                console.log("No builds found for this user.");
            }
        } catch (error) {
            console.error("Error updating build with PSU ID:", error);
        }
    };

    return (
        <div className="cpu-page">
            <PSUFilter filters={pendingFilters} 
                onFilterChange={handleFilterChange} 
                onApplyFilters={handleApplyFilters} 
                onResetFilters={handleResetFilters}  />
            <div className="cpu-table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Brand</th>
                            <th scope="col">Model</th>
                            <th scope="col">Form Factor</th>
                            <th scope="col">Efficiency Rating</th>
                            <th scope="col">Wattage</th>
                            <th scope="col">Modularity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {psu.map((item) => (
                            <tr key={item.psu_id}>
                                <td className='text-white'>{item.brand}</td>
                                <td className='text-white'>{item.model}</td>
                                <td className='text-white'>{item.form_factor}</td>
                                <td className='text-white'>{item.efficiency_rating}</td>
                                <td className='text-white'>{item.wattage}</td>
                                <td className='text-white'>{item.modularity}</td>
                                <td className='text-white'>{item.price}</td>
                                <td>
                                    <button className='btn btn-outline-light' onClick={() => handleAddToBuild(item.id)}>
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

export default PSU;
