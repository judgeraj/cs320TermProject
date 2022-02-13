import React from 'react';
import "./TopicList.css";
import ForumIcon from '@material-ui/icons/Forum';

function TopicList({id, channel}) {
  return (
    <div className='topicList'>
      <h4>
        <span className='forumIcon'><ForumIcon/></span>Discussion
      </h4>
    </div>
  );
}

export default TopicList;