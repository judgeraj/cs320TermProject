// Convo.js
import React from "react";
import ConvoList from "./ConvoList";
import ScrollToBottom from "react-scroll-to-bottom";
import { useState } from "react";
import { useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Convo({socket, username, convo}){
    const [currentScreen, setCurrentScreen] = useState("convo");
    const [currentMessage, setCurrentMessage] = useState(""); // store message to be sent
    const [messagesSent, setMessagesSent] = useState([]); // store messages sent
    const [users, setUsers] = useState([username]); // store users in the convo
    const [showEmojis, setShowEmojis] = useState(false); // state to show emoji picker
    const [showDelete, setShowDelete] = useState(false); // state for delete message popup
    const reducer = (previousValue, currentValue) => previousValue + ", " + currentValue; // display all users
    // let replyMessage = useState("");
    // let replyTo = useState("");
    const [replyMessage, setReplyMessage] = useState("");
    const [replyTo, setReplyTo] = useState(""); 

    const sendMessage = async () => {
        const timeNow = new Date(); // get message time
        let hour = timeNow.getHours();
        let minutes = timeNow.getMinutes();

        if (minutes < 10) { // format time
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

        if (currentMessage !== "") {
            const messageInfo = {
                convo: convo,
                sender: username,
                message: currentMessage,
                time: hour + ":" + minutes,
            };
            await socket.emit("sendMessage", messageInfo);  // send message info
            setMessagesSent((list) => [ 
                ...list, messageInfo // add it to the list of messages
            ]);
            setCurrentMessage(""); // when done sending message, input box is set to nothing
            setReplyMessage("");
            setReplyTo("");
        }
    };

    const reply = () => { // adds replying text to the type message box
        setCurrentMessage(` 💬 Replying to @${replyTo}: `);
    }

    const addEmoji = (event) => { 
        let sym = event.unified.split("-");  
        let codesArray = [];  
        sym.forEach((el) => codesArray.push("0x" + el));  
        let emoji = String.fromCodePoint(...codesArray);  
        setCurrentMessage(currentMessage + emoji);  
    };  

    useEffect(() => { // listen for changes in the socket (from other users)
        socket.on("receiveMessage", (message) => { // whenever a new message is received
            setMessagesSent((list) => [
                ...list, message // add to the list of messages
            ]);
        });
        socket.on("joined", (users, messages) => { // once a user joins,
            setUsers(users); // update list of users in the convo
            setMessagesSent(messages); // update messages sent in the convo
        });
    }, [socket, convo]);

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
                            <p># of users: {users.length}</p>
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
                                            <div className="message-content">
                                                <p onClick={() => {
                                                    return (
                                                    setReplyMessage(messages.message),
                                                    setReplyTo(messages.sender),
                                                    reply );
                                                    }}
                                                    >{messages.message}
                                                </p>
                                            </div>
                                            <div className="message-meta">
                                                <p>{messages.time}</p>
                                                <p id="sender">{messages.sender}</p>
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
                            <svg  
                                xmlns="http://www.w3.org/2000/svg"  
                                className="icon"  
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

export default Convo
