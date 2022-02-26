import React, { useEffect } from 'react';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import TopicSidebar from './TopicAnimeSidebar/TopicSidebar';
import Messages from './DiscussionBoard/Discussion';
import AnimeSidebar from './TopicAnimeSidebar/AnimeSidebar';
import {selectUser } from './features/userSlice';
import LogginIn from "./loginUser";
import { authenticate } from './firebase';
import {login, logout} from './features/userSlice'

function UserLoggin(){
  const hook = useDispatch();
  useEffect(() => {
    authenticate.onAuthStateChanged((User) => {
      if(User) {
        hook(login({
          uid: User.uid,
          photo: User.photoURL,
          email: User.email,
          displayName: User.displayName
        }))
        return;
      } hook(logout())
    }) 
  },[hook])
};
function App() { /** create the entire webpage */
  const userId = useSelector(selectUser);
  UserLoggin();
  return ( 
      <div className="app"> 
      {userId ? (<>
          <TopicSidebar /> {/* this creates the sidebar section of the page */}
          <Messages /> {/** this creates the chat section of the page */}
          <AnimeSidebar /> {/**rate and review for Anime user Watched*/}</>

      ):(<LogginIn/>)}
      </div>
  );
}
export default App;
// 12 lines