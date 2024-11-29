import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/Firebase/firebase';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getClosestBuild } from '../BuilderAuth/buildAuth';
import { useAuth } from '../../backend/Context/authContext'; // Adjust based on your auth context
import MotherboardFilter from 'components/Filters/MotherboardFilter';
import '../../css/filter.css';

function Motherboard() {
    const [mb, setMotherboards] = useState([]);
    const navigate = useNavigate();
    const { CurrentUser } = useAuth(); // Assuming CurrentUser provides the current user's data
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pendingFilters, setPendingFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mbCollection = collection(db, 'Motherboard');
                let queryConstraints = [];

                // Conditionally add filters if they exist
                if (appliedFilters.chipset?.length > 0) {
                    queryConstraints.push(where('chipset', 'in', appliedFilters.chipset));
                }
                if (appliedFilters.form_factor?.length > 0) {
                    queryConstraints.push(where('form_factor', 'in', appliedFilters.form_factor));
                }
                if (appliedFilters.socket?.length > 0) {
                    queryConstraints.push(where('socket', 'in', appliedFilters.socket));
                }
                if (appliedFilters.brand?.length > 0) {
                    queryConstraints.push(where('brand', 'in', appliedFilters.brand));
                }
                if (appliedFilters.memory_type?.length > 0) {
                    queryConstraints.push(where('memory_type', 'in', appliedFilters.memory_type));
                }
                if (appliedFilters.bluetooth !== undefined) {
                    queryConstraints.push(where('bluetooth', '==', appliedFilters.bluetooth));
                }
                if (appliedFilters.m2_slots !== undefined) {
                    queryConstraints.push(where('m2_slots', '==', appliedFilters.m2_slots));
                }
                if (appliedFilters.price) {
                    const { min, max } = appliedFilters.price;
                    queryConstraints.push(where('price', '>=', min), where('price', '<=', max));
                }
                if (appliedFilters.max_memory) {
                    const { min, max } = appliedFilters.max_memory;
                    queryConstraints.push(where('max_memory', '>=', min), where('max_memory', '<=', max));
                }
                if (appliedFilters.memory_speed) {
                    const { min, max } = appliedFilters.memory_speed;
                    queryConstraints.push(where('memory_speed', '>=', min), where('memory_speed', '<=', max));
                }
                if (appliedFilters.ram_slots) {
                    const { min, max } = appliedFilters.ram_slots;
                    queryConstraints.push(where('ram_slots', '>=', min), where('ram_slots', '<=', max));
                }

                // Execute the query with the accumulated constraints
                const mbQuery = query(mbCollection, ...queryConstraints);
                const querySnapshot = await getDocs(mbQuery);

                // Map query results to an array and update state
                const mbList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setMotherboards(mbList);
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

    const handleAddToBuild = async (motherboardId) => {
        try {
            // Get the closest build for the current user
            const closestBuild = await getClosestBuild(CurrentUser);
            if (closestBuild) {
                // Reference the specific build document
                const buildRef = doc(db, 'Build', closestBuild.id);

                // Update the build document with the selected motherboard ID
                await updateDoc(buildRef, {
                    mb_id: motherboardId,
                });

                // Navigate back to the Builder page after update
                navigate('/Builder');
            } else {
                console.log("No builds found for this user.");
            }
        } catch (error) {
            console.error("Error updating build with motherboard ID:", error);
        }
    };

    return (
        <div className="cpu-page">
            <MotherboardFilter filters={pendingFilters} 
                onFilterChange={handleFilterChange} 
                onApplyFilters={handleApplyFilters} 
                onResetFilters={handleResetFilters}  />
            <div className="cpu-table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Model</th>
                            <th scope="col">Form Factor</th>
                            <th scope="col">Socket</th>
                            <th scope="col">Ram Slots</th>
                            <th scope="col">Price</th>
                            <th scope="col">Selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mb.map((item) => (
                            <tr key={item.id}>
                                <td className='text-white'>{item.model}</td>
                                <td className='text-white'>{item.form_factor}</td>
                                <td className='text-white'>{item.socket}</td>
                                <td className='text-white'>{item.ram_slots}</td>
                                <td className='text-white'>{item.price}</td>
                                <td>
                                    <button className="btn btn-outline-light" onClick={() => handleAddToBuild(item.id)}>Add To Build</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Motherboard;
