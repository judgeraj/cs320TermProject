import React, { useState } from "react";
import database from "../../firebase/firebase";

import ActivityItem from "./ActivityItem";

import "./styles/Activity.css";
import "./styles/UserProfile.css";

function Activity(props) {
  // const [discussions, setDiscussions] = useState([]);
  const [moviesRated, setMoviesRated] = useState([]);

  const getMovieRatings = () => {
    console.log(`props.user.name => ${props.user.displayName}`);
    database.collection(props.user.displayName).onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data().title);
        const updatedMoviesRated = [...moviesRated, doc.data()];
        setMoviesRated(updatedMoviesRated);
      });
    });
  };
  getMovieRatings();

  return (
    <div className="info">
      <div className="info-about">
        <h3>Activity</h3>
      </div>
    </div>
  );
}

export default Activity;
