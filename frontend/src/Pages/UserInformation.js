import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import './UserInformation.css';

function UserInformation() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const fetchUserRole = async (userId) => {
        const userDocRef = doc(collection(db, 'users'), userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()){
            return userDoc.data().role;
        }

        return null;
    }

    const handleRedirection = async (userId) => {
        const userRole = await fetchUserRole(userId);

        if (userRole === 'customer'){
            navigate('/order')
        } else if (userRole === 'driver'){
            navigate('/delivery')
        } else if (userRole === 'restaurant'){
            navigate('/seller')
        } else {
            console.error('Unknown user role');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedRole = e.target.role.value;
        const enteredPhoneNumber = e.target.phoneNumber.value;

        // Check if both role and phone number are filled
        if (!selectedRole || !enteredPhoneNumber) {
        // Display an error or prevent form submission
        return;
      }

        setRole(selectedRole);
        setPhoneNumber(enteredPhoneNumber);

        const userCollectionRef = collection(db, 'users');

        // Update user data in the users collection
        const userRef = doc(userCollectionRef, userId);
        await setDoc(userRef, {
            role: selectedRole,
            phoneNumber: enteredPhoneNumber,
        }, { merge: true });

        handleRedirection(userId);
    };

    return (
        <div className={"UserInformation"}>
            <form onSubmit={handleSubmit}>
                <h1>User Information</h1>
                <br></br>
                <div className="select-box">
                    <select name="role" defaultValue="" required>
                        <option value="" disabled>
                            Select Role
                        </option>
                        <option value="customer">Customer</option>
                        <option value="driver">Driver</option>
                        <option value="restaurant">Restaurant</option>
                    </select>
                </div>
                <input
                    type="number"
                    name="phoneNumber"
                    maxLength="10"
                    placeholder="Phone Number"
                    title="Please enter a 10-digit phone number"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserInformation;
