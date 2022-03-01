import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from "react-tinder-card";
import database from './firebase';
import "./MovieCards.css";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./SwipeButtons.css"
import IconButton from "@material-ui/core/IconButton";
import styled from 'styled-components'
import { Button } from 'react-native'

// const db = [
//     {
//       title: 'glee',
//       url: "http://assets.nflxext.com/us/boxshots/hd1080/70143843.jpg"
//     },
//     {
//       title: 'Erlich Bachman',
//       url: "http://assets.nflxext.com/us/boxshots/hd1080/70143843.jpg"
//     },
//     {
//       title: 'Monica Hall',
//       url: "http://assets.nflxext.com/us/boxshots/hd1080/70143843.jpg"
//     },
//     {
//       title: 'Jared Dunn',
//       url: "http://assets.nflxext.com/us/boxshots/hd1080/70143843.jpg"
//     },
//     {
//       title: 'Dinesh Chugtai',
//       url: "http://assets.nflxext.com/us/boxshots/hd1080/70143843.jpg"
//     }
// ]

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
          .onSnapshot((snapshot) => /* gives back all docs in snapshot*/
            setPosters(snapshot.docs.map((doc) => doc.data())) /*get back data */
          );// gets a snapshot of the database and for every item get the data 
        return () => {
          unsubscribe();    // clean up detaches listener
        };
    }, []);// no dependencies in [] so runs once when component loads and never again
    
    const characters = posters
    const [lastDirection, setLastDirection] = useState()
    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
      }
    
    const outOfFrame = (title) => {
        console.log(title + ' left the screen!')
    }
            

    return (  
        <div>
            {/* <h1 className="pageTitle">Catalog</h1> */}
            <div className="movieCards__cardContainer">
                {posters.map((movie, index) => (
                    <MovieCard className="swipe" key={movie.title} onSwipe={(dir) => swiped(dir, movie.title)} onCardLeftScreen={() => outOfFrame(movie.title)}>
                        {/* // className="swipe"
                        // key={movie.title}    //keys allow read to efficiently re-render a list to make app fast
                        // preventSwipe={['up', 'down']}> */}
                        <div
                            style={{ backgroundImage: `url(${movie.url})` }}
                            className="card">
                            <h3>{movie.title}</h3>
                        </div>
                    </MovieCard>
                ))}
            </div> 
            <div className="swipeButtons">
                <IconButton 
                    className="swipeButtons__left">
                    <CloseIcon fontSize="large" 
                    />
                </IconButton>
                <IconButton 
                    className="swipeButtons__right">
                    <FavoriteIcon fontSize="large" 
                    />
                </IconButton>   
                {/* <Button onPress={() => swipe('left')} title='Swipe left!' />
                <Button onPress={() => swipe('right')} title='Swipe right!' /> */}
            </div>
        </div>
    )
};    
export default MovieCards   