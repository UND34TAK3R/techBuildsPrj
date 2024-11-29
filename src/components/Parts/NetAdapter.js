import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/Firebase/firebase'; // Adjust the import based on your firebase configuration
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getClosestBuild } from '../BuilderAuth/buildAuth'; // Adjust based on your path to the function
import { useAuth } from '../../backend/Context/authContext'; // Adjust based on your auth context
import NAFilter from 'components/Filters/NetAdapterFilter';
import '../../css/filter.css';

function NetAdapter() {
    const [NetAdapters, setNetAdapters] = useState([]);
    const navigate = useNavigate();
    const { CurrentUser } = useAuth();
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pendingFilters, setPendingFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const naCollection = collection(db, 'NetAdapter');
                let queryConstraints = [];

                // Conditionally add filters if they exist
                if (appliedFilters.brand?.length > 0) {
                    queryConstraints.push(where('brand', 'in', appliedFilters.brand));
                }
                if (appliedFilters.adapter_type?.length > 0) {
                    queryConstraints.push(where('adapter_type', 'in', appliedFilters.adapter_type));
                }
                if (appliedFilters.frequency_band?.length > 0) {
                    queryConstraints.push(where('frequency_band', 'in', appliedFilters.frequency_band));
                }
                if (appliedFilters.interface?.length > 0) {
                    queryConstraints.push(where('interface', 'in', appliedFilters.interface));
                }
                if (appliedFilters.wireless_standard?.length > 0) {
                    queryConstraints.push(where('wireless_standard', 'in', appliedFilters.wireless_standard));
                }
                if (appliedFilters.bluetooth_support !== undefined) {
                    queryConstraints.push(where('bluetooth_support', '==', appliedFilters.bluetooth_support));
                }
                if (appliedFilters.price) {
                    const { min, max } = appliedFilters.price;
                    queryConstraints.push(where('price', '>=', min), where('price', '<=', max));
                }
                if (appliedFilters.capacity) {
                    const { min, max } = appliedFilters.capacity;
                    queryConstraints.push(where('capacity', '>=', min), where('capacity', '<=', max));
                }
                if (appliedFilters.max_range) {
                    const { min, max } = appliedFilters.max_range;
                    queryConstraints.push(where('max_range', '>=', min), where('max_range', '<=', max));
                }

                // Execute the query with the accumulated constraints
                const naQuery = query(naCollection, ...queryConstraints);
                const querySnapshot = await getDocs(naQuery);

                // Map query results to an array and update state
                const naList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setNetAdapters(naList);
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
    const handleAddToBuild = async (naId) => {
        try {
            // Get the closest build for the current user
            const closestBuild = await getClosestBuild(CurrentUser);
            if (closestBuild) {
                // Reference the specific build document
                const buildRef = doc(db, 'Build', closestBuild.id);

                // Update the build document with the selected Net Adapter ID
                await updateDoc(buildRef, {
                    na_id: naId, // Assuming you're adding the Net Adapter ID here
                });

                // Navigate back to the Builder page after update
                navigate('/Builder');
            } else {
                console.log("No builds found for this user.");
            }
        } catch (error) {
            console.error("Error updating build with Net Adapter ID:", error);
        }
    };

    return (
        <div className="cpu-page">
            <NAFilter filters={pendingFilters} 
                onFilterChange={handleFilterChange} 
                onApplyFilters={handleApplyFilters} 
                onResetFilters={handleResetFilters}  />
            <div className="cpu-table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Brand</th>
                            <th scope="col">Model</th>
                            <th scope="col">Protocol</th>
                            <th scope="col">Interface</th>
                            <th scope="col">Max Speed</th>
                            <th scope="col">Price</th>
                            <th scope="col">Selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NetAdapters.map((item) => (
                            <tr key={item.na_id}>
                                <td className='text-white'>{item.brand}</td>
                                <td className='text-white'>{item.model}</td>
                                <td className='text-white'>{item.wireless_standard}</td>
                                <td className='text-white'>{item.interface}</td>
                                <td className='text-white'>{item.speed}</td>
                                <td className='text-white'>{item.price}</td>
                                <td>
                                    <button className="btn btn-outline-light" onClick={() => handleAddToBuild(item.id)}>
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

export default NetAdapter;
