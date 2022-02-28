import React, { useState, useEffect } from 'react';
import MovieCard from "react-tinder-card";
import database from './firebase';
import "./MovieCards.css";

function MovieCards() {
    // Dead code: hardcoded the titles and image urls
    const [posters, setPosters] = useState([
        // {
        //     title: "Demon Slayer", 
        //     url: "https://www.whats-on-netflix.com/wp-content/uploads/2021/01/demon-slayer-kimetsu-no-yaiba-season-1-coming-to-netflix-the-movie-poster.jpg",
        // },
        // {
        //     title: "Glee", 
        //     url: "http://assets.nflxext.com/us/boxshots/hd1080/70143843.jpg",
        // },
    ]);

    useEffect(() => {   // imports the images and titles from firebase
        const unsubscribe = database
          .collection("posters")
          .onSnapshot((snapshot) =>
            setPosters(snapshot.docs.map((doc) => doc.data()))
          );// gets a snapshot of the database and for every item get the data 
        return () => {
          unsubscribe();    // clean up detaches listener
        };
      }, []);// no dependencies in [] so runs once when component loads and never again
    return (
        <div>
            <h1 className="pageTitle">Catalog</h1>
            <div className="movieCards__cardContainer">
                {posters.map((movie) => (
                    <MovieCard
                        className="swipe"
                        key={movie.title}    //always give keys to allow read to efficiently re-render a list to make app fast
                        preventSwipe={['up', 'down']}>
                        <div
                            iv style={{ backgroundImage: `url(${movie.url})` }}
                            className="card">
                            <h3>{movie.title}</h3>
                        </div>
                    </MovieCard>
                ))}
            </div>     
        </div>
    );
}
export default MovieCards   