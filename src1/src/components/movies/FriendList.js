import React from 'react';
import "./FriendList.css";
import ForumIcon from '@material-ui/icons/Forum'; //imports forum icon
import { useDispatch } from 'react-redux';
import { setTopic } from '../../features/appSlice';
import { Avatar, Button } from '@material-ui/core';
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

function TopicList({id, topicName}) {
    const dispatch = useDispatch();
    console.log("id" + id)
    console.log("topicname" + topicName)
    const user = useSelector(selectUser)
    return (
        //enables the changing of the display for each discussion topics\console.log("id" + id)
        <div className='topicList' onClick={() =>  updateFriend(id, topicName)}> {/* creates the topics in the topic Sidebar */}
            <div className={topicName === user.displayName ? 'noReviewRating':'rateANDreview'}>
                
                <span className='forumIcon'>
                <Avatar src={id}/></span>
                <h4> {topicName}
                </h4>
            </div>
        </div>
    );
}
export default TopicList;
// 18 lines