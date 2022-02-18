// THIS FILE CONTAINS MY CODE
import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useState } from "react";
import { useEffect } from "react";

function Convo({socket, username, convo, convoSize}){
    const [currentMessage, setCurrentMessage] = useState("");
    const [messagesSent, setMessagesSent] = useState([]);

    const sendMessage = async () => {
        const timeNow = new Date();
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
            await socket.emit("sendMessage", messageInfo);  // get your message info
            setMessagesSent((list) => [ 
                ...list, messageInfo // add it to the list of messages
            ]);
            setCurrentMessage(""); // when done sending message, input box is set to nothing
        }
    };

    useEffect(() => { // listen for changes in the socket (message from other users)
        socket.on("receiveMessage", (data) => { // whenever a new message is received
            setMessagesSent((list) => [
                ...list, data // add it to the list of messages
            ]);
        });
    }, [socket]);

    return (
        <div className="convo-popup">
            <div className="convo-header">
                <p>Convo: {convo}</p>
                <div className="convo-size">
                    <p># of users: {convoSize}</p>
                </div>       
            </div>     
            <div className="convo-body">
                <ScrollToBottom className="message-container">
                    {messagesSent.map((messages) => {
                        return (
                            <div className="message"id={
                                username === messages.sender ? "loggedIn" : "other"
                                }>
                                <div>
                                    <div className="message-content">
                                        <p>{messages.message}</p>
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
                <button onClick={sendMessage}>{"Send"}</button>
            </div>
        </div>
    );
}

export default Convo
