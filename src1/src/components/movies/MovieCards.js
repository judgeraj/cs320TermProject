import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from "react-tinder-card";
import database from './../../firebase/firebase';
import "./MovieCards.css";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./SwipeButtons.css"
import IconButton from "@material-ui/core/IconButton";
import styled from 'styled-components'
import { Button } from 'react-native'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';






const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7ecd0b11bc4cd387a22b43cb37086584";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=7ecd0b11bc4cd387a22b43cb37086584&query="
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

// Deadish code, working on adding functionality to the buttons so they triggere swipes
// function Movies() {
//     const [posters, setPosters] = useState([])
//     useEffect(() => {   // imports the images and titles from firebase
//         const unsubscribe = database
//           .collection("posters")
//           .onSnapshot((snapshot) =>
//             setPosters(snapshot.docs.map((doc) => doc.data()))
//           );// gets a snapshot of the database and for every item get the data 
//         return () => {
//           unsubscribe();    // clean up detaches listener
//         };
//     }, []);// no dependencies in [] so runs once when component loads and never again
//     return [posters, setPosters];
// }
// const db = Movies
// const alreadyRemoved = []
// let charactersState = db

const MovieCards = () => {
    // This chunk first used hardcoded values then pulled from firebase
    // Not currently in use, rn I'm pulling from an API, but 
    // next step might be to import data from API to firebase so keeping this code for now
    // const [posters, setPosters] = useState([
        // { // original hardcoded
        //     title: "Demon Slayer", 
        //     url: "https://www.whats-on-netflix.com/wp-content/uploads/2021/01/demon-slayer-kimetsu-no-yaiba-season-1-coming-to-netflix-the-movie-poster.jpg",
        // },
        // {
        //     title: "Glee", 
        //     url: "http://assets.nflxext.com/us/boxshots/hd1080/70143843.jpg",
        // },
    // ]);
    // useEffect(() => {   // imports the images and titles from firebase
    //     const unsubscribe = database
    //       .collection("posters")
    //       .onSnapshot((snapshot) => /* gives back all docs in snapshot*/
    //         setPosters(snapshot.docs.map((doc) => doc.data())) /*get back data */
    //       );// gets a snapshot of the database and for every item get the data 
    //     return () => {
    //       unsubscribe();    // clean up detaches listener
    //     };
    // }, []);// no dependencies in [] so runs once when component loads and never again
    const user = useSelector(selectUser)
    const [posters, setPosters] = useState([]);
    useEffect(() => {
      fetch(APIURL).then(res => res.json())
      .then(data => {
        console.log(data);
        setPosters(data.results);
      });
    }, [])

    const characters = posters
    const [lastDirection, setLastDirection] = useState()

   
    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        console.log('you swiped ' + direction)
        setLastDirection(direction)
    
    }
    
    const outOfFrame = (title, direction, id, imgURL, overview) => {
        console.log(title + ' left the screen!')
        addLikes(title, direction, id, imgURL, overview)
        // local array storing titles
    }
  
    
    const addLikes = (title, direction, id, imgURL, overview ) => {
            // database.collection(String(user.displayName)).add({
            //     title: title,
            //     bool: true
            // });

            // check if doc already exists
            const usersRef = database.collection(user.displayName).doc(String(id))
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    // do stuff with the data
                });
                } else {
                    if (String(direction) == 'right') {
                        usersRef.set({
                            title: title,
                            bool: true,
                            overview: overview
                        });
                    } else { 
                        if (String(direction) == 'left') {
                            usersRef.set({
                                title: title,
                                bool: false,
                                overview: overview

                            });
                        }
                    }
                    console.log(direction)
                    console.log('likes added')
                }
            });
    };
           
    return (  
        <div>
            {/* <h1 className="pageTitle">Catalog</h1> */}
            <div className="movieCards__cardContainer">
                {posters.map((movie, index) => (
                    <MovieCard className="swipe" 
                            key={movie.title} 
                            preventSwipe={["up", "down"]}
                            onSwipe={(dir) => swiped(dir, movie.title)} 
                            onCardLeftScreen={(dir) => outOfFrame(movie.title, dir, movie.id, movie.backdrop_path, movie.overview)}>
                        <div 
                            // style={{ backgroundImage: `url(${movie.url})` }}
                            style={{ backgroundImage: `url(${"https://image.tmdb.org/t/p/w600_and_h900_bestv2" 
                                                            + movie.backdrop_path})` }}
                            className="card">
                                {/* <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.backdrop_path} /> */}
                            <div className = "movieInfo"> 
                                <h3>{movie.title}</h3>
                                {/* <span>{movie.vote_average}</span> */}
                            </div>
                            <div className="overview">
                                <h2>Info:</h2>
                                <p>{movie.overview}</p>
                                <h3>Genre:</h3>
                                <p>{movie.genre}</p>
                            </div>
                        </div>
                    </MovieCard>
                ))}
            </div> 
            <div className="swipeButtons">
                <IconButton 
                    className="swipeButtons__left">
                    <CloseIcon fontSize="large"/>
                </IconButton>
                <IconButton 
                    className="swipeButtons__right">
                    <FavoriteIcon fontSize="large"/>
                </IconButton>   
                {/* <Button onPress={() => swipe('left')} title='Swipe left!' />
                <Button onPress={() => swipe('right')} title='Swipe right!' /> */}
            </div>
        </div>
    )
};    
export default MovieCards   