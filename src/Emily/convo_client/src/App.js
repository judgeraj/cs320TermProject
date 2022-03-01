// App.js
import "./App.css";
import React from "react";
import io from 'socket.io-client';
import ConvoList from "./ConvoList";
import { useState } from "react";
import { useEffect } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState(""); // represent the user logging in
  const [currentScreen, setCurrentScreen] = useState("login"); // represent what screen to show
  const [valid, setValid] = useState(true); // true when username input is valid

  const loginUser = () => {
    if ((username.length > 0) && (username.length < 16)) { // names must be between 1 to 15 characters
      setCurrentScreen("chooseConvo");
    } else {
      setValid(false);
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
              event.key === "Enter" && loginUser()
            }}
          />
          <button onClick={loginUser}>Enter</button>
          <div className="error">
            {!valid && (
              <p>Username must be between 1 and 15 characters.</p>
            )}
          </div>
        </div>
      ) : (
        <ConvoList
          socket={socket}
          username={username}
        />
      )}
    </div>
  );
}

export default App;
