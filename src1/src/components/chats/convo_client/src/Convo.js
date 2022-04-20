// Convo.js - 219 lines
import React from "react";
import ConvoList from "./ConvoList";
import ScrollToBottom from "react-scroll-to-bottom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useSelector } from 'react-redux';
import database from '../../../../firebase/firebase';
import { selectUser } from '../../../../features/userSlice';
import Image from "./Image";

function Convo({socket, username, convo}){
    const [currentScreen, setCurrentScreen] = useState("convo"); // current screen
    const [currentMessage, setCurrentMessage] = useState(""); // store typed message to be sent
    const [messagesSent, setMessagesSent] = useState([]); // store all messages sent (server)
    const [allMessages, setAllMessages] = useState([]); //  store all messages sent (Firebase)
    const [id, setId] = useState(0); // store an id number for each of that user's message
    const [users, setUsers] = useState([username]); // store users in the convo
    const [showEmojis, setShowEmojis] = useState(false); // state to show emoji picker
    const [showDelete, setShowDelete] = useState(false); // state for delete message popup
    const [showLeave, setShowLeave] = useState(false); // state for leaving the convo
    let replyMessage = useState(""); // display message to reply to
    let replyTo = useState(""); // display user to reply to
    let selectMessage = 0; // current selected message id
    const reducer = (previous, current) => {
        return previous + ", " + current; // display all users with commas inbetween
    } 
    const uploadFile = useRef(null); // assign reference to file input
    const user = useSelector(selectUser) // user that's signed in
    const [inputFile, setInputFile] = useState();
    const [showUpload, setShowUpload] = useState(false); // show button to upload a pic

    /* sends a message within a specific convo. adds the
       message and all its info to an array and sends the
       message to all other users on the server.  */
    const sendMessage = async () => {
        const timeNow = new Date(); // get current time
        let hour = timeNow.getHours();
        let minutes = timeNow.getMinutes();
        let time = formatTime(minutes, hour);
        if (inputFile){ // if there is a file selected to send
            setId(id+1);
            const messageFile = {
                id: id,
                type: "file",
                body: inputFile,
                mimeType: inputFile.type, // extension of the file
                fileName: inputFile.name,
                convo: convo,
                sender: username,
                time: time,
                likes: 0
            }
            await socket.emit("sendMessage", messageFile);  // send message info
            setInputFile(); // make input file variable empty again
            setMessagesSent((list) => [ 
                ...list, messageFile // add it to the list of messages sent
            ]); 
            setCurrentMessage(""); // when done sending message, input box is set to nothing 
            setShowUpload(false);           
        }
        if (currentMessage !== "") { // if input box is not blank,
            setId(id+1);
            const messageInfo = { // get the message info
                id: id,
                type: "text",
                convo: convo,
                sender: username,
                message: currentMessage,
                time: time,
                likes: 0
            };
            // // store into Firebase as well
            // database.collection("convos")
            //     .doc(convo)
            //     .collection("messages")
            //     .add({
            //         sender: username,
            //         time: time,
            //         message: currentMessage,
            //         likes: 0 });
            // database.collection("messages")
            //     .doc(convo)
            //     .collection("messages")
            //     .onSnapshot((snapshot) => 
            //         setAllMessages(snapshot.docs.map((doc) => console.log(doc.data()))));     
            await socket.emit("sendMessage", messageInfo);  // send message info
            setMessagesSent((list) => [ 
                ...list, messageInfo // add it to the list of messages sent
            ]);        
            setCurrentMessage(""); // when done sending message, input box is set to nothing
            replyMessage = ""; // message and user being replied to are set to nothing
            replyTo = "";
            setShowUpload(false);
        }
    };

    /* adds text to the input box that indicates the user is
       intending to reply to another user */
    const reply = (message, sender, id) => {
        replyMessage = message;
        replyTo = sender;
        selectMessage = id;
        setCurrentMessage(` 💬 REPLYING TO @${replyTo}: `);
    }

    // !! Bug: increments the wrong message likes. Likes count restarts when a user joins !!
    /* increases the number of likes of a specific message */
    const addLike = () => {
        messagesSent[selectMessage].likes = messagesSent[selectMessage].likes + 1;
        setCurrentMessage(`Likes: ${messagesSent[selectMessage].likes}`);
        //socket.emit("updateLikes", messagesSent[selectMessage]);
    }

    /* adds emoji to the current message being typed in the input box */
    const addEmoji = (event) => {
        let sym = event.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setCurrentMessage(currentMessage + emoji);  
    };

    /* opens the file explorer when the button is clicked */
    const getFile = (event) => {
        setInputFile(event.target.files[0]); // holds actual file
    };

    /* uses filter to update the users list to include
       all users but the one that is leaving. then sets
       the current screen is the list of convos screen. */
    const leaveConvo = (username) => {
        setUsers(users.filter(x => x !== username));
        setCurrentScreen("convoList");
    }

    /* listen for changes in the socket from other users.
       update the states of messages and users in the convo
       when a change happens. */
    useEffect(() => {
        socket.on("receiveMessage", (message) => { // whenever a new message is received
            setMessagesSent((list) => [
                ...list, message // add to the list of messages sent
            ]);
        });
        socket.on("joined", (users, messages) => { // when a new user joins,
            setUsers(users); // update list of users in the convo
            setMessagesSent(messages); // update messages sent in the convo
        });
        socket.on("updateUsers", (users) => { // update list of users when someone leaves
            setUsers(users);
        });
        socket.on("disconnect", (username) => { // if a username leaves the server, leave each convo
            //leaveConvo(username);
        });
    }, [socket]);

    // /* get updated list of messages from Firebase */
    // useEffect(() => {
    //     if (convo){
    //         database.collection("messages")
    //         .doc(convo)
    //         .collection("messages")
    //         .onSnapshot((snapshot) => 
    //             setAllMessages(snapshot.docs.map((doc) => doc.data())));  
    //     }  
    // }, [convo]);

    /* render the messages being sent in the convo */
    const renderMessages = (messages) => {
        if (messages.type === "file"){
            const blob = new Blob([messages.body], {type: messages.type});
            return (
                <div className="message"id={
                    username === messages.sender ? "loggedIn" : "other"
                    }>
                    <div>
                        <div className="message-reply">
                            <p> </p>
                        </div>
                        <div className="message-meta">
                            {/* <p id="message-id">id: {messages.id}</p> */}
                        </div>
                        <div className="grid-container">
                            <div className="message-content">
                                <Image fileName={messages.fileName} blob={blob} />
                            </div>
                            <div className="heartIcon">
                                <p onClick={() =>
                                    addLike()
                                }
                                    >&#9825;
                                </p>
                            </div>
                        </div>
                        <div className="message-meta">
                            <p>{messages.time}</p>
                            <p id="sender">{messages.sender}</p>
                            <p id="message-likes">&#9825; {messages.likes}</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (messages.type === "text"){ // if a message is being sent
            return (
                <div className="message"id={
                    username === messages.sender ? "loggedIn" : "other"
                    }>
                    <div>
                        <div className="message-reply">
                            <p> </p>
                        </div>
                        <div className="message-meta">
                            {/* <p id="message-id">id: {messages.id}</p> */}
                        </div>
                        <div className="grid-container">
                            <div className="message-content">
                                <p onClick={() => {
                                    // return (
                                    // setReplyMessage(messages.message),
                                    // setReplyTo(messages.sender),
                                    // reply );
                                    reply(messages.message, messages.sender, 0);
                                    }}
                                    >{messages.message}
                                </p>
                            </div>
                            <div className="heartIcon">
                                <p onClick={() =>
                                    addLike()
                                }
                                    >&#9825;
                                </p>
                            </div>
                        </div>
                        <div className="message-meta">
                            <p>{messages.time}</p>
                            <p id="sender">{messages.sender}</p>
                            <p id="message-likes">&#9825; {messages.likes}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    const openFile = () => {
        uploadFile.current.click();
        setCurrentMessage(uploadFile.name);
    }

    /* return the current screen needed. either
       the popup container, or login screen */
    return (
        <div className="App">
            {currentScreen === "convo" ? (
                <div className="convo-popup">
                    <div className="convo-header">
                        <div className="back-convos">
                            <button
                                onClick={() =>
                                setCurrentScreen("convoList")}
                                >&#8592;
                            </button>
                        </div>                
                        <p>{convo}</p>
                        <div className="convo-size">
                            <p data-test='usersNum'># of users: {users.length}</p>
                        </div>   
                        <div className="convo-leave">
                            <button className="button"
                                onClick={() =>
                                leaveConvo(username)}
                                >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="512"
                                    height="512"
                                    className="leaveIcon"
                                >
                                    <g id="_01_align_center" data-name="01 align center">
                                        <polygon points="15.293 7.293 12 10.586 8.707 7.293 7.293 8.707 10.586 12 7.293 15.293 8.707 16.707 12 13.414 15.293 16.707 16.707 15.293 13.414 12 16.707 8.707 15.293 7.293"/>
                                        <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/>
                                    </g>
                                </svg>
                            </button> 
                        </div>                           
                    </div>   
                    <div className="convo-header2">
                        <p>Users: {users.length !== 0 ? users.reduce(reducer) : ""}</p>
                    </div>                      
                    <div className="convo-body">
                        <ScrollToBottom className="message-container">
                            {/* {allMessages.map((messages) => { } */}
                            {messagesSent.map(renderMessages)}                         
                        </ScrollToBottom>
                    </div>
                    <div className="convo-footer">
                        <input
                            type="text"
                            value={currentMessage}
                            placeholder="Type Message..."
                            onChange={(event) => {
                                setCurrentMessage(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                event.key === "Enter" && sendMessage()
                            }}
                        /> 
                        <button className="button" onClick={() => setShowUpload(!showUpload)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg" 
                                className="fileIcon"
                                id="Outline"
                                viewBox="0 0 24 24"
                                width="512"
                                height="512"  
                            >
                                <path fill="gray" d="M19,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V5A5.006,5.006,0,0,0,19,0ZM5,2H19a3,3,0,0,1,3,3V19a2.951,2.951,0,0,1-.3,1.285l-9.163-9.163a5,5,0,0,0-7.072,0L2,14.586V5A3,3,0,0,1,5,2ZM5,22a3,3,0,0,1-3-3V17.414l4.878-4.878a3,3,0,0,1,4.244,0L20.285,21.7A2.951,2.951,0,0,1,19,22Z"/>
                                <path fill="gray" d="M16,10.5A3.5,3.5,0,1,0,12.5,7,3.5,3.5,0,0,0,16,10.5Zm0-5A1.5,1.5,0,1,1,14.5,7,1.5,1.5,0,0,1,16,5.5Z"/>
                            </svg> 
                        </button>                    
                        <button className="button" onClick={() => setShowEmojis(!showEmojis)}>  
                            <svg  
                                xmlns="http://www.w3.org/2000/svg"  
                                className="emojiIcon"  
                                fill="none"  
                                viewBox="0 0 30 25"  
                                stroke="currentColor"  
                            >  
                                <path  
                                    strokeLinecap="round"  
                                    strokeLinejoin="round"  
                                    strokeWidth="1.5"  
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"  
                                />  
                            </svg>
                        </button>                           
                        <button onClick={sendMessage}>{"Send"}</button>
                    </div>
                    {showEmojis && (  
                        <div>  
                            <Picker onSelect={addEmoji} />  
                        </div>  
                    )}                
                    {showDelete && (
                        <div>
                            <p>Are you sure you want to delete this message?</p>
                        </div>
                    )}
                    {showLeave && (
                        <div>
                            <p>Are you sure you want to leave this convo?</p>
                        </div>
                    )}  
                    {showUpload && (
                        <input 
                            className="button"
                            onChange={getFile}
                            type="file"
                            id="file"
                            ref={inputFile}
                            //style={{display: "none"}}
                        />  
                    )}                  
                </div>
            ):(
                <ConvoList
                    socket={socket}
                    username={username}
                />
            )}
            <p></p>
        </div>
    );
}

/* formats minutes and hours passed in.
   adds a 0 in front if the minutes are less
   than two digits. indicates if the time is AM
   or PM. returns the formatted time. */
function formatTime(minutes, hour){
    if (minutes < 10) {
        minutes = "0" + minutes;
    }        
    if (hour > 12) {
        hour = hour - 12;
        minutes = minutes + " PM";
    } else {
        minutes = minutes + " AM";
    }
    if (hour === 0)  {
        hour = 12;
    }       
    return hour + ":" + minutes;
}

/* store the message to Firebase (using realtime db) */
// function storeMessage(username, message, time){
//     db.ref("messages/" + time).set({
//         username,
//         message,
//     });
// }

export default Convo
