import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Messages from './Discussion';

function App() {
  return ( 
    <div className="app"> 
      <Sidebar /> {/* this creates the sidebar section of the page */}
      <Messages /> {/** this creates the chat section of the page */}
    </div>
  );
}
export default App;
