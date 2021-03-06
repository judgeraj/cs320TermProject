// ConvoList.js - 65 lines
import "./App.css";
import React from "react";
import Convo from "./Convo";
import App from "./App";
import { useState } from "react";
import { useEffect } from "react";

function ConvoList({socket, username}){
    const [currentScreen, setCurrentScreen] = useState("chooseConvo"); // current screen shown
    const [convo, setConvo] = useState(" "); // convo the user is currently in
    const [convoList, setConvoList] = useState(["general", "music"]); // list of convos that exist
    const [valid, setValid] = useState(true); // true when convo name input is valid

    const joinConvo = () => {
        if (convoValid(convo, convoList) === convo) { // convo name must be between 1 and 15 characters long
            socket.emit("joinConvo", addUser(convo, username)); // tell server to let the user join the convo
            setCurrentScreen("convo"); // show the convo screen
        } else {
            setValid(false); // else, convo name is invalid
        }
    }

    // !! Bug: requires double clicking to join convo !!
    const attemptJoin = (convo) => { // runs when a convo button is clicked
        setConvo(convo);
        joinConvo();
    }

    useEffect(() => { // !! Bug: updated convos appear only once when another user joins a convo !!
        socket.on("getConvos", (convos) => { // get updated list of convos
            setConvoList(convos);
        });
    }, [socket]);

    return (
        <div className="App">
            {currentScreen === "chooseConvo" ? (
                <div className="convosContainer">
                    <button className="back-login"
                        onClick={() => {
                            setCurrentScreen("login")}}
                        >&#8592;                            
                    </button>
                    <h3>Choose a Convo</h3>
                    {convoList.map((convos) => {
                        return (
                            <button key="{convos}"
                                onClick={() => {
                                    attemptJoin(convos);
                                }}
                                >{convos}
                            </button>
                        );
                    })}
                    <input
                        type="text"
                        placeholder="New Convo..."
                        onChange={(event) => {
                            setConvo(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && joinConvo()
                        }}
                    />
                    <button onClick={joinConvo}>Create</button> 
                    <div className="error">
                        {!valid && (
                            <p>Convo must be between 1 and 15 characters.</p>
                        )}
                    </div>
                </div>
            ) : currentScreen === "convo" ? (
                <Convo
                    socket={socket}
                    username={username}
                    convo={convo}
                />
            ) : (
                <App></App>
            )}
        </div>
    );
}

// check if convo name entered is valid and doesn't already exist
export function convoValid(convo, convoList) {
    if (convoList.includes(convo)){
        return "";
    }
    if ((convo.length > 0) && (convo.length < 16) && (convo !== " ")) { // names must be between 1 to 15 characters
      return convo; // if so, return the name
    } else {
      return ""; // if not, the input is empty
    }
}

export function addUser(convo, username) {
    const user = { // store the user's convo and username
        convo: convo,
        username: username,
    };
    return user;
}

export default ConvoList;