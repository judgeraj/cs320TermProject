import TopicSidebar from '../anime/TopicSidebar'
import DiscussionHeader from './DiscussionHeader';
import React, { useEffect, useState} from 'react';
import UserMessage from './Message';
import './DiscussionBoard.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectTopicId, selectTopicName } from '../../features/appSlice';
import firebase from 'firebase/compat/app';

//the following is importing icons from material-ui
import { AddCircle, CameraAlt,Photo,
     Mic, EmojiEmotions, Menu} from '@material-ui/icons';
import database from '../../firebase/firebase';

function sendMssg(topicId, user, newInput, setNewInput){ //a function that adds the messages to the firebase database
    const mssg = e => { 
        e.preventDefault();
    
        database.collection("topics").doc(topicId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:newInput,
            user: user,
        });
        setNewInput("");
    }
    return mssg
}
function Discussion() {
    // handles the animation of the sidebar 
    const [topicbar, setTopicbar] = useState(); 
    const showBar = () => setTopicbar(!topicbar); 

    const user = useSelector(selectUser)
    const topicId = useSelector(selectTopicId)
    const topicName = useSelector(selectTopicName)
    const [newInput, setNewInput] = useState("")
    const [newMessage, setNewMessage] = useState([])
    
    useEffect(() => { //retrieving the messages from the firebase and assign the returned data to an array
        if(topicId){
            database.collection("topics")
                .doc(topicId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => 
                    setNewMessage(snapshot.docs.map((doc) => doc.data()))

                    //DEAD CODE: attempted to pass the ID instead of the data
                    //setNewMessage(snapshot.docs.map((doc) => doc.id))
                );
        }
    }, [topicId]);
    console.log(newMessage)
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
                {newMessage.map( (message) => (
                    <UserMessage 
                        //DEAD CODE: attempted to refactor by passing ID instead of the data
                        // messageDocId={message}

                        topicId={topicId}
                        user={message.user}
                        timestamp={message.timestamp}
                        message={message.message}
                        currentUser={user}/> 
                ))}
            </div>

            <div className="messageInput"> {/** creates the type bar below, where the user types their message, imports photos, and etc */}
                <div className="inputIcons">
                    <AddCircle />
                    <CameraAlt/>
                    <Photo />
                    <Mic />
                </div>
                <form method="POST" action="addMessage"> {/**enables user to input messages for the discussion board */}
                    <input 
                        disabled = {!topicId}
                        value = {newInput}
                        onChange = {
                            (e) => setNewInput(e.target.value)
                        }
                        placeholder = {`add message in ${topicName}`}/> {/** creates the type bar */}
                    <button 
                        className='sendButton'
                        disabled={!topicId} 
                        type="submit"
                        onClick={sendMssg(topicId, user, newInput, setNewInput)}>
                    </button>
                </form>
                <EmojiEmotions />
            </div>
        </div>
    );
}
export default Discussion;
// 80 lines

//discussionboard contains 
//    136 (DiscussionBoard css)
//  + 128  (all js file in this directory)
//  = 264 lines total in dicussionboard directory