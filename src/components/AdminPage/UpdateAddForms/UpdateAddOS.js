import React, { useState, useEffect } from "react";
import { db } from "../../../backend/Firebase/firebase";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";

const UpdateAddOS = ({ device, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    architecture: "",
    version: "",
    price: 0,
  });

  useEffect(() => {
    if (device) {
      setFormData(device); // Pre-fill form for update
    }
  }, [device]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure price is always a float, and other fields are untouched
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure price is a number before submitting
    const formDataWithPrice = { ...formData, price: parseFloat(formData.price) || 0 };

    if (device) {
      // Update existing item
      const docRef = doc(db, "OperatingSystem", device.id);
      await updateDoc(docRef, formDataWithPrice);
    } else {
      // Add new item
      const collectionRef = collection(db, "OperatingSystem");
      const docRef = await addDoc(collectionRef, formDataWithPrice);
      formDataWithPrice.id = docRef.id; // Add the new ID to the formData
    }

    onSubmit(formDataWithPrice);
  };

  return (
    <div>
      <h1>{device ? "Edit Operating System" : "Add Operating System"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Architecture:</label>
          <input
            type="text"
            name="architecture"
            value={formData.architecture}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Version:</label>
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{device ? "Update" : "Add"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateAddOS;
