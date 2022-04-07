import TopicSidebar from '../TopicAnimeSidebar/TopicSidebar'
import DiscussionHeader from './DiscussionHeader';
import React, { useState} from 'react';
import UserMessage from './Message';
import './DiscussionBoard.css';

//the following is importing icons from material-ui
import { AddCircle, CameraAlt,Photo,
     Mic, EmojiEmotions, Menu} from '@material-ui/icons';

function Discussion() {
    /** handles the animation of the sidebar */
    const [topicbar, setTopicbar] = useState(); 
    const showBar = () => setTopicbar(!topicbar); 
    return (
        <section className='messageHeaderBar'> {/** imports the discussion header for the discussion board */}
            <div className='menuHeader'>
                <Menu onClick={showBar} />  {/** shows the discusionHeader */}
                <DiscussionHeader />
            </div>

            <nav className={topicbar ? 'sidebarActive open' : 'sidebarActive'}> 
                <div onClick={showBar}> {/** shows the side bar on click */}
                    <TopicSidebar/>
                </div>
            </nav>

            <div className="messageConvo"> {/** imports the messages for users */}
                <UserMessage />
            </div>

            <div className="messageInput"> {/** creates the type bar below, where the user types their message, imports photos, and etc */}
                <div className="inputIcons">
                    <AddCircle />
                    <CameraAlt/>
                    <Photo />
                    <Mic />
                </div>
                <form method="POST" action="addMessage">
                    <input placeholder={'add message'}/> {/** creates the type bar */}
                    <button className='sendButton' 
                    type="submit">Send</button>
                </form>
                <EmojiEmotions />
            </div>
        </section>
    );
}
export default Discussion;

// 40 lines

//discussionboard contains 
//    106 (DiscussionBoard css)
//  + 79  (all js file in this directory)
//  = 185 lines total in dicussionboard directory