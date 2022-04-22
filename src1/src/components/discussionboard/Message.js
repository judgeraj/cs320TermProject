import './DiscussionBoard.css';
import React from 'react';

import { Avatar } from '@material-ui/core'; // avatar icon import from material-ui

function Message({timestamp, message, user, currentUser}) { 
  // this function creates the messages for the user. It includes the user name, the message, and the timestamp 
  return (
    <section className={user.displayName === currentUser.displayName ? 'curUser' : 'oldUser'}>
       
       <div className={user.displayName === currentUser.displayName ?  'currentUserMessage' : 'notCurrent' }> {/** display the message at the right side if the current user inputted it */}
          <div className="curMessage"> {/** info about the message */}
              <h4>{user.displayName.substring(0,user.displayName.indexOf(' '))}</h4>
              <div className='messageTimestampRight'>{new Date(timestamp?.toDate()).toUTCString()}</div>
              <p>{message}</p>
          </div>
          <Avatar className='avatar' src={user.photo}/>
        </div>

        <div className={user.displayName !== currentUser.displayName ?  'oldUserMessage' : 'notCurrent' }> {/** display the messgae at the left side if the it is not from the current user */}
          <Avatar className='avatar' src={user.photo}/>
          <div className="oldMessage"> {/** info about the message */}
              <h4>{user.displayName.substring(0,user.displayName.indexOf(' '))}</h4>
              <div className='messageTimestampLeft'>{new Date(timestamp?.toDate()).toUTCString()}</div>
              <p>{message}</p>
          </div>
        
        </div>
       
    </section>
  );
}
export default Message
// 24 lines