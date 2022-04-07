// App.js - 42 lines
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
    if (userValid(username)) { // if valid username,
      setCurrentScreen("chooseConvo"); // if so, show the convoList screen
    } else {
      setValid(false); // if not, the input is not valid
    }
  }

  return (
    <div className="App">
      {currentScreen === "login" ? (
        <div className="loginContainer"> 
          <h3>Login</h3>
          <p></p>
          <button>Sign in with Google</button>
          <p></p>
          <input
            type="text"
            placeholder="Guest Username..."
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

export function userValid(username) {
  if ((username.length > 0) && (username.length < 16)) { // names must be between 1 to 15 characters
    return true; // if so, return true
  } else {
    return false; // if not, the input is not valid
  }
}

export default App;
