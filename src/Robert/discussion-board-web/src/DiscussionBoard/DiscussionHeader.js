import React from 'react';
import './DiscussionBoard.css';

//the following is importing icons from material-ui
import ForumIcon from '@material-ui/icons/Forum';
import NotificationIcon from '@material-ui/icons/Notifications';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/SendRounded';
import HelpIcon from '@material-ui/icons/HelpRounded';

function DiscussionHeader() {
  return (
    <head className='messageHeader'>
        <div className="messageHeader1"> {/** creates the header of the discussion board */}
            <h3><span className='forumHeader'><ForumIcon/></span>
                Test Channel Name
            </h3>
        </div>
        <div className="messageHeader2"> {/** adds the button features on the heading */}
            <NotificationIcon />
            <EditIcon />
    
            <div className="messageSearch"> {/** adds search word feature for the discussion */}
                <input placeholder="Search" />
                <SearchIcon />
            </div>
            <SendIcon />
            <HelpIcon />
        </div>
    </head>
  );
}
export default DiscussionHeader

// 23 lines 