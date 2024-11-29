import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/Firebase/firebase'; // Adjust the import based on your firebase configuration
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getClosestBuild } from '../BuilderAuth/buildAuth'; // Adjust based on your path to the function
import { useAuth } from '../../backend/Context/authContext'; // Adjust based on your auth context
import OSFilter from 'components/Filters/FilterOS';
import '../../css/filter.css';

function OS() {
    const [os, setOS] = useState([]);
    const navigate = useNavigate();
    const { CurrentUser } = useAuth();
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pendingFilters, setPendingFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const osCollection = collection(db, 'OperatingSystem');
                let queryConstraints = [];

                // Conditionally add filters if they exist
                if (appliedFilters.name?.length > 0) {
                    queryConstraints.push(where('name', 'in', appliedFilters.name));
                }
                if (appliedFilters.architecture?.length > 0) {
                    queryConstraints.push(where('architecture', 'in', appliedFilters.architecture));
                }
                if (appliedFilters.price) {
                    const { min, max } = appliedFilters.price;
                    queryConstraints.push(where('price', '>=', min), where('price', '<=', max));
                }
                // Execute the query with the accumulated constraints
                const osQuery = query(osCollection, ...queryConstraints);
                const querySnapshot = await getDocs(osQuery);

                // Map query results to an array and update state
                const osList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setOS(osList);
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

    const handleAddToBuild = async (osId) => {
        try {
            // Get the closest build for the current user
            const closestBuild = await getClosestBuild(CurrentUser);
            if (closestBuild) {
                // Reference the specific build document
                const buildRef = doc(db, 'Build', closestBuild.id);

                // Update the build document with the selected Operating System ID
                await updateDoc(buildRef, {
                    os_id: osId, // Assuming you're adding the OS ID here
                });

                // Navigate back to the Builder page after update
                navigate('/Builder');
            } else {
                console.log("No builds found for this user.");
            }
        } catch (error) {
            console.error("Error updating build with OS ID:", error);
        }
    };

    return (
        <div className="cpu-page">
            <OSFilter filters={pendingFilters} 
                onFilterChange={handleFilterChange} 
                onApplyFilters={handleApplyFilters} 
                onResetFilters={handleResetFilters}  />
            <div className="cpu-table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Version</th>
                            <th scope="col">Architecture</th>
                            <th scope="col">Price</th>
                            <th scope="col">Selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {os.map((item) => (
                            <tr key={item.os_id}>
                                <td className='text-white'>{item.name}</td>
                                <td className='text-white'>{item.version}</td>
                                <td className='text-white'>{item.architecture}</td>
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

export default OS;
