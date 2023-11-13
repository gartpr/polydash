import React from "react";

function RegisterAndLogin(){
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
    }
    return(
        <div className="App">
            {/* Registration and Login Screen*/}
            <h1>SignIn</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input name="email" placeholder="Email"></input>
                <input name="password" type="password" placeholder="Password"></input><br></br>
                <button>SignIn</button>
            </form>
        </div>
    )
}
export default RegisterAndLogin;