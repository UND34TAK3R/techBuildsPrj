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
            alert('Build successfully created!'); // Show success message
            handleClose(); // Close the popup after successful submission
            handleNewBuild();
        } catch (error) {
            console.error('Error during build creation:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="overlay">
            <div className="popup">
                <h2>New Build</h2>
                <p>Welcome to our Builder!<br /> Please enter the name and type of build you want.</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Build Name:
                        <input type="text" name="BuildName" required />
                    </label>
                    <label>
                        Build Type:
                        <select name="BuildType" id="BuildType" required>
                            <option value="Work">Work</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Content Creation">Content Creation</option>
                            <option value="Software Development">Software Development</option>
                            <option value="Media Consumption">Media Consumption</option>
                            <option value="Data Storage and Backup">Data Storage and Backup</option>
                            <option value="Education">Education</option>
                            <option value="Remote Work">Remote Work</option>
                        </select>
                    </label><br /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default NewBuild;
