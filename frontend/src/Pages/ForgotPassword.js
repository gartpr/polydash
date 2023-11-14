import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { database } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function ForgotPassword(){
    const history = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        const emailVal = e.target.email.value;
        sendPasswordResetEmail(database, emailVal).then(data=>{
            alert("Check your gmail")
            history('/signin')
        }).catch(err=>{
            alert(err.code)
        })
    }
    
    return(
        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <br></br>
                <input name="email"></input><br></br>
                <br></br>
                <button>reset</button>
            </form>
        </div>
    )
}
export default ForgotPassword;