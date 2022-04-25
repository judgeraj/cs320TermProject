// ConvoList.js - 98 lines
import "./App.css";
import React from "react";
import Convo from "./Convo";
import ConvoLogin from "./ConvoLogin";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import database from '../../../../firebase/firebase';
import { selectUser } from '../../../../features/userSlice';

/* fullConvos holds list of convos from server that are closed. */
function ConvoList({socket, username, convos, fullConvos}){
    const [currentScreen, setCurrentScreen] = useState("chooseConvo"); // current screen shown
    const [convo, setConvo] = useState(""); // convo the user is currently in
    const [convoList, setConvoList] = useState(convos); // list of convos that exist
    const [valid, setValid] = useState(true); // when to show error message for invalid convo name
    const [full, setFull] = useState(false); // if convo user wants to join is full or not
    const user = useSelector(selectUser) // user that's signed in (Google)
    let nowFull = []; // list of convos that people can't join anymore
    const [fullList, setFullList] = useState([]); // list of convos that people can't join anymore (Firebase)
    const [allMessages, setAllMessages] = useState([]); // all messages retrieved (Firebase)

    /* when joining an existing convo, the user's convo and username are stored
       in the server and then the current screen is switched to convo screen */
    const joinConvo = () => { 
        const user = { // store in an object
            convo: convo,
            username: username,
        };
        socket.emit("joinConvo", user); // tell server to let the user join the convo
        setCurrentScreen("convo"); // show the convo screen
    }

    /* for joining a new convo, it must be checked that
       the convo name is valid before the user can join. */
    const joinNewConvo = () => {
        // database.collection("fullConvos") // get list of full convos
        //     .onSnapshot(snapshot => setFullList(snapshot));
        // !! BUG: users who have never joined that chat can still log into closed convos !!
        if (!fullConvos.includes(convo)){ // if convo is not full
            if (convoValid(convo)){ // and convo name is valid
                const user = {
                    convo: convo,
                    username: username,
                };
                database.collection("convos") // get existing messages from Firebase
                .doc(convo)
                .collection("messages")
                .onSnapshot((snapshot) => 
                    snapshot.docs.map(
                        (doc) => {
                            setAllMessages((list) => [ 
                                ...list, doc.data() // add it to the list of messages sent
                            ]);
                        }));
                socket.emit("joinConvo", user); // tell server to let the user join the convo
                setCurrentScreen("convo"); // show the convo screen
            } else {
                setValid(false); // convo name is invalid
            }
        } else {
            setFull(true); // convo is full
        }
    }

    // !! Bug: requires double clicking to join convo.
    // first click says that convo name is invalid !!
    /* attempt to join a convo when an existing convo's button is clicked */
    const attemptJoin = (convo) => {
        setConvo(convo);
        joinConvo();
    }

    /* list a button for each convo available to join */
    const listConvos = (convos) => {
        return (
            <button key={convos}
                onClick={() => {
                    setConvo(convos);
                    attemptJoin(convos);
                }}
                >{convos}
            </button>
        );
    }

    /* get an updated list of convos whenever a new convo is added,
       as well as an updated list of convos that are already full. */
    // !! Bug: updated convos appear only once when another user joins a convo !!
    useEffect(() => { 
        socket.on("getConvos", (convos) => {
            setConvoList(convos);
        });
        socket.on("fullList", (convos) => {
            setFull(convos);
        });
    }, [socket]);

    return (
        <div className="App">
            {currentScreen === "chooseConvo" ? ( // show convo selection screen
                <div className="convosContainer">
                    <button className="back-arrow"
                        onClick={() => {
                            setCurrentScreen("login")}}
                        >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="backArrow"
                            id="Bold" 
                            viewBox="0 0 24 24" 
                            width="512" 
                            height="512">
                                <path d="M4.943,5.606,1.024,9.525a3.585,3.585,0,0,0,0,4.95l3.919,3.919a1.5,1.5,0,1,0,2.121-2.121L4.285,13.492l18.25-.023a1.5,1.5,0,0,0,1.5-1.5v0a1.5,1.5,0,0,0-1.5-1.5L4.3,10.492,7.064,7.727A1.5,1.5,0,0,0,4.943,5.606Z"/>
                        </svg>             
                    </button>
                    <h3>Choose a Convo</h3>
                    {convoList.map(listConvos)}
                    <input
                        type="text"
                        placeholder="New Convo..."
                        onChange={(event) => {
                            setConvo(event.target.value); // change convo name as input changes
                        }}
                        onKeyPress={(event) => { // press enter to join
                            event.key === "Enter" && joinNewConvo()
                        }}
                    />
                    <button onClick={joinNewConvo} // or click Create button to join
                        >Create
                    </button> 
                    <div className="error">
                        {!valid && ( // display error message if convo name invalid
                            <p>Convo must be between 1 and 15 characters.</p>
                        )}
                    </div>
                    <div className="error">
                        {full && ( // display error message if convo is closed
                            <p>Convo is closed!</p>
                        )}
                    </div>                    
                </div>
            ) : currentScreen === "convo" ? ( // else, show convo screen
                <Convo
                    socket={socket}
                    username={username}
                    convo={convo}
                    convos={convoList}
                    messages={allMessages}
                    fullList={fullList}
                />
            ) : (
                <ConvoLogin></ConvoLogin>
            )}
        </div>
    );
}

/* check that the convo name is between 1 and 15 characters long */
function convoValid(convo){
    if ((convo.length > 0) && (convo.length < 16)) { 
        return true;
    }
    return false; // else, convo name is invalid
}

export default ConvoList;
