import database , { authenticate }from '../firebase'; //, { authenticate }
import { selectUser } from '../features/userSlice';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TopicList from './TopicList';
import './TopicAnimeSidebar.css'


//the following are importing icons from material-ui
import { Avatar, Button } from '@material-ui/core';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';           
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

function AvatarUser(){
    const userId = useSelector(selectUser)
    return(<div data-testid="avatar" className="userProfileBar"> {/** creates the user profile bar at the mid left */}
                <Avatar src={userId.photo}/>
                    <div className="userInfo">
                        <h3>{userId.displayName.substring(0,userId.displayName.indexOf(' '))}</h3> {/** only grabs the first name of the user*/} 
                    </div> 
                <EditIcon className='editUser' />
            </div>)
}
export function isTopicCreated (topicName){
    if(topicName){
        database.collection('topics').add({
            topicName: topicName,
        });
        return true
    }
    return false
}
export function createTopic () { /** create topics then add to the database */
    const addTopic = () => {
        const topicName = prompt("Enter new topic");
        isTopicCreated(topicName)
    };
    return addTopic;
}
function TopicSidebar() { //sidebar for discussion category
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        database.collection("topics").onSnapshot((Snapshot) => /** grabs the database info  */
            setTopics(Snapshot.docs.map((thisData) => ({
                    topic: thisData.data(),    
                    id: thisData.id,
                }))
            ));
    }, []);
    return (
        <div className="Sidebar">
            <div className="sidebarTitleBar"> {/** main title header in the sidebar */}
                <h3>Karo's Discussion Board</h3>
                <ExpandIcon />
            </div>

            <div className='sidebarTopicsBar'> {/** topic section in the sidebar */}
                {AvatarUser()}

                <div className='topicsTitle'> {/** creates the header of the topic list */}
                    <div className='topicsTitleBar'>
                        <h4>Topics</h4>
                    </div>
                    <AddIcon data-testid="topicId" onClick={createTopic()} className="addTopics"/> {/** the list of topics for discussion */}
                </div>

                <div className="topicList">
                        <TopicList />
                </div>
            </div>
            
            <div className="sidebarBottomBar">
                 <Button data-testid="signOutId" onClick={() => authenticate.signOut()}>Log Out</Button> {/**authenticate.signOut() */}
                <SettingsIcon/></div>
        </div>
  );
}
export default TopicSidebar
// 58 lines

//  TopicAnimeSidebar directory contains 
//    124     (topicAnime css) 
//  + 128    (all js file in this directory) 
//  = 256 lines total lines in topicAnimeSidebar directory