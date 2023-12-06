import React from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase-config";
import "./ForgotPassword.css";

function ForgotPassword() {
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value;
        sendPasswordResetEmail(auth, emailVal)
            .then(() => {
                alert("Check your email for password reset instructions.");
                history('/signin');
            })
            .catch((err) => {
                alert(err.code);
            });
    };

    return (
        <div>
            <style>{'.forgot-password-body {font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh;}'}</style>
            <div className="forgot-password-body">
                <div className="reset-password-container">
                    <h1 className="reset-password-title"><b>Forgot Password</b></h1><br></br>
                    <form className="reset-password-form" onSubmit={(e) => handleSubmit(e)}>
                        <input className="reset-password-input" name="email" placeholder="Enter your email" />
                        <br></br><button className="reset-password-button" type="submit">Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;