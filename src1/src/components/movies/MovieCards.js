import React, { useState, useEffect } from 'react';
import MovieCard from "react-tinder-card";
import database from './../../firebase/firebase';
import "./MovieCards.css";
import "./SwipeButtons.css"
import IconButton from "@material-ui/core/IconButton";
import styled from 'styled-components'
import { Button } from 'react-native'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import SwipeButtons from "./SwipeButtons";
import Popup from './Popup.js'

// import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";

// const APIURL =
//   "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7ecd0b11bc4cd387a22b43cb37086584";

const APIURL = "https://api.themoviedb.org/3/movie/popular?api_key=7ecd0b11bc4cd387a22b43cb37086584&language=en-US&page=1";

const TOPRATED = "https://api.themoviedb.org/3/movie/top_rated?api_key=7ecd0b11bc4cd387a22b43cb37086584&language=en-US&page=1";
// const SEARCH_API =
//   "https://api.themoviedb.org/3/search/movie?&api_key=7ecd0b11bc4cd387a22b43cb37086584&query="
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const TV = "https://api.themoviedb.org/3/tv/top_rated?api_key=7ecd0b11bc4cd387a22b43cb37086584&language=en-US"
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


// const matchArray [matches, setMatches] = useState([])

const matchArray = [""]
// export function Compare (user) {
//     console.log("comparing!")
//     // const matches = () => {
//     //     console.log("comparing inside matches!")
//     //     console.log(user.displayName)
//     //     database.collection(user.displayName).get().then(function(querySnapshot) {
//     //         querySnapshot.forEach(function(doc) {
//     //             // doc.data() is never undefined for query doc snapshots
//     //             // console.log(doc.id, " => ", doc.data());
//     //             // const myDoc = database.collection(user.displayName).doc(doc.id).data().bool
//     //             const friendDoc = database.collection('Robert Panerio').doc(doc.id)
        
//     //             if (doc.get('bool') == true ){

//     //                 console.log(doc.get('title') + "is true!")
//     //             } 
//     //             if (doc.get('bool') == false){
//     //                 console.log(doc.get('title') + "is false!")
//     //             } 
//     //         });
//     //     });
//     // };
    
//     matchArray.length = 0;
//     const matches = () => {
        
//         database.collection(user.displayName).onSnapshot( snapshot => {
//             snapshot.forEach((doc) => {
//               if (doc.id === 'friend') {
//                 setChosen(doc.data().name)
//               }
              
//             })
//           })
//         console.log("chosen one " + chosen)
//         database.collection(user.displayName).onSnapshot( snapshot => {
//           snapshot.forEach((doc) => {
//             database.collection(chosen).onSnapshot((y) => {
//                 y.forEach( x=> {
//                     if(x.id === doc.id ){
//                         if(x.data().bool === true && doc.data().bool === true){
//                         console.log(x.data().title)
//                         console.log(doc.data().title)
//                         matchArray.push(doc.data().title)
//                         }
//                     }
//                 })
//             })
//           })
//         })
//         matchArray.shift()
//     }
//     matches()
//     return matches
// }

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
    const [tv, setTV] = useState(false);
    useEffect(() => {
        // if (tv === false ) {
        //     fetch(APIURL).then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         setPosters(data.results);
        //     });
        // }
        // if ( tv === true ) {
        //     fetch(TV).then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         setPosters(data.results);
        //     });
        // }
        fetch(TOPRATED).then(res => res.json())
        .then(data => {
            console.log(data);
            setPosters(data.results);
        });
    //   addUser()
    }, [])
   
   
    const characters = posters
    const [lastDirection, setLastDirection] = useState()
    // const [myLikes, setMyLikes]
    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        console.log('you swiped ' + direction)
        setLastDirection(direction)
    }
    
    const outOfFrame = (title, direction, id, imgURL, overview) => {
        console.log(title + ' left the screen!')
        addLikes(title, direction, id, imgURL, overview)
        // add likes and dislikes into firebase
    }
    // const popper = false
    const [bpop, setBpop] = useState(false);

    // always checking and pulling the friend that was picked from the database
    const [chosen, setChosen] = useState("")
    useEffect(() => {
        database.collection("Chosen One").onSnapshot( snapshot => {
            snapshot.forEach((doc) => {
              if (doc.id === 'friend') {
                setChosen(doc.data().name)
                console.log('testing ' + doc.data().name)
              }
              
            })
          })
    });

    const matches = () => {  
        matchArray.length = 0;
        console.log("chosen one " + chosen)
        if (chosen.length != 0) {
            database.collection(user.displayName).onSnapshot( snapshot => {
                snapshot.forEach((doc) => {
                  database.collection(chosen).onSnapshot((y) => {
                      y.forEach( x=> {
                          if(x.id === doc.id ){
                              if(x.data().bool === true && doc.data().bool === true){
                              console.log(x.data().title)
                              console.log(doc.data().title)
                              matchArray.push(doc.data().title)
                              }
                          }
                      })
                  })
                })
              })
        }   
        matchArray.shift()
    }

    const addUser = () => {
        const userName = database.collection('users').doc(user.displayName)
        userName.get()
        .then((docSnapshot) => {
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
                    if (String(direction) === 'right') {
                        usersRef.set({
                            title: title,
                            bool: true,
                            overview: overview,
                            image: imgURL
                        });
                    } else { 
                        if (String(direction) === 'left') {
                            usersRef.set({
                                title: title,
                                bool: false,
                                overview: overview,
                                image: imgURL
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
            {/* <button type="button" onClick={() =>{addUser();  }} className="compare" > Add User </button> */}
            {/* <div className='tvMovie'>
                <button type="button" onClick={() => setTV(false) }className="compare" > Movies </button>
                <button type="button" onClick={() =>{setTV(true)}} className="compare" > TV Shows </button>
            </div> */}
            <div className="movieCards__cardContainer">
           
                {posters.map((movie, index) => (
                    <MovieCard className="swipe" 
                            key={movie.title} 
                            preventSwipe={["up", "down"]}
                            onSwipe={(dir) => swiped(dir, movie.title)} 
                            onCardLeftScreen={(dir) => outOfFrame(movie.title, dir, movie.id, movie.backdrop_path, movie.overview)}>
                        <div 
                            // style={{ backgroundImage: `url(${movie.url})` }}
                            // style={{ backgroundImage: `url(${"https://image.tmdb.org/t/p/w600_and_h900_bestv2" 
                            //                                 + movie.backdrop_path})` }}
                            className="card">
                                <img src={IMGPATH + movie.backdrop_path} />
                            <div className = "movieInfo"> 
                                <h3>{movie.title}</h3>
                                {/* <span>{movie.vote_average}</span> */}
                            </div>
                            <div className="overview">
                                <h1>{movie.title}</h1>
                                <h2>Synopsis:</h2>
                                <p>{movie.overview}</p>
                                <p>{movie.genre}</p>
                            </div>
                        </div>
                    </MovieCard>
                ))}
                {/* tried to show movies  */}
                {/* {posters.map((movie, index) => (
                    <MovieCard className="swipe" 
                            key={movie.name} 
                            preventSwipe={["up", "down"]}
                            onSwipe={(dir) => swiped(dir, movie.name)} 
                            onCardLeftScreen={(dir) => outOfFrame(movie.name, dir, movie.id, movie.backdrop_path, movie.overview)}>
                        <div 
                            // style={{ backgroundImage: `url(${movie.url})` }}
                            // style={{ backgroundImage: `url(${"https://image.tmdb.org/t/p/w600_and_h900_bestv2" 
                            //                                 + movie.backdrop_path})` }}
                            className="card">
                                <img src={IMGPATH + movie.backdrop_path} />
                            <div className = "movieInfo"> 
                                <h3>{movie.name}</h3>
                                {/* <span>{movie.vote_average}</span> */}
                            {/* </div>
                            <div className="overview">
                                <h1>{movie.name}</h1>
                                <h2>Synopsis:</h2>
                                <p>{movie.overview}</p>
                                <p>{movie.genre}</p>
                            </div>
                        </div>
                    </MovieCard>
                ))} */} 

            </div> 
            <Popup trigger = {bpop} setTrigger = {setBpop}> 
                <h1>Here are your matches!</h1>
                
                <ol>
                {matchArray.map((match) => (
                    <li>{match}</li>
                ))}
                </ol>
            </Popup>
            <div className="swipeButtons">
                
                <SwipeButtons/>
                {/* <IconButton 
                    className="swipeButtons__left">
                    <CloseIcon fontSize="large"/>
                </IconButton>
                <IconButton 
                    className="swipeButtons__right">
                    <FavoriteIcon fontSize="large"/>
                </IconButton>    */}
                {/* <Button onPress={() => swipe('left')} title='Swipe left!' />
                <Button onPress={() => swipe('right')} title='Swipe right!' /> */}
            </div>
        </div>
    )
};    
export default MovieCards   