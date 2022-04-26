// ConvoList.js - 104 lines + 14 doc comments
import "./App.css";
import React from "react";
import Convo from "./Convo";
import ConvoLogin from "./ConvoLogin";
import {useState} from "react";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import database from "../../../../firebase/firebase";
import {selectUser} from "../../../../features/userSlice";

/* uses info provided by the login page to return the convo list screen.
   this screen intends to show all convos that have been created and inform
   the user if they are attempting to join a convo that is closed. */
function ConvoList({socket, username, convos, fullConvos}){
    const [currentScreen, setCurrentScreen] = useState("chooseConvo"); // current screen shown
    const [convo, setConvo] = useState(""); // convo the user is currently in
    const [convoList, setConvoList] = useState(convos); // list of convos that exist
    const [valid, setValid] = useState(true); // when to show error message for invalid convo name
    const [full, setFull] = useState(false); // if convo user wants to join is full or not
    const user = useSelector(selectUser) // user that's signed in (Google)
    let nowFull = []; // list of convos people can't join anymore
    const [fullList, setFullList] = useState([]); // list of convos people can't join anymore (Firebase)
    const [allMessages, setAllMessages] = useState([]); // all messages retrieved (Firebase)

    /* when joining an existing convo, the user's convo and username are stored
       to the server and then the current screen status is switched to convo */
    const joinConvo = () => { 
        const user = { // store in an object
            convo: convo,
            username: username,
        };
        socket.emit("joinConvo", user); // tell server to let the user join the convo
        setCurrentScreen("convo"); // show the convo screen
    }

    /* when joining a (new) convo, it must be checked that the convo name
       is valid before the user can create and join it. if so, the user
       can join the convo via the server. there is also an attempt to
       retrieve the messages from Firebase. */
    const joinNewConvo = () => {
        // database.collection("fullConvos") // attempt to get list of full convos
        //     .onSnapshot(snapshot => setFullList(snapshot));
        // !! BUG: users who have never joined that convo can still log in if closed !!
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
                socket.emit("joinConvo", user); // let the user join the convo
                setCurrentScreen("convo"); // show the convo screen
            } else {
                setValid(false); // convo name is invalid
            }
        } else {
            setFull(true); // convo is full
        }
    }

    // !! Bug: requires double click to join. first click says convo name is invalid !!
    /* attempt to join a convo when an existing convo's button is clicked */
    const attemptJoin = (convo) => {
        setConvo(convo);
        joinConvo();
    }

    /* returns a button for each convo that has been made */
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
    // !! Bug: updated convos appear only once a user joins a convo !!
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
                            setConvo(event.target.value) // change convo name as input changes
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

/* check if the convo name is between 1 and 15 characters long */
function convoValid(convo){
    if ((convo.length >= 1) && (convo.length <= 15)) { 
        return true;
    }
    return false; // else, convo name is invalid
}

export default ConvoList;
