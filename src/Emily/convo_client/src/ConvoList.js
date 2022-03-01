// ConvoList.js
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
        if ((convo.length > 0) && (convo.length < 16) && (convo !== " ")) { // convo name must be between 1 and 15 characters long
            const user = { // store the user's convo and username
                convo: convo,
                username: username,
            };
            socket.emit("joinConvo", user); // tell server to let the user join the convo
            setCurrentScreen("convo");
        } else {
            setValid(false);
        }
    }

    // !! Bug: requires double clicking to join convo !!
    const attemptJoin = (convo) => {
        setConvo(convo);
        joinConvo();
    }

    useEffect(() => { // !! Bug: updated convos appear only when a new user joins !!
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
                            <button
                                onClick={() => {
                                    attemptJoin(convos);}}
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
                    <button onClick={joinConvo}>Join</button> 
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

export default ConvoList;