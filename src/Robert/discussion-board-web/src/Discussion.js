import React from 'react'
import './Discussion.css'
import MessageHeader from './DiscussionHeader'
import UserMessage from './Message';

import AddCircle from '@material-ui/icons/AddCircle';
import CameraIcon from '@material-ui/icons/CameraAlt';
import PhotoIcon from '@material-ui/icons/Photo';
import MicIcon from '@material-ui/icons/Mic';
import EmojiIcon from '@material-ui/icons/EmojiEmotions'

function Discussion() {
  return (
    <div className='messageHeaderBar'>
        <MessageHeader />

        <div className="messageConvo">
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <UserMessage />
        </div>

        <div className="messageInput">
            <div className="inputIcons">
                <AddCircle />
                <CameraIcon />
                <PhotoIcon />
                <MicIcon />
            </div>

            <form>
                <input placeholder={'add message'}/>
                <button className='sendButton' type="submit">Send</button>
            </form>

            <EmojiIcon />
        </div>
    </div>
  );
}
export default Discussion