import React from 'react'
import './DiscussionHeader.css'

//the following is importing icons from material-ui
import ForumIcon from '@material-ui/icons/Forum';
import NotificationIcon from '@material-ui/icons/Notifications';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/SendRounded';
import HelpIcon from '@material-ui/icons/HelpRounded';

function DiscussionHeader() {
  return (
    <div className='messageHeader'>
        <div className="messageHeader1">
            <h3>
                <span className='forumHeader'><ForumIcon/></span>
                Test Channel Name
            </h3>
        </div>
        <div className="messageHeader2">
            <NotificationIcon />
            <EditIcon />
    
            <div className="messageSearch">
                <input placeholder="Search" />
                <SearchIcon />
            </div>
            <SendIcon />
            <HelpIcon />
        </div>
    </div>
  );
}
export default DiscussionHeader