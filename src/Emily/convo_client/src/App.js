// THIS FILE CONTAINS MY CODE

import './App.css';
import React from "react";
import io from 'socket.io-client';
import Convo from "./Convo";
import { useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [convo, setConvo] = useState("");
  const [showConvo, setShowConvo] = useState(false); // state first set to false

  const joinConvo = () => {
    if (username !== "" && convo !== "") {
      socket.emit("joinConvo", convo);
      setShowConvo(true);
    }
  }

  return (
    <div className="App">
      {!showConvo ? (
        <div className="joinConvoContainer">
          <h1>Join Convo</h1>
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && joinConvo()
            }}
          />
          <input
            type="text"
            placeholder="Convo Name..."
            onChange={(event) => {
              setConvo(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && joinConvo()
            }}
          />         
          <button onClick={joinConvo}>Join</button> 
        </div>
      ) : (
        <Convo socket={socket} username={username} convo={convo}/>
      )}
    </div>
  );
}

export default App;
