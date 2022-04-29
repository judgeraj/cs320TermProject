import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import database from "./../firebase/firebase";
import './HomePage.css'
import { AddCircle, CameraAlt,Photo,
  Mic, EmojiEmotions, Menu} from '@material-ui/icons';
import { Avatar } from '@material-ui/core';

function displayPost(user){
  return(
    <div className="displayPost">
      <Avatar src={user.photo}/>
      {user.displayName}
    </div>
  )
}

function HomePage() {

  // stores user info into firebase when they open the homepage
  const user = useSelector(selectUser)
  useEffect(() => {
    addUser();
  }, []);

  const addUser = () => {
    const userName = database.collection("users").doc(user.displayName);
    userName.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        userName.onSnapshot((doc) => {
          // do stuff with the data
        });
      } else {
        userName.set({
          photo: user.photo,
        });
      }
    });
  };

  const [postMessage, setPostMessage] = useState("")
  const [postInfo, setPostInfo] = useState([])
  const createPost = (e, postMessage) =>{
    e.preventDefault();
    database.collection('homepagePosts').add({
      post: postMessage,
      user: user
    })
  }
  useEffect(() =>{
    database.collection('homepagePosts').onSnapshot( snapshot =>{
      setPostInfo(snapshot.docs.map( doc =>
        doc.data())
      )
    })
  })
  return (
    <div className="homepageBar">
      <h1>KARO's HOMEPAGE</h1>
      <div className="homepageBody">

         <div className="leftSidebar">
           <h3>Friend's List</h3>
         </div>

         <div className="midBody">
              <h3>News Feed</h3>            
         </div>

         <div className="rightSidebar">
           <h3>RIGHT SIDE</h3>
            <div className="postBar">
                Create New Post
                <div className="postSection">
                  <form method="POST" action="makePost" onsubmit="return false;">
                        <input placeholder={"What's something new?"}
                                disabled={!user}
                                value={postMessage}
                                onChange={(e) => setPostMessage(e.target.value)}/>
                        <button className="sendPost"
                                disabled={!user}
                                type="submit"
                                onClick={(e) => createPost(e, postMessage)}/>
                  </form>
                  <div className="postButtons">
                    <AddCircle fontSize="small"/>
                    <CameraAlt fontSize="small"/>
                    <Photo fontSize="small"/>
                  </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}

export default HomePage;
