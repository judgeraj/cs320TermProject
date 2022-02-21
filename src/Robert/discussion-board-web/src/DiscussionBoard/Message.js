import React from 'react';
import './DiscussionBoard.css';

import { Avatar } from '@material-ui/core'; /** avatar icon import from material-ui */

function Message() { 
  /** this function creates the messages for the user. It includes the user name, the message, and the timestamp */
  return (
    <div className='message'>
        <Avatar />
        <div className="messageInfo"> {/** info about the message */}
            <h4>Rob Paneriosfsd</h4>
            <span className='messageTimestamp'>10:30 am</span>
            <p>Hello World</p>
        </div>
    </div>
  );
}
export default Message

// 12 lines