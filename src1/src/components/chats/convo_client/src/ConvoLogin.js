// ConvoLogin.js - 49 lines + 5 doc comments
import "./App.css";
import React from "react";
import io from "socket.io-client";
import ConvoList from "./ConvoList";
import {useState} from "react";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../../../features/userSlice";

const socket = io.connect("http://localhost:3001");

/* returns a login screen for the user to enter a username of their choice
   or moves on to the list of convos screen once a valid username is entered */
function ConvoLogin() {
  const [username, setUsername] = useState(""); // name of user logging in
  const [currentScreen, setCurrentScreen] = useState("login"); // which screen to show
  const [convoList, setConvoList] = useState([]); // existing convos
  const [valid, setValid] = useState(true); // when to show error message for invalid username
  const [fullConvos, setFullConvos] = useState([]); // list of convos you can't join

  /* login the user by changing the current screen if the username is valid */
  const loginUser = () => {
    if (userValid(username)) { // if valid username,
      setCurrentScreen("chooseConvo"); // show the convo list screen
    } else {
      setValid(false); // username is not valid
    }
  }

  /* get updated list of convos whenever server indicates there's a new convo added */
  useEffect(() => {
    socket.on("getConvos", (convos) => {
        setConvoList(convos);
    });
  });

  return (
    <div className="App">
      {currentScreen === "login" ? ( // show login screen
        <div className="loginContainer"> 
          <h3>Login</h3>
          <button>Sign in with Google</button>
          <input
            type="text"
            placeholder="Guest Username..."
            onChange={(event) => { // set username when input changes
              setUsername(event.target.value);
            }}
            onKeyPress={(event) => { // press enter button to join
              event.key === "Enter" && loginUser()
            }}
          />
          <button onClick={loginUser} // or click Enter button to join
              >Enter
          </button>
          <div className="error">
            {!valid && ( // print error message if username invalid
              <p>Username must be between 1 and 15 characters.</p>
            )}
          </div>
        </div>
      ) : ( // switch to list of convos screen
        <ConvoList
          socket={socket}
          username={username}
          convos={convoList}
          fullConvos={fullConvos}
        />
      )}
    </div>
  );
}

/* check if the username passed in is between 1 and 15 characters long */
export function userValid(username) {
  if ((username.length >= 1) && (username.length <= 15)) {
    return true; // if so, return true
  }
  return false; // if not, the input is not valid
}

export default ConvoLogin;
