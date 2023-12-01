import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, doc, setDoc } from "firebase/firestore";
import './UserInformation.css';

function UserInformation() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the values from the form
        const selectedRole = e.target.role.value;
        const enteredPhoneNumber = e.target.phoneNumber.value;

        // Update the state with the values
        setRole(selectedRole);
        setPhoneNumber(enteredPhoneNumber);

        // Firebase collections
        const userCollectionRef = collection(db, 'users');

        // Update user data in the users collection
        const userRef = doc(userCollectionRef, userId);
        await setDoc(userRef, {
            role: selectedRole,
            phoneNumber: enteredPhoneNumber,
        }, { merge: true });

        navigate('../');
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserInformation;
