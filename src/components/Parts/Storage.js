import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/Firebase/firebase'; // Adjust the import based on your firebase configuration
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getClosestBuild } from '../BuilderAuth/buildAuth'; // Adjust based on your path to the function
import { useAuth } from '../../backend/Context/authContext'; // Adjust based on your auth context
import StorageFilter from 'components/Filters/StorageFilter';
import '../../css/filter.css';

function Storage() {
    const [storage, setStorage] = useState([]);
    const navigate = useNavigate();
    const { CurrentUser } = useAuth();
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pendingFilters, setPendingFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storageCollection = collection(db, 'Storage');
                let queryConstraints = [];

                // Conditionally add filters if they exist
                if (appliedFilters.brand?.length > 0) {
                    queryConstraints.push(where('brand', 'in', appliedFilters.brand));
                }
                if (appliedFilters.interface?.length > 0) {
                    queryConstraints.push(where('interface', 'in', appliedFilters.interface));
                }
                if (appliedFilters.form_factor?.length > 0) {
                    queryConstraints.push(where('form_factor', 'in', appliedFilters.form_factor));
                }
                if (appliedFilters.storage_type?.length > 0) {
                    queryConstraints.push(where('storage_type', 'in', appliedFilters.storage_type));
                }
                if (appliedFilters.price) {
                    const { min, max } = appliedFilters.price;
                    queryConstraints.push(where('price', '>=', min), where('price', '<=', max));
                }
                if (appliedFilters.capacity) {
                    const { min, max } = appliedFilters.capacity;
                    queryConstraints.push(where('capacity', '>=', min), where('capacity', '<=', max));
                }
                if (appliedFilters.cache) {
                    const { min, max } = appliedFilters.cache;
                    queryConstraints.push(where('cache', '>=', min), where('cache', '<=', max));
                }
                // Execute the query with the accumulated constraints
                const storageQuery = query(storageCollection, ...queryConstraints);
                const querySnapshot = await getDocs(storageQuery);

                // Map query results to an array and update state
                const storageList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setStorage(storageList);
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

    const handleAddToBuild = async (storageId) => {
        try {
            // Get the closest build for the current user
            const closestBuild = await getClosestBuild(CurrentUser);
            if (closestBuild) {
                // Reference the specific build document
                const buildRef = doc(db, 'Build', closestBuild.id);

                // Update the build document with the selected storage ID
                await updateDoc(buildRef, {
                    storage_id: storageId, // Assuming you're adding the storage ID here
                });

                // Navigate back to the Builder page after update
                navigate('/Builder');
            } else {
                console.log("No builds found for this user.");
            }
        } catch (error) {
            console.error("Error updating build with storage ID:", error);
        }
    };

    return (
        <div className="cpu-page">
            <StorageFilter filters={pendingFilters} 
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
                            <th scope="col">Storage Capacity</th>
                            <th scope="col">Cache Capacity</th>
                            <th scope="col">Interface</th>
                            <th scope="col">Price</th>
                            <th scope="col">Selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storage.map((item) => (
                            <tr key={item.storage_id}>
                                <td>{item.brand}</td>
                                <td>{item.model}</td>
                                <td>{item.form_factor}</td>
                                <td>{item.capacity}</td>
                                <td>{item.cache}</td>
                                <td>{item.interface}</td>
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

export default Storage;
