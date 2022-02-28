// ConvoList.js
import "./App.css";
import React from "react";
import Convo from "./Convo";
import App from "./App";
import { useState } from "react";
import { useEffect } from "react";

function ConvoList({socket, username}){
    const [currentScreen, setCurrentScreen] = useState("chooseConvo");
    const [convo, setConvo] = useState(""); // convo the user is currently in
    const [convoList, setConvoList] = useState(["general", "music"]);

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

    useEffect(() => { // !! updated conversations appear only when a user joins !!
        socket.on("getConvos", (convos) => {
            setConvoList(convos);
        });
    }, [socket]);

    return (
        <div className="App">
            {currentScreen === "chooseConvo" ? (
                <div className="convosContainer">
                    <div className="back-login">
                        <button
                            onClick={() => {
                                setCurrentScreen("login")}}
                            >&#8592;                            
                        </button>
                    </div>
                    <h>Choose a Convo</h>
                    {convoList.map((convos) => {
                        return (
                            <button
                                onClick={() => {
                                    setConvo(convos);
                                    joinConvo();}}
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