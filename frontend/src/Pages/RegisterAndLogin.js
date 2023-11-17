import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase-config';
import './RegisterAndLogin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function RegisterAndLogin() {
  const [isRightPanelActive, setRightPanelActive] = useState(true);
  const history = useNavigate();

  const handlePanelChange = () => {
    setRightPanelActive(!isRightPanelActive);
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault(); // Prevent the default behavior of the event
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(database, provider);
      console.log(result, 'Google Sign-In success');
      
      history('../');
    } catch (error) {
      console.error(error, 'Google Sign-In error');
    }
  };
  

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type === 'signup') {
      createUserWithEmailAndPassword(database, email, password)
        .then(async (data) => {
          console.log(data, 'authData');
          //Create user in database
        
          history('../');
        })
        .catch((err) => {
          alert(err.code);
          setRightPanelActive(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, 'authData');
          history('../');
        })
        .catch((err) => {
          alert(err.code);
        });
    }
    if (type === 'google') {
      handleGoogleSignIn();
    }
  };

  const handleReset = () => {
    history("/reset")
  }

  console.log("Rendering with right panel active:", isRightPanelActive);

  return (
    <div className={`RegisterAndLogin ${isRightPanelActive ? 'right-panel-active' : ''}`}>
      <div className={`form-container sign-up-container ${isRightPanelActive ? 'hidden' : ''}`}>
        <form onSubmit={(e) => handleSubmit(e, 'signup')}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social" onClick={(e) => handleGoogleSignIn(e)}>
            <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className={`form-container sign-in-container ${isRightPanelActive ? '' : 'hidden'}`}>
        <form onSubmit={(e) => handleSubmit(e, 'signin')}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social" onClick={(e) => handleGoogleSignIn(e)}>
            <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
          </div>
          <span>or use your account</span>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <Link to="/reset">
          <h2 onClick={handleReset}>Forgot your password?</h2>
          </Link>
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className={`overlay ${isRightPanelActive ? 'right-panel-active' : ''}`}>
          <div className="overlay-panel overlay-right">
            <h1>{isRightPanelActive ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
            <p>{isRightPanelActive ? 'Enter your personal details and start the journey with us' : 'To keep connected with us, please login with your personal info'}</p>
            <button className="ghost" onClick={handlePanelChange}>
              {isRightPanelActive ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
          <div className={`overlay-panel overlay-left ${isRightPanelActive ? 'right-panel-active' : ''}`}>
            <h1>{isRightPanelActive ? 'Welcome Back!' : 'Hello, Friend!'}</h1>
            <p>{isRightPanelActive ? 'To keep connected with us, please login with your personal info' : 'Enter your personal details and start the journey with us'}</p>
            <button className="ghost" onClick={handlePanelChange}>
              {isRightPanelActive ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterAndLogin;
