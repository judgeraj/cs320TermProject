// THIS FILE CONTAINS MY CODE - 47 lines
import "./App.css";
import React from "react";
import io from 'socket.io-client';
import Convo from "./Convo";
import ConvoList from "./ConvoList";
import { useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [convo, setConvo] = useState(""); // convo the user is currently in
  const [currentScreen, setCurrentScreen] = useState("login"); // represent what screen to show

  const chooseConvo = () => {
    if ((username.length > 0) && (username.length < 16)) { // names must be between 1 to 15 characters
      setConvo("convo1");
      setCurrentScreen("chooseConvo");      
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
      ) : (
        <ConvoList
          socket={socket}
          username={username}
          convo={convo}
        />
      )}
    </div>
  );
}

export default App;
