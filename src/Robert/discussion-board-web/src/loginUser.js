import React from 'react';
import "./loginUser.css";
import Button from '@material-ui/core/Button';
import { authenticate, provider} from './firebase';


function loginUser() {
  const signIn = () => {
    authenticate.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className='loginPage'>
        <div className='logo'>
          <img src='https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SQSBAJOSTJD4BKWKHQUC45VYT4.jpg'alt=""/>
          
        </div>
        <Button onClick={signIn}> Sign in</Button>
    </div>
    
  )
}

export default loginUser