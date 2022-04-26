import React, { useState, useEffect } from "react";
import database from "../../firebase/firebase";

import Movies from "./Movies";
import HomePagePostItem from "./HomePagePostItem";

import "./styles/Activity.css";
import "./styles/UserProfile.css";

function Activity(props) {
  const [discussions, setDiscussions] = useState([]);
  const [moviesRated, setMoviesRated] = useState([]);
  const [messages, setMessages] = useState([]);
  const [homePagePosts, setHomePagePosts] = useState([]);

  useEffect(() => {
    database.collection(props.user.displayName).onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data().title);
        // const updatedMoviesRated = [...moviesRated, doc.data()];
        // setMoviesRated(updatedMoviesRated);
        setMoviesRated((moviesRated) => [...moviesRated, doc.data()]);
      });
    });
    database.collection("homepagePosts").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(Object.keys(doc));
        console.log(doc.data().user.displayName);
        if (doc.data().user.displayName === props.user.displayName) {
          setHomePagePosts((homePagePosts) => [
            ...homePagePosts,
            doc.data().post,
          ]);
        }
      });
    });
  }, []);

  console.log(moviesRated);
  console.log(homePagePosts);
  return (
    <div className="info-activity">
      <h3>Activity</h3>
      <hr />
      <Movies moviesRated={moviesRated} />
      <hr />
      <h4>Messages</h4>
      <hr />
      <h4>Posts</h4>
      {homePagePosts.map((post, index) => (
        <HomePagePostItem key={index} post={post} />
      ))}
    </div>
  );
}

export default Activity;
