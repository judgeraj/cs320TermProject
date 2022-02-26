import React, { useEffect, useState } from 'react'
import './TopicAnimeSidebar.css'
import TopicList from './TopicList';

//the following are importing icons from material-ui
import ExpandIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';           
import { Avatar, Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import database, { authenticate } from '../firebase';

function AvatarUser(){
    const userId = useSelector(selectUser)
    return(<div className="userProfileBar"> {/** creates the user profile bar at the bottom left */}
                <Avatar src={userId.photo}/>
                    <div className="userInfo">
                        <h3>{userId.displayName.substring(0,userId.displayName.indexOf(' '))}</h3>
                    </div> 
                <EditIcon className='editUser' />
            </div>)
}
function createTopic () {
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
        database.collection("topics").onSnapshot((Snapshot) => 
            setTopics(Snapshot.docs.map((doc) => ({
                    id: doc.id,
                    topic: doc.data(),ß
                }))
            ));
    }, []);
    return (
        <section className="Sidebar">
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
                    <AddIcon onClick={createTopic()} className="addTopics"/> {/** the list of topics for discussion */}
                </div>
                <div className="topicList">
                    {topics.map(({id, topic}) => (
                        <TopicList key={id} id={id} topicName={topics.topicName}/>
                    ))}
                </div>
            </div>
            <div className="sidebarBottomBar">
                <Button onClick={() => authenticate.signOut()}>Log Out</Button>
                <SettingsIcon/></div>
        </section>
  );
}
export default TopicSidebar
// 37 lines