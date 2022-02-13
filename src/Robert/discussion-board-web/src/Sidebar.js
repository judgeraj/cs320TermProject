import React from 'react'
import './Sidebar.css'
import TopicList from './TopicList';

//the following are importing icons from material-ui
import ExpandIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';           
import { Avatar } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

function Sidebar() { //sidebar for discussion category
  return (
    <div className="Sidebar">
        <div className="sidebarTitleBar"> {/** main title header in the sidebar */}
            <h3>Karo's Discussion Board</h3>
            <ExpandIcon />
        </div>

        <div className='sidebarTopicsBar'> {/** topic section in the sidebar */}
            <div className="userProfileBar"> {/** creates the user profile bar at the bottom left */}
                <Avatar />
                  <div className="userInfo">
                      <h3>userName</h3>
                      <p>ID: 0001</p>
                  </div>
                <EditIcon className='editUser' fontSize='small'/>
            </div>
            <div className='topicsTitle'>
                <div className='topicsTitleBar'>
                      <h4>Topics</h4>
                </div>
                <AddIcon className="addTopics"/>
            </div>
            <div className="topicList">
                <TopicList/>
                <TopicList/>
                <TopicList/>
                <TopicList/>
                <TopicList/>
            </div>
        </div>

        <div className="userSettings"><SettingsIcon/></div>
    </div>
  );
}
export default Sidebar