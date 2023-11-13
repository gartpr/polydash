import React, { useState } from 'react';
import Navbar from '../Components/NavBar';
import { database } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSafeLayoutEffect } from '@chakra-ui/react';
import './RegisterAndLogin.css';

function RegisterAndLogin() {
  const [login,setLogin] = useState(true)

  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if(type === 'signup'){
      createUserWithEmailAndPassword(database, email, password).then((data) => {
        console.log(data, 'authData');
        history('../')
      }).catch(err=>{
        alert(err.code)
        setLogin(true)
      });
    } else{
      signInWithEmailAndPassword(database, email, password).then((data) => {
        console.log(data, 'authData');
        history('../')
      }).catch(err=>{
        alert(err.code)
      });
    }
    
  };
  return (
    <div className="App">
      {/* Registration and Login Screen*/}
      <div className='row'>
        <div className={login === false?'activeColor': 'pointer'} onClick={()=>setLogin(false)}>SignUp</div>
        <div className={login === true?'activeColor': 'pointer'} onClick={()=>setLogin(true)}>SignIn</div>
      </div>
      <h1>{login?'SignIn': 'SignUp'}</h1>
      <form onSubmit={(e) => handleSubmit(e, login?'signin' : 'signup')}>
        <input name="email" placeholder="Email"></input>
        <input name="password" type="password" placeholder="Password"></input>
        <br></br>
        <button>{login? 'SignIn' : 'Signup'}</button>
      </form>
    </div>
  );
}
export default RegisterAndLogin;
