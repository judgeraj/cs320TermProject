import './DiscussionBoard.css';
import React, { useEffect, useState } from 'react';

import { Avatar } from '@material-ui/core'; // avatar icon import from material-ui
import {Edit, Delete} from '@material-ui/icons'
import database from '../../firebase/firebase';

function Message({timestamp, message, user, currentUser}) { 
  // this function creates the messages for the user. It includes the user name, the message, and the timestamp 
  // const messageId = messageDocId.messageDocId
  // const [user, setUser] = useState({})
  // const [timestamp, setTimestamp] = useState("")
  // const [message, setMessage] = useState("")
  // const editMsg = () => {
  // }
  // const deleteMsg = () => {
  // }
  // useEffect(() => {
  //     database.collection('topics').doc(topicId).collection('messages').onSnapshot( sshot => {
  //       sshot.docs.forEach(fields => {
  //         if(fields.id === messageId){
  //           console.log(fields.data().message)
  //           setMessage(fields.data().message)
  //           setUser(fields.data().user)
  //           setTimestamp(fields.data().timestamp)
  //         }
  //       })
  //     })
  // })
  return (
    <section className={user.displayName === currentUser.displayName ? 'curUser' : 'oldUser'}>
       
       <div className={user.displayName === currentUser.displayName ?  'currentUserMessage' : 'notCurrent' }> {/** display the message at the right side if the current user inputted it */}
          <div className="curMessage"> {/** info about the message */}
              <h4>{user.displayName.substring(0,user.displayName.indexOf(' '))}</h4>
              <div className='messageTimestampRight'>{new Date(timestamp?.toDate()).toUTCString()}</div>
              <p>{message}</p>
          </div>
          <Avatar className='avatar' src={user.photo}/>
          {/* <div className='avatarMain'> <Avatar className='avatar' src={user.photo}/>
            <div className='avatarButtons'>
              <Edit style={{ fontSize: 15 }}/>
              <Delete style={{ fontSize: 15 }}/>
            </div>
          </div> */}
        </div>

        <div className={user.displayName !== currentUser.displayName ?  'oldUserMessage' : 'notCurrent' }> {/** display the messgae at the left side if the it is not from the current user */}
          <Avatar className='avatar' src={user.photo}/>
          {/* <div className='avatarMain'> <Avatar className='avatar' src={user.photo}/>
            <div className='avatarButtons'>
              <Edit style={{ fontSize: 15 }}/>
              <Delete style={{ fontSize: 15 }}/>
            </div> 
          </div>*/}

          <div className="oldMessage"> {/** info about the message */}
              <h4>{user.displayName.substring(0,user.displayName.indexOf(' '))}</h4>
              <div className='messageTimestampLeft'>{new Date(timestamp?.toDate()).toUTCString()}</div>
              <p>{message}</p>
          </div>
        
        </div>
       
    </section>
  );
}
export default Message
// 24 lines