import React from 'react';
import "./FriendList.css";
// import ForumIcon from '@material-ui/icons/Forum'; //imports forum icon
// import { useDispatch } from 'react-redux';
// import { setTopic } from '../../features/appSlice';
import { Avatar } from '@material-ui/core';
import database from '../../firebase/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function updateFriend(id, topicName) {
    const userName = database.collection('Chosen One').doc("friend")
    const update = () => {
        console.log("id" + id)
        console.log("topicname" + topicName)
        userName.set({
            name: topicName,
            photo: id
        });
        console.log('should be updating')
    }
    update()
    return update
}

function TopicList({id, userName}) {
    // const dispatch = useDispatch();
    console.log("id" + id)
    console.log("topicname" + userName)
    const user = useSelector(selectUser)
    
    return (
        //enables the changing of the display for each discussion topics\console.log("id" + id)
        <div className='friendList' onClick={() =>  updateFriend(id, userName)}> {/* creates the topics in the topic Sidebar */}
            <div className={userName === user.displayName ? 'noView':'view'}>
                
                <span className='friendIcon'>
                <Avatar src={id}/></span>
                <h4> {userName}
                </h4>
            </div>
        </div>
    );
}
export default TopicList;
// 18 lines