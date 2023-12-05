import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import './RegisterAndLogin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import {
  collection,
  doc,
  setDoc,
  where,
  query,
  getDocs,
  getDoc,
} from 'firebase/firestore';

function RegisterAndLogin() {
  const [isRightPanelActive, setRightPanelActive] = useState(true);
  const history = useNavigate();

  const handlePanelChange = () => {
    setRightPanelActive(!isRightPanelActive);
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      console.log('Before signInWithPopup:', db);
      const result = await signInWithPopup(auth, provider);
      console.log(result, 'Google Sign-In success');

      addUserDocument(result.user);
      handleSuccessfulLogin(result.user.uid);
    } catch (error) {
      console.error(error, 'Google Sign-In error');
    }
  };

  const updateUserDatabase = async (userId, name, email) => {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      name: name,
      email: email,
    });
  };

  const addUserDocument = (user) => {
    addUserDocumentToFirestore(user.uid, user.displayName, user.email);
  };

  const addUserDocumentToFirestore = async (userId, name, email) => {
    const usersCollection = collection(db, 'users');

    const q = query(usersCollection, where('email', '==', email));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // User doesn't exist, add a new user document
        const userDocRef = doc(usersCollection, userId);
        await setDoc(userDocRef, {
          email: email,
          name: name,
        });
        console.log('Document added with ID:', userDocRef.id);
        handleNavigation(userId);
      } else {
        console.log('Document with the same email already exists');
        history('../');
      }
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleNavigation = (userId) => {
    history(`/userinfo/${userId}`);
  };

  const handleSuccessfulLogin = async (userId) => {
    const userDocRef = doc(collection(db, 'users'), userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userRole = userDoc.data().role;
      if (userRole === 'customer') {
        history('/order');
      } else if (userRole === 'driver') {
        history('/delivery');
      } else if (userRole === 'restaurant') {
        history('/seller');
      } else {
        console.error('Unknown user role');
      }
    } else {
      console.error('User document not found');
    }
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type === 'signup') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (data) => {
          console.log(data, 'authData');
          //Create user in database
          const userId = data.user.uid;

          // Update user data in the database
          updateUserDatabase(userId, e.target.name.value, email);

          handleNavigation(userId);
        })
        .catch((err) => {
          alert(err.code);
          setRightPanelActive(true);
        });
    } else if (type === 'signin') {
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data, 'authData');
          handleSuccessfulLogin(data.user.uid);
        })
        .catch((err) => {
          alert(err.code);
        });
    } else if (type === 'google') {
      handleGoogleSignIn();
    }
  };

  const handleReset = () => {
    history('/reset');
  };

  return (
    <div
      className={`RegisterAndLogin ${
        isRightPanelActive ? 'right-panel-active' : ''
      }`}
    >
      <div
        className={`form-container sign-up-container ${
          isRightPanelActive ? 'hidden' : ''
        }`}
      >
        <form onSubmit={(e) => handleSubmit(e, 'signup')}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a
              href="#"
              className="social"
              onClick={(e) => handleGoogleSignIn(e)}
            >
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
      <div
        className={`form-container sign-in-container ${
          isRightPanelActive ? '' : 'hidden'
        }`}
      >
        <form onSubmit={(e) => handleSubmit(e, 'signin')}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a
              href="#"
              className="social"
              onClick={(e) => handleGoogleSignIn(e)}
            >
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
        <div
          className={`overlay ${
            isRightPanelActive ? 'right-panel-active' : ''
          }`}
        >
          <div className="overlay-panel overlay-right">
            <h1>{isRightPanelActive ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
            <p>
              {isRightPanelActive
                ? 'Enter your personal details and start the journey with us'
                : 'To keep connected with us, please login with your personal info'}
            </p>
            <button className="ghost" onClick={handlePanelChange}>
              {isRightPanelActive ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
          <div
            className={`overlay-panel overlay-left ${
              isRightPanelActive ? 'right-panel-active' : ''
            }`}
          >
            <h1>{isRightPanelActive ? 'Welcome Back!' : 'Hello, Friend!'}</h1>
            <p>
              {isRightPanelActive
                ? 'To keep connected with us, please login with your personal info'
                : 'Enter your personal details and start the journey with us'}
            </p>
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
