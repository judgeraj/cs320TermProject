import React from 'react';
import "./TopicAnimeSidebar.css";
import ForumIcon from '@material-ui/icons/Forum'; //imports forum icon

function TopicList({id, channel}) {
    return (
        <div className='topicList'> {/** creates the topics in the topic Sidebar */}
            <h4>
                <span className='forumIcon'>
                    <ForumIcon/></span>
                    Discussion
            </h4>
        </div>
    );
}
export default TopicList;
// 13 lines