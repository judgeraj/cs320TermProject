import database, { authenticate } from '../../firebase/firebase';
import { selectUser } from '../../features/userSlice';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import FriendList from './FriendList';
import './FriendList.css';

//the following are importing icons from material-ui
import { Avatar, Button } from '@material-ui/core';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';           
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

function AvatarUser(){
    const userId = useSelector(selectUser)
    return(<div className="userProfileBar"> {/** creates the user profile bar at the mid left */}
                <Avatar src={userId.photo}/>
                    <div className="userInfo">
                        <h3>{userId.displayName.substring(0,userId.displayName.indexOf(' '))}</h3> {/** only grabs the first name of the user */}
                    </div> 
                <EditIcon className='editUser' />
            </div>)
}

function createTopic () { // create topics then add to the database 
    const addTopic = () => {
        const topicName = prompt("Enter new topic");
        if(topicName) {
            database.collection('topics').add({
                topicName: topicName,
            });
        }
    };
    return addTopic;
}
function TopicSidebar() { //sidebar for discussion category
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        database.collection('users').onSnapshot(snapshot => // grabs the database info  
            setTopics(snapshot.docs.map(thisData => ({
                    topic: thisData.data(),    
                    id: thisData.id,
                }))
            ));
    }, []);


    return (
        <div className="Sidebar">
            <div className="sidebarTitleBar"> {/** main title header in the sidebar */}
                <h3>Matcher Maker</h3>
            </div>

            <div className='sidebarTopicsBar'> {/** topic section in the sidebar */}
                {AvatarUser()}

                <div className='topicsTitle'> {/** creates the header of the topic list */}
                    <div className='topicsTitleBar'>
                        <h4>Friends</h4>
                    </div> {/* the list of topics for discussion */}
                </div>

                <div className="topicList">
                    {topics.map(({id: photo, topic: displayName}) => (
                        <FriendList 
                            key={photo} 
                            id={displayName.photo} 
                            topicName={photo}/>
                    ))}
                </div>
            </div>
            
            <div className="sidebarBottomBar">
                <Button onClick={() => authenticate.signOut()}>Log Out</Button>
                <SettingsIcon/></div>
        </div>
  );
}
export default TopicSidebar
// 61 lines

//  TopicAnimeSidebar directory contains 
//    170     (topicAnime css) 
//  + 224    (all js file in this directory) 
//  = 394 lines total lines in topicAnimeSidebar directory