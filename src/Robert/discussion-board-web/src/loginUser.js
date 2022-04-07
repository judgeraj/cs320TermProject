import React from 'react';
import "./loginUser.css";
import Button from '@material-ui/core/Button';
import { authenticate,  provider} from './firebase'; //authenticate,


function loginUser() {
  const signIn = () => {
    authenticate.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className='loginPage'> {/** temporary page */}
        <div className='logo'>
          <img src='https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SQSBAJOSTJD4BKWKHQUC45VYT4.jpg'alt=""/>
          
        </div>
        <Button data-testid="loginId" onClick={signIn}> Sign in</Button> {/**signIn */}
    </div>
    
  )
}

export default loginUser