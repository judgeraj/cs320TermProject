import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import firebaseConfig from "../firebase/config";
import './memes.css';

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);    
  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    try {
      firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);      
      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
      return <Navigate to="/main" />;
  }
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;