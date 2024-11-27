import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/Firebase/firebase'; // Adjust the import based on your firebase configuration
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getClosestBuild } from '../BuilderAuth/buildAuth'; // Adjust based on your path to the function
import { useAuth } from '../../backend/Context/authContext'; // Adjust based on your auth context
import GPUFilter from 'components/Filters/FilterGPU';
import '../../css/filter.css';

function GPU() {
    const [gpu, setGPUs] = useState([]);
    const navigate = useNavigate();
    const { CurrentUser } = useAuth();
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pendingFilters, setPendingFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gpuCollection = collection(db, 'GPU');
                let queryConstraints = [];

                // Conditionally add filters if they exist
                if (appliedFilters.chipset?.length > 0) {
                    queryConstraints.push(where('chipset', 'in', appliedFilters.chipset));
                }
                if (appliedFilters.brand?.length > 0) {
                    queryConstraints.push(where('brand', 'in', appliedFilters.brand));
                }
                if (appliedFilters.memory_type?.length > 0) {
                    queryConstraints.push(where('memory_type', 'in', appliedFilters.memory_type));
                }
                if (appliedFilters.ray_tracing !== undefined) {
                    queryConstraints.push(where('ray_tracing', '==', appliedFilters.ray_tracing));
                }
                if (appliedFilters.price) {
                    const { min, max } = appliedFilters.price;
                    queryConstraints.push(where('price', '>=', min), where('price', '<=', max));
                }
                if (appliedFilters.boost_clock) {
                    const { min, max } = appliedFilters.boost_clock;
                    queryConstraints.push(where('boost_clock', '>=', min), where('boost_clock', '<=', max));
                }
                if (appliedFilters.core_clock) {
                    const { min, max } = appliedFilters.core_clock;
                    queryConstraints.push(where('core_clock', '>=', min), where('core_clock', '<=', max));
                }
                if (appliedFilters.length) {
                    const { min, max } = appliedFilters.length;
                    queryConstraints.push(where('length', '>=', min), where('length', '<=', max));
                }

                if (appliedFilters.memory_size) {
                    const { min, max } = appliedFilters.memory_size;
                    queryConstraints.push(where('memory_size', '>=', min), where('memory_size', '<=', max));
                }

                // Execute the query with the accumulated constraints
                const gpuQuery = query(gpuCollection, ...queryConstraints);
                const querySnapshot = await getDocs(gpuQuery);

                // Map query results to an array and update state
                const gpuList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setGPUs(gpuList);
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
        setAppliedFilters({}); // Reset to show all CPUs
    };

    const handleAddToBuild = async (gpuId) => {
        try {
            // Get the closest build for the current user
            const closestBuild = await getClosestBuild(CurrentUser);
            if (closestBuild) {
                // Reference the specific build document
                const buildRef = doc(db, 'Build', closestBuild.id);

                // Update the build document with the selected GPU ID
                await updateDoc(buildRef, {
                    gpu_id: gpuId, // Assuming you're adding the GPU ID here
                });

                // Navigate back to the Builder page after update
                navigate('/Builder');
            } else {
                console.log("No builds found for this user.");
            }
        } catch (error) {
            console.error("Error updating build with GPU ID:", error);
        }
    };

    return (
        <div className="cpu-page">
            <GPUFilter filters={pendingFilters} 
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
                            <th scope="col">Base Clock</th>
                            <th scope="col">Boost Clock</th>
                            <th scope="col">Length</th>
                            <th scope="col">Price</th>
                            <th scope="col">Selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gpu.map((item) => (
                            <tr key={item.gpu_id}>
                                <td>{item.brand}</td>
                                <td>{item.model}</td>
                                <td>{item.memory_size}</td>
                                <td>{item.core_clock}</td>
                                <td>{item.boost_clock}</td>
                                <td>{item.length}</td>
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

export default GPU;
