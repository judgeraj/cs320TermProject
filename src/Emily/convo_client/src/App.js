// App.js
import "./App.css";
import React from "react";
import io from 'socket.io-client';
import ConvoList from "./ConvoList";
import { useState } from "react";
import { useEffect } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [currentScreen, setCurrentScreen] = useState("login"); // represent what screen to show

  const loginUser = () => {
    if ((username.length > 0) && (username.length < 16)) { // names must be between 1 to 15 characters
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
              event.key === "Enter" && loginUser()
            }}
          />
          <button onClick={loginUser}>Enter</button>
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
