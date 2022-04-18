import './DiscussionBoard.css';
import React from 'react';

import { Avatar } from '@material-ui/core'; /** avatar icon import from material-ui */

function Message({timestamp, message, user}) { 
  /** this function creates the messages for the user. It includes the user name, the message, and the timestamp */
  return (
    <section className='message'>
       
        <div className="messageInfo"> {/** info about the message */}
            <h4>{user.displayName}</h4>
            <div className='messageTimestamp'>{new Date(timestamp?.toDate()).toUTCString()}</div>
            <p>{message}</p>
        </div>
        <Avatar src={user.photo}/>
    </section>
  );
}
export default Message
// 14 lines