import './TopicAnimeSidebar.css';
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {Avatar} from '@material-ui/core';
import database from '../../firebase/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function AnimePost(rateAni) {
  const user = useSelector(selectUser)

  const animeImg = rateAni.rateAni.animeImg
  const animeTitle = rateAni.rateAni.animeTitle
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [userPhoto, setUserPhoto] = useState("")
  
    const addRating = (e) => {
      const rate = prompt("add rating from 1-10")
      if(rate.length > 2 || isNaN(rate) === true){
        addRating(e)
      }
      if(parseInt(rate)<1 || parseInt(rate)>10){
        addRating(e)
      }
      else{
        database.collection('anime').onSnapshot( snapshot =>
           snapshot.forEach ((doc)=>{
             const title = doc.data().animeTitle 
              if(title === animeTitle ){
                database.collection('anime').doc(doc.id).update({
                  rating: rate,
                  userImg: user.photo
                })
              }
        }))
      }
      e.preventDefault() 
    }

    const addReview = (e) => {
      const rev = prompt("add review")
      if(rev.length === 0 && rev.length > 256){
        addReview(e)
      } 
      else{
        database.collection('anime').onSnapshot( snapshot =>
          snapshot.forEach ((doc)=>{
            const title = doc.data().animeTitle 
             if(title === animeTitle ){
               database.collection('anime').doc(doc.id).update({
                 review: rev,
                 userImg: user.photo
               })
             }
       }))
      }
      e.preventDefault()
    }

    useEffect(() => {
      database.collection('anime').onSnapshot( snapshot => {
        snapshot.forEach((doc) =>{
          const title = doc.data().animeTitle
          if(title === animeTitle){
            setRating(doc.data().rating)
            setReview(doc.data().review)
            setUserPhoto(doc.data().userImg)
          }
        })
      })
    })
    return (
      <div className='animeReviewHeader'> {/** creates the post in the Anime Sidebar */}
          <div className='animeReviewPost'>
            {/** creates fixed Anime post */}
                <img className='animePhoto' 
                      src={animeImg}
                      height={150} 
                      width={100}
                      alt=""/>
                <h3>{animeTitle}</h3>

                <button disabled={userPhoto!==user.photo && review.length !== 0} 
                  className={rating === 0 ? 'addRating' : 'rated'} 
                  type="button" onClick={e => addRating(e)}>
                    add rating
                    <AddIcon/>
                </button>

                <button disabled={userPhoto!==user.photo && rating !== 0} 
                  className={review.length === 0 ? 'addRating' : 'reviewed'} 
                  type="button" onClick={e => addReview(e)}>
                    add review
                    <AddIcon/>
                </button>
          </div>

          <div className={rating === 0 && review.length === 0 ? 'noReviewRating':'rateANDreview'}>

            <div className='rateScore'>
              <Avatar src={userPhoto}/>

              <div className={rating !== 0 ? 'rateScore' : 'noRating'}>
                <h4>{`Rating: ${rating}/10`}</h4>
              </div>
            </div>

            <p className={review.length !== 0 ? 'reviewMessage' : 'noReview'}>
              {`Review: ${review}`}
            </p>
          </div>
      </div>
    )
}
export default AnimePost
//15 lines