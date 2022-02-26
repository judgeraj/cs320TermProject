import React from 'react';
import './DiscussionBoard.css';

import { Avatar } from '@material-ui/core'; /** avatar icon import from material-ui */

function Message() { 
  /** this function creates the messages for the user. It includes the user name, the message, and the timestamp */
  return (
    <section className='message'>
        <Avatar />
        <div className="messageInfo"> {/** info about the message */}
            <h4>Rob Panerios</h4>
            <span className='messageTimestamp'>10:30 am</span>
            <p>Hello World</p>
        </div>
    </section>
  );
}
export default Message

// 12 lines