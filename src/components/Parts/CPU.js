import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/Firebase/firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { getClosestBuild } from '../BuilderAuth/buildAuth';
import { useAuth } from '../../backend/Context/authContext';
import CPUFilter from 'components/Filters/CPUFilter';
import '../../css/filter.css';

function CPU() {
    const [cpus, setCpus] = useState([]);
    const navigate = useNavigate();
    const { CurrentUser } = useAuth();
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pendingFilters, setPendingFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cpuCollection = collection(db, 'CPU');
                let queryConstraints = [];

                // Conditionally add filters if they exist
                if (appliedFilters.architecture?.length > 0) {
                    queryConstraints.push(where('architecture', 'in', appliedFilters.architecture));
                }
                if (appliedFilters.generation?.length > 0) {
                    queryConstraints.push(where('generation', 'in', appliedFilters.generation));
                }
                if (appliedFilters.socket?.length > 0) {
                    queryConstraints.push(where('socket', 'in', appliedFilters.socket));
                }
                if (appliedFilters.brand?.length > 0) {
                    queryConstraints.push(where('brand', 'in', appliedFilters.brand));
                }
                if (appliedFilters.multi_thread_support !== undefined) {
                    queryConstraints.push(where('multi_thread_support', '==', appliedFilters.multi_thread_support));
                }
                if (appliedFilters.integrated_graphics !== undefined) {
                    queryConstraints.push(where('integrated_graphics', '==', appliedFilters.integrated_graphics));
                }
                if (appliedFilters.price) {
                    const { min, max } = appliedFilters.price;
                    queryConstraints.push(where('price', '>=', min), where('price', '<=', max));
                }
                if (appliedFilters.cores) {
                    const { min, max } = appliedFilters.cores;
                    queryConstraints.push(where('cores', '>=', min), where('cores', '<=', max));
                }
                if (appliedFilters.threads) {
                    const { min, max } = appliedFilters.threads;
                    queryConstraints.push(where('threads', '>=', min), where('threads', '<=', max));
                }
                if (appliedFilters.base_clock) {
                    const { min, max } = appliedFilters.base_clock;
                    queryConstraints.push(where('base_clock', '>=', min), where('base_clock', '<=', max));
                }

                // Execute the query with the accumulated constraints
                const cpuQuery = query(cpuCollection, ...queryConstraints);
                const querySnapshot = await getDocs(cpuQuery);

                // Map query results to an array and update state
                const cpuList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setCpus(cpuList);
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

    const handleAddToBuild = async (cpuId) => {
        try {
            const closestBuild = await getClosestBuild(CurrentUser);
            if (closestBuild) {
                const buildRef = doc(db, 'Build', closestBuild.id);
                await updateDoc(buildRef, { cpu_id: cpuId });
                navigate('/Builder');
            } else {
                console.log("No builds found for this user.");
            }
        } catch (error) {
            console.error("Error updating build with CPU ID:", error);
        }
    };

    return (
        <div className="cpu-page">
            <CPUFilter filters={pendingFilters} 
                onFilterChange={handleFilterChange} 
                onApplyFilters={handleApplyFilters} 
                onResetFilters={handleResetFilters}  />
            <div className="cpu-table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Model</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Cores</th>
                            <th scope="col">Threads</th>
                            <th scope="col">Architecture</th>
                            <th scope="col">Base Clock (GHz)</th>
                            <th scope="col">Boost Clock (GHz)</th>
                            <th scope="col">TDP (W)</th>
                            <th scope="col">Price ($)</th>
                            <th scope="col">Selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cpus.map((item) => (
                            <tr key={item.id}>
                                <td className='text-white'>{item.model}</td>
                                <td className='text-white'>{item.brand}</td>
                                <td className='text-white'>{item.cores}</td>
                                <td className='text-white'>{item.threads}</td>
                                <td className='text-white'>{item.architecture}</td>
                                <td className='text-white'>{item.base_clock}</td>
                                <td className='text-white'>{item.boost_clock}</td>
                                <td className='text-white'>{item.tdp}</td>
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

export default CPU;
