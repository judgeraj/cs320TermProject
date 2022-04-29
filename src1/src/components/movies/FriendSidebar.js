import database from './../../firebase/firebase';
import { selectUser } from '../../features/userSlice';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import FriendList from './FriendList';
import './FriendList.css';
import Popup from './Popup.js'
import { Avatar, Button } from '@material-ui/core';

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const matchArray = [""]
function AvatarUser(){
    const userId = useSelector(selectUser)
    return(<div className="userProfileName"> {/** creates the user profile bar at the mid left */}
                <Avatar src={userId.photo}/>
                    <div className="userInfo">
                        <h3>{userId.displayName}</h3> {/** only grabs the first name of the user */}
                    </div> 
            </div>)
}

function TopicSidebar() { //sidebar for discussion category
    const [users, setUsers] = useState([]);
    const [bpop, setBpop] = useState(false);
    const [chosen, setChosen] = useState("")
    const user = useSelector(selectUser)
    useEffect(() => {
        database.collection('users').onSnapshot(snapshot => // grabs the database info  
            setUsers(snapshot.docs.map(thisData => ({
                    topic: thisData.data(),    
                    id: thisData.id,
                }))
            ));
    }, []);
    
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
        console.log('here is the image path ' + IMGPATH + database.collection(user.displayName).doc('129').get().then(doc => doc.get('image')))
        if (chosen.length !== 0) {
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

    const triggerBop = () =>{
        setBpop(true)
    }

    return (
        <div className="Friendbar">
            <div className="friendBarTitle"> {/** main title header in the sidebar */}
                <h3>Find Your Match</h3>
            </div>
            <div className='friendSidebarBody'> {/** topic section in the sidebar */}
                {AvatarUser()}
                <div className='friendTitle'> {/** creates the header of the topic list */}
                    <div className='friendsTitleBar'>
                        <h4>Friends</h4>
                    </div> {/* the list of topics for discussion */}
                </div>
                <div className="friendList">
                    {users.map(({id: photo, topic: displayName}) => (
                        <FriendList 
                            key={photo} 
                            id={displayName.photo} 
                            userName={photo}/>
                    ))}
                </div>
            </div>
            <div className="friendBottom">
                <Button onClick={() => {matches()}}>Compare with {chosen}</Button>
                <Button onClick={() => {triggerBop() }}>View Matches</Button>
                </div>
                <Popup trigger = {bpop} setTrigger = {setBpop}> 
                    <h1>You and {chosen} should watch:</h1>
                    <ol>
                    {matchArray.map((match) => (
                        <li> 
                            {match}
                        </li>
                    ))}
                    </ol>
                </Popup>
        </div>
  );
}
export default TopicSidebar
