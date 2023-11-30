import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0kS_JsOGFpkOsNEbj3Q3q3mecY0cG2ik",
  authDomain: "polydash-ba4ca.firebaseapp.com",
  projectId: "polydash-ba4ca",
  storageBucket: "polydash-ba4ca.appspot.com",
  messagingSenderId: "166726624610",
  appId: "1:166726624610:web:747dd119a51c4466e2f83b",
  measurementId: "G-NWV2W2157D"
};


  const app = initializeApp(firebaseConfig);
  export const database = getAuth(app)
  export const db = getFirestore(app)