import { useEffect, useState } from 'react';
import '../css/NewBuild.css';
import { useAuth } from '../backend/Context/authContext';
import { query, where, getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from '../backend/Firebase/firebase';

const ChangeBuild = ({ handleClose, ChangeBuild }) => {

    const [build, setBuild] = useState([]);
    const { CurrentUser } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'Build'), where('user_id', '==', CurrentUser.uid));
                const querySnapshot = await getDocs(q);
                const buildList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setBuild(buildList);
                console.log("CurrentUser:", CurrentUser);
                console.log("buildList:", buildList);
            } catch (error) {
                console.error("Error fetching builds:", error);
            }
        };
        fetchData();
    }, [CurrentUser]);

    const handleChangeBuild = async (buildId) => {
        const buildDocRef = doc(db, 'Build', buildId);  // Reference to specific document

        try {
            await updateDoc(buildDocRef, {
                last_used: new Date(),
            });
            ChangeBuild();
        } catch (error) {
            console.error('Error changing build:', error);
        }
    };

    const handleChange = () => {
        handleClose();
        window.location.reload();
    };

    return (
        <div className="overlay">
            <div className="popup bg-dark">
                <h2>Change Build</h2>
                <div className="table-responsive bg-dark">
                    <table className="table table-bordered table-striped table-dark text-white">
                        <thead>
                            <tr>
                                <th scope="col">Select</th>
                                <th scope="col">Build Name</th>
                                <th scope="col">Build Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {build.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleChangeBuild(item.id)}
                                        />
                                    </td>
                                    <td>{item.build_name}</td>
                                    <td>{item.build_type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center">
                    <button className="btn btn-outline-light mt-3" onClick={() => handleChange()}>
                        Change Build
                    </button>
                </div>
            </div>
        </div>
    );
    
};

export default ChangeBuild;