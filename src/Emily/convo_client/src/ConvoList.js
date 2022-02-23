// THIS FILE CONTAINS MY CODE -  lines
import "./App.css";
import io from 'socket.io-client';
import React from "react";
import Convo from "./Convo";
import App from "./App";
import { useState } from "react";

function ConvoList({socket, username}){
    const [currentScreen, setCurrentScreen] = useState("chooseConvo");
    const [convo, setConvo] = useState("convo1"); // convo the user is currently in

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

    return (
        <div className="App">
            {currentScreen === "chooseConvo" ? (
                <div className="convosContainer">
                    <div className="back-login">
                        <button
                            onClick={() =>
                            setCurrentScreen("login")}
                            >&#8592;                            
                        </button>
                    </div>
                    <h1>Choose a Convo</h1>
                    <button onClick={joinConvo}>Convo 1</button>
                    <button onClick={joinConvo}>Convo 2</button>
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
                    <button onClick={joinConvo}>Join</button> 
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

export default ConvoList;