import React from "react";
import '../css/NewBuild.css';
import { useAuth } from '../backend/Context/authContext';
import { addNewBuild } from '../backend/Firebase/firestore'; // Adjust the import according to your file structure

const NewBuild = ({ handleClose, handleNewBuild }) => { // Removed handleNewBuild prop
    const { CurrentUser } = useAuth();
  
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        const form = e.currentTarget; // Get form element
        const BuildName = form.BuildName.value;
        const BuildType = form.BuildType.value;
    
        // Client-side validation
        if (!BuildName || !BuildType) {
            alert('Please fill in all fields.');
            return;
        }

        const BuildData = { BuildName, BuildType, CurrentUser };

        try {
            // Add the new build to Firestore
            await addNewBuild(BuildData);
            handleClose(); // Close the popup after successful submission
            handleNewBuild();
        } catch (error) {
            console.error('Error during build creation:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="overlay">
            <div className="popup bg-dark p-4 rounded">
                <h2 className="text-white text-center">New Build</h2>
                <p className="text-white text-center">
                    Welcome to our Builder!<br /> Please enter the name and type of build you want.
                </p>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="BuildName" className="form-label text-white">Build Name:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="BuildName" 
                            id="BuildName" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="BuildType" className="form-label text-white">Build Type:</label>
                        <select 
                            name="BuildType" 
                            id="BuildType" 
                            className="form-select" 
                            required
                        >
                            <option value="Work">Work</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Content Creation">Content Creation</option>
                            <option value="Software Development">Software Development</option>
                            <option value="Media Consumption">Media Consumption</option>
                            <option value="Data Storage and Backup">Data Storage and Backup</option>
                            <option value="Education">Education</option>
                            <option value="Remote Work">Remote Work</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-outline-light" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};

export default NewBuild;
