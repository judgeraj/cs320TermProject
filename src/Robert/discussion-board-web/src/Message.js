import React from 'react'
import './Message.css'

import { Avatar } from '@material-ui/core';

function Message() {
  return (
    <div className='message'>
        <Avatar />
        <div className="messageInfo">
            <h4>ajhajkjkad</h4>
            <span className='messageTimestamp'>this is messageTimestamp</span>
            <p>this is the message</p>
        </div>
    </div>
  );
}

export default Message