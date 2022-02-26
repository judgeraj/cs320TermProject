import React, {useEffect, useState} from 'react';
import './DiscussionBoard.css';
import DiscussionHeader from './DiscussionHeader';
import UserMessage from './Message';

//the following is importing icons from material-ui
import AddCircle from '@material-ui/icons/AddCircle';
import CameraIcon from '@material-ui/icons/CameraAlt';
import PhotoIcon from '@material-ui/icons/Photo';
import MicIcon from '@material-ui/icons/Mic';
import EmojiIcon from '@material-ui/icons/EmojiEmotions';

function Discussion() {
  return (
    <section className='messageHeaderBar'> {/** imports the discussion header for the discussion board */}
        <DiscussionHeader />

        <div className="messageConvo"> {/** imports the messages for users */}
            <UserMessage />
        </div>

        <div className="messageInput"> {/** creates the type bar below, where the user types their message, imports photos, and etc */}
            <div className="inputIcons">
                <AddCircle />
                <CameraIcon />
                <PhotoIcon />
                <MicIcon />
            </div>

            <form method="POST" action="addMessage">
                <input placeholder={'add message'}/> {/** creates the type bar */}
                <button className='sendButton' 
                type="submit">Send</button>
            </form>
            <EmojiIcon />
        </div>
    </section>
  );
}
export default Discussion;

// 27 lines