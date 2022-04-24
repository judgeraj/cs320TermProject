import AnimeSidebar from './TopicAnimeSidebar/AnimeSidebar';
import Discussion from './DiscussionBoard/Discussion';
import {useSelector, useDispatch} from 'react-redux';
import React, { useEffect, useState } from 'react';
import {login, logout} from './features/userSlice'
import {selectUser } from './features/userSlice';
import { authenticate } from './firebase';
import LogginIn from "./loginUser";
import './App.css';

export function UserLoggin(){
    const hook = useDispatch();
    useEffect(() => { // athenticate the logging in or logging out
        authenticate.onAuthStateChanged((newUser) => {
            if(!newUser) { // logout if the it is authenticated 
                hook(logout())
                return;
            } 
            hook(login({ // if logging in data*/
                photo: newUser.photoURL,
                displayName: newUser.displayName
            }))
        }) 
    },[hook]) // dependency 
    return;
};
function App() { // create the entire webpage 
    const userId = useSelector(selectUser);
    UserLoggin();
    const [tab, setTab] = useState(true); // boolean state for chaning tabs 
    const togTab = (boolean) => {
      setTab(boolean);
    }
  
    return ( 
        <div data-testid="appTest" className="app">
            {userId ? (<> 
                <div className='appTab'> {/** tabs below changing state */}
                    <button data-testid="buttonDis" className={tab === true ? "tab active-tab" : "tab"} onClick={() => togTab(true)}> 
                        <h2>Discussion Board</h2></button>
                    <button data-testid="buttonAn" className={tab === false ? "tab active-tab" : "tab"} onClick={() => togTab(false)}>
                        <h2>Anime Review</h2></button>
                </div>

              <div className='insideTab'> {/** comparing state then calling the appopriate page */}
                  <div className={tab === true ? "thistab active" : "thistab"}>
                        <Discussion /> {/** this creates the chat section of the page */}</div>
                  <div className={tab === false ? "thistab active" : "thistab"}>
                        <AnimeSidebar /> {/**rate and review for Anime user Watched*/}</div>
              </div>

            </>):
            (<LogginIn/>) // login page for the user 
            } 
        </div>
    );
}
export default App;
// 44  (app.js)
// 23  (app.css)
// 417 (TopicAnimeSidebar directory)
// 319 (DiscussionBoard directory)
// 21  (loginUser.css)
// 74   test.test.js
// = 898 total (without including closing brackets, closing parenthesis, comments, and new lines  )
