import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/Firebase/firebase'; // Adjust the import based on your firebase configuration
import { collection, getDocs, doc, updateDoc, where, query } from 'firebase/firestore';
import { getClosestBuild } from '../BuilderAuth/buildAuth'; // Adjust based on your path to the function
import { useAuth } from '../../backend/Context/authContext'; // Adjust based on your auth context
import RAMFilter from 'components/Filters/RAMFilter';
import '../../css/filter.css';

function RAM() {
    const [ram, setRAM] = useState([]);
    const navigate = useNavigate();
    const { CurrentUser } = useAuth();
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pendingFilters, setPendingFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ramCollection = collection(db, 'RAM');
                let queryConstraints = [];

                // Conditionally add filters if they exist
                if (appliedFilters.brand?.length > 0) {
                    queryConstraints.push(where('brand', 'in', appliedFilters.brand));
                }
                if (appliedFilters.memory_type?.length > 0) {
                    queryConstraints.push(where('memory_type', 'in', appliedFilters.memory_type));
                }
                if (appliedFilters.form_factor?.length > 0) {
                    queryConstraints.push(where('form_factor', 'in', appliedFilters.form_factor));
                }
                if (appliedFilters.modules?.length > 0) {
                    queryConstraints.push(where('modules', 'in', appliedFilters.modules));
                }
                if (appliedFilters.heat_spreader !== undefined) {
                    queryConstraints.push(where('heat_spreader', '==', appliedFilters.heat_spreader));
                }
                if (appliedFilters.price) {
                    const { min, max } = appliedFilters.price;
                    queryConstraints.push(where('price', '>=', min), where('price', '<=', max));
                }
                if (appliedFilters.capacity) {
                    const { min, max } = appliedFilters.capacity;
                    queryConstraints.push(where('capacity', '>=', min), where('capacity', '<=', max));
                }
                if (appliedFilters.speed) {
                    const { min, max } = appliedFilters.speed;
                    queryConstraints.push(where('speed', '>=', min), where('speed', '<=', max));
                }
                if (appliedFilters.latency) {
                    const { min, max } = appliedFilters.latency;
                    queryConstraints.push(where('latency', '>=', min), where('latency', '<=', max));
                }
                if (appliedFilters.voltage) {
                    const { min, max } = appliedFilters.voltage;
                    queryConstraints.push(where('voltage', '>=', min), where('voltage', '<=', max));
                }

                // Execute the query with the accumulated constraints
                const ramQuery = query(ramCollection, ...queryConstraints);
                const querySnapshot = await getDocs(ramQuery);

                // Map query results to an array and update state
                const ramList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setRAM(ramList);
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
        setAppliedFilters({}); // Reset to show all RAMs
    };

    const handleAddToBuild = async (ramId) => {
        try {
            // Get the closest build for the current user
            const closestBuild = await getClosestBuild(CurrentUser);
            if (closestBuild) {
                // Reference the specific build document
                const buildRef = doc(db, 'Build', closestBuild.id);

                // Update the build document with the selected RAM ID
                await updateDoc(buildRef, {
                    ram_id: ramId, // Assuming you're adding the RAM ID here
                });

                // Navigate back to the Builder page after update
                navigate('/Builder');
            } else {
                console.log("No builds found for this user.");
            }
        } catch (error) {
            console.error("Error updating build with RAM ID:", error);
        }
    };

    return (
        <div className="cpu-page">
            <RAMFilter filters={pendingFilters} 
                onFilterChange={handleFilterChange} 
                onApplyFilters={handleApplyFilters} 
                onResetFilters={handleResetFilters}  />
            <div className="cpu-table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Brand</th>
                            <th scope="col">Model</th>
                            <th scope="col">Memory Size</th>
                            <th scope="col">Memory Speed</th>
                            <th scope="col">Configuration</th>
                            <th scope="col">Latency</th>
                            <th scope="col">Price</th>
                            <th scope="col">Selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ram.map((item) => (
                            <tr key={item.ram_id}>
                                <td>{item.brand}</td>
                                <td>{item.model}</td>
                                <td>{item.capacity}</td>
                                <td>{item.speed}</td>
                                <td>{item.modules}</td>
                                <td>{item.latency}</td>
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

export default RAM;
