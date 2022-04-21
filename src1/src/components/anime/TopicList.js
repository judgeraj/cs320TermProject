import React from 'react';
import "./TopicAnimeSidebar.css";
import ForumIcon from '@material-ui/icons/Forum'; //imports forum icon
import { useDispatch } from 'react-redux';
import { setTopic } from '../../features/appSlice';

function TopicList({id, topicName}) {
    const dispatch = useDispatch();
    return (
        <div className='topicList' onClick={() =>  dispatch(setTopic({
            topicId: id,
            topicName: topicName
        }))}> {/** creates the topics in the topic Sidebar */}
            <h4>
                <span className='forumIcon'>
                    <ForumIcon/></span>
                    {topicName}
            </h4>
        </div>
    );
}
export default TopicList;
// 18 lines