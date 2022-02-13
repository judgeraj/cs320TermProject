import React, { useState } from 'react';
import MovieCard from "react-tinder-card";
import "./MovieCards.css";

function MovieCards() {

    const [posters, setPosters] = useState([
        {
            title: "Demon Slayer", 
            url: "https://www.whats-on-netflix.com/wp-content/uploads/2021/01/demon-slayer-kimetsu-no-yaiba-season-1-coming-to-netflix-the-movie-poster.jpg",
        },
        {
            title: "Glee", 
            url: "http://assets.nflxext.com/us/boxshots/hd1080/70143843.jpg",
        },
    ]);
    // const posters = [];  equivalent
    // BAD
    // people.push('title', 'boo');

    // GOOD
    // setPosters([...posters, 'sonny', 'cher']); ... keep what's there and add sonny and cher

    
    return (
        <div>
            <h1>Catalog</h1>

            <div className="movieCards__cardContainer">
                {posters.map((movie) => (
                    <MovieCard
                        className="swipe"
                        key={movie.title}    //always give keys to allow readt to efficiently re-render a list to make app fast
                        preventSwipe={['up', 'down']}
                    >
                        <div
                            iv style={{ backgroundImage: `url(${movie.url})` }}
                            className="card"
                        >
                            <h3>{movie.title}</h3>
                        </div>
                    </MovieCard>
                ))}
            </div>     
        </div>
    );
}

export default MovieCards