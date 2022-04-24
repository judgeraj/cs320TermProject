import './DiscussionBoard.css';
import React, { useEffect, useState } from 'react';

import { Avatar } from '@material-ui/core'; // avatar icon import from material-ui
import {Edit, Delete} from '@material-ui/icons'
import database from '../../firebase/firebase';

function Message({topicId, timestamp, message, user, currentUser}) { // 
  // this function creates the messages for the user. It includes the user name, the message, and the timestamp 

  const userName = user.displayName
  const currentUserName = currentUser.displayName
  const db = database.collection('topics').doc(topicId).collection('messages')

  const editMsg = () => {
    console.log("edit")
    const editMsg = prompt("Edit Message")
    if(editMsg != null){
      db.onSnapshot( snapshot => {
        snapshot.docs.map( doc => {
          if(doc.data().timestamp.seconds === timestamp.seconds && userName === currentUserName){
            db.doc(doc.id).update({
              message: editMsg
            })
          }
        })
      })
    }
  }
  const deleteMsg = () => {
    console.log("delete")
    db.onSnapshot( snapshot =>{
      snapshot.docs.map( doc => {
        if(doc.data().timestamp.seconds === timestamp.seconds && userName === currentUserName){
          db.doc(doc.id).delete()
        }
      })
    })
  }

  //DEAD CODE: Attempted to refactor using the ID passed in the function. Although it seems it is working, the function is acting like it stuck in a loop.
  //function Message({topicId, messageDocId, currentUser})
  // const messageId = messageDocId
  // const [userName, setUserName] = useState("")
  // const [userPhoto, setUserPhoto] = useState("")
  // const [timestamp, setTimestamp] = useState("")
  // const [message, setMessage] = useState("")
  // useEffect(() => {
  //     database.collection('topics').doc(topicId).collection('messages').onSnapshot( sshot => {
  //       sshot.docs.forEach(fields => {
  //         if(fields.id === messageId){
  //           setMessage(fields.data().message)
  //           setUserName(fields.data().user.displayName)
  //           setUserPhoto(fields.data().user.photo)
  //           setTimestamp(fields.data().timestamp)
  //         }
  //       })
  //     })
  // })
  //END OF DEAD CODE

  // useEffect(() =>{
  //   database.collection('topics').doc(topicId)
  // })

  // user.displayName
  // userName
  // userPhoto 
  return (
    <section className={userName === currentUserName ? 'curUser' : 'oldUser'}>
       
       <div className={userName === currentUserName ?  'currentUserMessage' : 'notCurrent' }> {/** display the message at the right side if the current user inputted it */}
          
          <div className="curMessage"> {/** info about the message */}
              <h4>{userName.substring(0,userName.indexOf(' '))}</h4>
              <div className='messageTimestampRight'>{new Date(timestamp?.toDate()).toUTCString()}</div>
              <p>{message}</p>
          </div>
       
          <div className='avatarMain'> <Avatar className='avatar' src={user.photo}/>

            <div className='avatarButtons'>
              <Edit style={{ fontSize: 15 }} onClick={() => editMsg()}/>
              <Delete style={{ fontSize: 15 }} onClick={() => deleteMsg()}/></div>

          </div>
        </div>

        <div className={userName !== currentUserName ?  'oldUserMessage' : 'notCurrent' }> {/** display the messgae at the left side if the it is not from the current user */}
          
          <div className='avatarMain'> <Avatar className='avatar' src={user.photo}/>
          
            <div className='avatarButtons'>
              <Edit style={{ fontSize: 15 }} onClick={() => editMsg()}/>
              <Delete style={{ fontSize: 15 }} onClick={() => deleteMsg()}/></div> 
              
          </div>

          <div className="oldMessage"> {/** info about the message */}
              <h4>{userName.substring(0,userName.indexOf(' '))}</h4>
              <div className='messageTimestampLeft'>{new Date(timestamp?.toDate()).toUTCString()}</div>{/** {new Date(timestamp?.toDate()).toUTCString()} */}
              <p>{message}</p>
          </div>
        
        </div>
       
    </section>
  );
}
export default Message
// 24 lines