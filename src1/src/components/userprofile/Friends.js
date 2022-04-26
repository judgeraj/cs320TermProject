import React, { useState, useEffect } from "react";

import database from "../../firebase/firebase";

import "./styles/Friends.css";

function Friends(props) {
  /*
    Not using map anymore
    const [friends, setFriends] = useState(new Map());
  */
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    database.collection("users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(`users doc.id = ${doc.id}`);
        console.log(`users doc.data().photoURL = ${doc.data().photo}`);

        if (doc.id !== props.displayName) {
          setFriends((friends) => [
            ...friends,
            { name: doc.id, photoURL: doc.data().photo },
          ]);
        }
        /* Refactored to use an array instead of a map
        if (!friends.has(doc.id)) {
          friends.set(doc.id, doc.data().photo);
        }
        */
      });
    });
  }, []);

  /* Using a callback is making weird side effects when combined
   * with react's rendering process
   */
  function mapFriend(photoURL, name) {
    return (
      <div className="friend">
        <img src={photoURL} alt="Friend's Profile"></img>
        <h5>{name}</h5>
      </div>
    );
  }

  return (
    <div className="friends-outer">
      <h3>Friends</h3>
      {friends.map((friend) => (
        // console.log(friend.name, friend.photoURL)
        <div className="friend">
          <img src={friend.photoURL} alt="Friend's Profile"></img>
          <h5>{friend.name}</h5>
        </div>
      ))}
      {/* {friends.forEach(mapFriend)} */}
    </div>
  );
}

export default Friends;
