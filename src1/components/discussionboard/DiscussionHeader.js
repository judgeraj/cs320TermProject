import './DiscussionBoard.css';
import React from 'react';

//the following is importing icons from material-ui
import { Forum, Notifications, Edit,
     Search, SendRounded, HelpRounded } from '@material-ui/icons';

function DiscussionHeader() {
    return (
        <div className='messageHeader'>
            <div className="messageHeader1"> {/** creates the header of the discussion board */}
                <h3><span className='forumHeader'>
                    <Forum/></span>
                    Test Channel Name
                </h3>
            </div>
            
            <div className="messageHeader2"> {/** adds the button features on the heading */}
                <Notifications />
                <Edit />
                <div className="messageSearch"> {/** adds search word feature for the discussion */}
                    <input placeholder="Search" />
                    <Search />
                </div>
                <SendRounded />
                <HelpRounded />
            </div>
        </div>
    );
}
export default DiscussionHeader
// 25 lines 