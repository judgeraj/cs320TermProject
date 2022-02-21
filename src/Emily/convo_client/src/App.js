// THIS FILE CONTAINS MY CODE - 48 lines
import './App.css';
import React from "react";
import io from 'socket.io-client';
import Convo from "./Convo";
import { useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [convo, setConvo] = useState(""); // convo the user is currently in
  const [currentScreen, setCurrentScreen] = useState("login"); // represent what screen to show

  const joinConvo = () => {
    if ((convo.length > 0) && (convo.length < 16)) {
      const user = {
        convo: convo,
        username: username,
      };
      socket.emit("joinConvo", user); // tell server to join user in convo
      setCurrentScreen("convo");
    }
  }

  const chooseConvo = () => {
    if ((username.length > 0) && (username.length < 16)) { // names must be between 1 to 15 characters
      setConvo("convo1");
      setCurrentScreen("choose");      
    }
  }
 
  return (
    <div className="App">
      {currentScreen === "login" ? (
        <div className="loginContainer">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && chooseConvo()
            }}
          />
          <button onClick={chooseConvo}>Enter</button> 
        </div>
      ) : currentScreen === "convo" ? (
        <Convo
          socket={socket}
          username={username}
          convo={convo}
        />
      ) : (
        <div className="convosContainer">
          <p>Choose a convo:</p>
          <button onClick={joinConvo}>convo1</button>
          <button onClick={joinConvo}>convo2</button>
        </div>
      )}
    </div>
  );
}

export default App;
