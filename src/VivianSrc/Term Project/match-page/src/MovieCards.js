import React, { useState, useEffect } from 'react';
import MovieCard from "react-tinder-card";
import database from './firebase';
import "./MovieCards.css";

function MovieCards() {
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
    // runs on a condition
    // useEffect(() => {
    //     database.collection('titles').onSnapshot(snapshot =>(
    //         setPosters(snapshot.docs.map(doc.data()))
    //     )) // gets a snapshot of the database and for every item get the data 
    // }, []); // no dependencies in [] so runs once when component loads and never again
    useEffect(() => {
        const unsubscribe = database
          .collection("posters")
          .onSnapshot((snapshot) =>
            setPosters(snapshot.docs.map((doc) => doc.data()))
          );
    
        return () => {
          unsubscribe();
        };
      }, []);
    return (
        <div>
            <h1>Catalog</h1>
            <div className="movieCards__cardContainer">
                {posters.map((movie) => (
                    <MovieCard
                        className="swipe"
                        key={movie.title}    //always give keys to allow readt to efficiently re-render a list to make app fast
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