// Convo.js - 152 lines
import React from "react";
import ConvoList from "./ConvoList";
import ScrollToBottom from "react-scroll-to-bottom";
import { useState } from "react";
import { useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Convo({socket, username, convo}){
    const [currentScreen, setCurrentScreen] = useState("convo"); // current screen
    const [currentMessage, setCurrentMessage] = useState(""); // store typed message to be sent
    const [messagesSent, setMessagesSent] = useState([]); // store all messages sent
    const [id, setId] = useState(0); // store an id number for each of that user's message
    const [users, setUsers] = useState([username]); // store users in the convo
    const [showEmojis, setShowEmojis] = useState(false); // state to show emoji picker
    const [showDelete, setShowDelete] = useState(false); // state for delete message popup
    // !! Bug: replies only to the latest message !!
    let replyMessage = useState(""); // display message to reply to
    let replyTo = useState(""); // display user to reply to
    //const [replyMessage, setReplyMessage] = useState(""); // display message to reply to
    //const [replyTo, setReplyTo] = useState(""); // display user to reply to
    let selectMessage = 0; // current selected message id
    //const [selectMessage, setSelectedMessage] = useState(0); // current selected message id
    const reducer = (previous, current) => previous + ", " + current; // display all users

    const sendMessage = async () => {
        const timeNow = new Date(); // get current time
        let hour = timeNow.getHours();
        let minutes = timeNow.getMinutes();
        let time = formatTime(minutes, hour); // format time

        if (currentMessage !== "") { // if input box is not blank,
            setId(id+1);
            const messageInfo = { // get the message info
                id: id,
                convo: convo,
                sender: username,
                message: currentMessage,
                time: time,
                likes: 0,
            };
            await socket.emit("sendMessage", messageInfo);  // send message info
            setMessagesSent((list) => [ 
                ...list, messageInfo // add it to the list of messages sent
            ]);
            setCurrentMessage(""); // when done sending message, input box is set to nothing
            replyMessage = ""; // message and user being replied to are set to nothing
            replyTo = "";
            //setReplyMessage("");
            //setReplyTo("");
        }
    };

    const reply = (message, sender, id) => { // add replying text to the input box
        replyMessage = message;
        replyTo = sender;
        selectMessage = id;
        //setReplyMessage(message);
        //setReplyTo(sender);
        //setSelectMessage(id);        
        setCurrentMessage(` 💬 Replying to @${replyTo}: `);
    }

    // !! Bug: increments the wrong message likes. Likes count restarts when a user joins !!
    const addLike = () => { // add a like to a specific message
        messagesSent[selectMessage].likes = messagesSent[selectMessage].likes + 1;
        setCurrentMessage(`Likes: ${messagesSent[selectMessage].likes}`);
    }

    const addEmoji = (event) => { // add emojis to input box
        let sym = event.unified.split("-");  // NOT MY CODE
        let codesArray = [];  // NOT MY CODE
        sym.forEach((el) => codesArray.push("0x" + el));  // NOT MY CODE
        let emoji = String.fromCodePoint(...codesArray);  // NOT MY CODE
        setCurrentMessage(currentMessage + emoji);  
    };

    useEffect(() => { // listen for changes in the socket from other users
        socket.on("receiveMessage", (message) => { // whenever a new message is received
            setMessagesSent((list) => [
                ...list, message // add to the list of messages sent
            ]);
        });
        socket.on("joined", (users, messages) => { // when a new user joins,
            setUsers(users); // update list of users in the convo
            setMessagesSent(messages); // update messages sent in the convo
        });
    }, [socket]);

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
                    </div>   
                    <div className="convo-header2">
                        <p>Users: {users.reduce(reducer)}</p>
                    </div>  
                    <div className="convo-body">
                        <ScrollToBottom className="message-container">
                            {messagesSent.map((messages) => {
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
                                                        reply(messages.message, messages.sender, messages.id);
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
                            })}
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
                        <button className="button" onClick={() => setShowEmojis(!showEmojis)}>  
                            {/* -----------  NOT MY CODE -----------*/}
                            <svg  
                                xmlns="http://www.w3.org/2000/svg"  
                                className="emojiIcon"  
                                fill="none"  
                                viewBox="0 0 30 25"  
                                stroke="currentColor"  
                            >  
                                <path  
                                    stroke-linecap="round"  
                                    stroke-linejoin="round"  
                                    stroke-width="1.5"  
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"  
                                />  
                            </svg>
                            {/* ----------------------------------- */}  
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
                </div>
            ):(
                <ConvoList
                    socket={socket}
                    username={username}
                />
            )}
        </div>
    );
}

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
    return hour + ":" + minutes
}

export default Convo
