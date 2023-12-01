import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase-config';
import { db } from '../firebase-config';
import './UserInformation.css';
import { Link } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"

// ... (existing imports)

function UserInformation() {
    const history = useNavigate();
  
    const addUserDocument = (user) => {
      const userEmail = user.email;
  
      // Assuming you have a function to add/update user data
      addUserDocumentToFirestore(user);
    };
  
    const addUserDocumentToFirestore = (user) => {
      const usersCollection = db.collection("users");
  
      const userEmail = user.email;
  
      // Check if the user with the same email already exists
      usersCollection
        .where("email", "==", userEmail)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // User doesn't exist, add a new user document
            usersCollection
              .add({
                email: userEmail,
                name: user.displayName,
                // Add more user-specific fields as needed
              })
              .then((docRef) => {
                console.log("Document added with ID:", docRef.id);
              })
              .catch((error) => {
                console.error("Error adding document:", error);
              });
          } else {
            console.log("Document with the same email already exists");
          }
        });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Extract additional fields
      const role = e.target.role.value; // Added field
      const phoneNumber = e.target.phoneNumber.value; // Added field
  
      // Firebase collections
      const userCollectionRef = collection(db, 'users');
  
      // Add user data to the users collection
      await addDoc(userCollectionRef, {
        role: role,
        phoneNumber: phoneNumber,
      });
  
      history('../');
    };
  
    return (
        <div className={"UserInformation"}>
          <form onSubmit={handleSubmit}>
            <h1>User Information</h1>
            <div className="select-box">
              <select name="role" defaultValue="">
                <option value="" disabled>
                  Select Role
                </option>
                <option value="customer">Customer</option>
                <option value="driver">Driver</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
            <input type="tel" name="phoneNumber" placeholder="Phone Number" />
            <button>Submit</button>
          </form>
        </div>
      );
    }
  
  export default UserInformation;
  