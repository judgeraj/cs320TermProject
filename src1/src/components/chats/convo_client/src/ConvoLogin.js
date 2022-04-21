// App.js - 44 lines
import "./App.css";
import React from "react";
import io from 'socket.io-client';
import ConvoList from "./ConvoList";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/userSlice';

const socket = io.connect("http://localhost:3001");

function ConvoLogin() {
  const [username, setUsername] = useState(""); // represent the user logging in
  const [currentScreen, setCurrentScreen] = useState("login"); // represent what screen to show
  const [convos, setConvos] = useState(["general", "music"]);
  const [valid, setValid] = useState(true); // true when username input is valid

  /* login the user if the username is valid */
  const loginUser = () => {
    if (userValid(username)) { // if valid username,
      setCurrentScreen("chooseConvo"); // if so, show the convoList screen
    } else {
      setValid(false); // if not, the input is not valid
    }
  }

  /* get an updated list of convos whenever a new
      convo is added */
  // useEffect(() => { // !! Bug: updated convos appear only once when another user joins a convo !!
  //   socket.on("getConvos", (convos) => {
  //       setConvos(convos);
  //   });
  // });

  return (
    <div className="App">
      {currentScreen === "login" ? (
        <div className="loginContainer"> 
          <h3>Login</h3>
          {/* <p></p>
          <button>Sign in with Google</button>
          <p></p> */}
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
          //convos={convos}
        />
      )}
    </div>
  );
}

/* check that the username is between 1 and 15 characters long */
export function userValid(username) {
  if ((username.length > 0) && (username.length < 16)) {
    return true; // if so, return true
  }
  return false; // if not, the input is not valid
}

export default ConvoLogin;
