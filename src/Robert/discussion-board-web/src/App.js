import React from 'react';
import './App.css';
import TopicSidebar from './TopicAnimeSidebar/TopicSidebar';
import Messages from './DiscussionBoard/Discussion';
import AnimeSidebar from './TopicAnimeSidebar/AnimeSidebar';

function App() { {/** create the entire webpage */}
  return ( 
    <div className="app"> 
      <TopicSidebar /> {/* this creates the sidebar section of the page */}
      <Messages /> {/** this creates the chat section of the page */}
      <AnimeSidebar /> {/**rate and review for Anime user Watched*/}
    </div>
  );
}
export default App;
// 12 lines