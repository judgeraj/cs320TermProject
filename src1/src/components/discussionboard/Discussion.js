import TopicSidebar from '../anime/TopicSidebar'
import DiscussionHeader from './DiscussionHeader';
import React, { useEffect, useState} from 'react';
import UserMessage from './Message';
import './DiscussionBoard.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectTopicId, selectTopicName, setTopic } from '../../features/appSlice';
import firebase from 'firebase/compat/app'

//the following is importing icons from material-ui
import { AddCircle, CameraAlt,Photo,
     Mic, EmojiEmotions, Menu} from '@material-ui/icons';
import database from '../../firebase/firebase';


function Discussion() {
    /** handles the animation of the sidebar */
    const [topicbar, setTopicbar] = useState(); 
    const showBar = () => setTopicbar(!topicbar); 

    const user = useSelector(selectUser)
    const topicId = useSelector(selectTopicId)
    const topicName = useSelector(selectTopicName)
    const [input, setInput] = useState("")
    const [message, setMessage] = useState([])
    
    useEffect(() => {
        if(topicId){
            database.collection("topics")
            .doc(topicId)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
                setMessage(snapshot.docs.map((doc) => doc.data()))
            );
        }
    }, [topicId]);

    const sendMssg = e => { 
        e.preventDefault();
    
        database.collection("topics").doc(topicId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user: user,
        });
        setTopic("");
    }
    
    return (
        <div className='messageHeaderBar'> {/** imports the discussion header for the discussion board */}
            <div className='menuHeader'>
                <Menu onClick={showBar} />  {/** shows the discusionHeader */}
                <DiscussionHeader topicName={topicName} />
            </div>

            <nav className={topicbar ? 'sidebarActive open' : 'sidebarActive'}> 
                <div onClick={showBar}> {/** shows the side bar on click */}
                    <TopicSidebar/>
                </div>
            </nav>

            <div className="messageConvo"> {/** imports the messages for users */}
                {message.map( (message) => (
                    <UserMessage 
                        user={message.user}
                        timestamp={message.timestamp}
                        message={message.message}/>
                ))}
            </div>

            <div className="messageInput"> {/** creates the type bar below, where the user types their message, imports photos, and etc */}
                <div className="inputIcons">
                    <AddCircle />
                    <CameraAlt/>
                    <Photo />
                    <Mic />
                </div>
                <form method="POST" action="addMessage">
                    <input value={input}
                        disabled={!topicId}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`add message in ${topicName}`}/> {/** creates the type bar */}
                    <button 
                        className='sendButton'
                        disabled={!topicId} 
                        type="submit"
                        onClick={sendMssg}>
                    </button>
                </form>
                <EmojiEmotions />
            </div>
        </div>
    );
}
export default Discussion;

// 40 lines

//discussionboard contains 
//    106 (DiscussionBoard css)
//  + 79  (all js file in this directory)
//  = 185 lines total in dicussionboard directory