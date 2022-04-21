// ConvoList.js - 72 lines
import "./App.css";
import React from "react";
import Convo from "./Convo";
import ConvoLogin from "./ConvoLogin";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import database from '../../../../firebase/firebase';
import { selectUser } from '../../../../features/userSlice';

function ConvoList({socket, username}){
    const [currentScreen, setCurrentScreen] = useState("chooseConvo"); // current screen shown
    const [convo, setConvo] = useState(" "); // convo the user is currently in
    const [convoList, setConvoList] = useState([]); // list of convos that exist
    const [valid, setValid] = useState(true);
    const user = useSelector(selectUser) // user that's signed in

    /* when joining an existing convo,
       the user's convo and username are stored
       in the server and then the current screen
       is switched to convo screen */
    const joinConvo = () => { 
        const user = { // store the user's convo and username
            convo: convo,
            username: username,
        };
        socket.emit("joinConvo", user); // tell server to let the user join the convo
        setCurrentScreen("convo"); // show the convo screen
    }

    /* for joining a new convo, it must be checked that
       the convo name is valid. then the user can join. */
    const joinNewConvo = () => { // joining a new convo
        if (convoValid(convo)){
            const user = { // store the user's convo and username
                convo: convo,
                username: username,
            };
            socket.emit("joinConvo", user); // tell server to let the user join the convo
            setCurrentScreen("convo"); // show the convo screen
        } else {
            setValid(false); // else, convo name is invalid
        }
        // // store into Firebase as well
        // database.collection("convos").doc(convo).collection("users").add({
        //     username: username,
        // }); 
    }

    // !! Bug: requires double clicking to join convo !!
    /* attempt to join a convo when an existing convo's
       button is clicked */
    const attemptJoin = (convo) => {
        setConvo(convo);
        joinConvo();
    }

    /* get an updated list of convos whenever a new
       convo is added */
    // useEffect(() => { // !! Bug: updated convos appear only once when another user joins a convo !!
    //     socket.on("getConvos", (convos) => {
    //         setConvoList(convos);
    //     });
    // }, [socket]);

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
                            <button key={convos}
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
                            event.key === "Enter" && joinNewConvo()
                        }}
                    />
                    <button onClick={joinNewConvo}>Create</button> 
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
                <ConvoLogin></ConvoLogin>
            )}
        </div>
    );
}

/* check that the convo name is between 1 and 15 characters long */
function convoValid(convo){
    if ((convo.length > 0) && (convo.length < 16) && (convo !== " ")) { 
        return true;
    }
    return false; // else, convo name is invalid
}

export default ConvoList;
