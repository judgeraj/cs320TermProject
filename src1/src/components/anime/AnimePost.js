import './TopicAnimeSidebar.css';
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {Avatar} from '@material-ui/core';
import database from '../../firebase/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function AnimePost(animeDocID) {
  const user = useSelector(selectUser)
  const animeID = animeDocID.animeDocID
  
  //const animeImg = rateAni.rateAni.animeImg
  //const animeTitle = rateAni.rateAni.animeTitle
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [userPhoto, setUserPhoto] = useState("")
  const [animeImg, setAnimeImg] = useState("")
  const [animeTitle, setAnimeTitle] = useState("")
  
    const addRating = (e) => { //adds rating to the created post by prompting the user 
      e.preventDefault() 
      const rate = prompt("add rating from 1-10")
      if(rate !== null){
        if(rate.length > 2 || isNaN(rate) === true){ //user input must be a valid number
          console.log("empty")
          addRating(e)
        }
        if(parseInt(rate)<1 || parseInt(rate)>10){ // input must be within the range of 1-10
          addRating(e)
        }
        else{
          //REFACTORED CODE: instead of iterating the entire documents in the firebase collection, I am using the document ID to find the right fields

          // database.collection('anime').onSnapshot( snapshot => 
          //    snapshot.forEach ((doc)=>{
          //      const title = doc.data().animeTitle 
          //       if(title === animeTitle ){        
          //         database.collection('anime').doc(doc.id).update({ 
          //           rating: rate,
          //           userImg: user.photo
          //         })
          //       }
          // }))
          database.collection('anime').doc(animeID).update({
            rating: rate,
            userImg: user.photo
          })
        }
      }
    }

    const addReview = (e) => { //adds review to the created post by prompting the user
      const rev = prompt("add review")
      if(rev !== null){
        if(rev.length === 0 && rev.length > 256){ //checks if the user given a review or if the given review is more than 256 characters
          addReview(e)
        } 
        else{
          //REFACTORED CODE: instead of iterating the entire documents in the firebase collection, I am using the document ID to find the right fields

          //   database.collection('anime').onSnapshot( snapshot =>
          //     snapshot.forEach ((doc)=>{
          //       const title = doc.data().animeTitle 
          //        if(title === animeTitle ){
          //          database.collection('anime').doc(doc.id).update({
          //            review: rev,
          //            userImg: user.photo
          //          })
          //        }
          //  }))

          database.collection('anime').doc(animeID).update({
            review: rev,
            userImg: user.photo
          })
        }
      }
      e.preventDefault()
    }

    useEffect(() => {
      database.collection('anime').onSnapshot( snapshot => {
        snapshot.forEach((doc) =>{

          //REFACTORED CODE: finding the right field using the document ID instead of the anime title
          // const title = doc.data().animeTitle
          // if(title === animeTitle){
          //   setRating(doc.data().rating)
          //   setReview(doc.data().review)
          //   setUserPhoto(doc.data().userImg)
          // }

          if(doc.id === animeID){
            setRating(doc.data().rating)
            setReview(doc.data().review)
            setUserPhoto(doc.data().userImg)
            setAnimeImg(doc.data().animeImg)
            setAnimeTitle(doc.data().animeTitle)
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

                {/** hides the button if the user gave a rating already and 
                 * disable the button if the user is different from the one who created the post */}
                <button disabled={userPhoto!==user.photo && review.length !== 0} 
                  className={rating === 0 ? 'addRating' : 'rated'} 
                  type="button" onClick={e => addRating(e)}>
                    add rating
                    <AddIcon/>
                </button>

                {/** hides the button if the user gave a review already and 
                 *  disable the button if the user is different from the one who created the post */}
                <button disabled={userPhoto!==user.photo && rating !== 0}
                  className={review.length === 0 ? 'addRating' : 'reviewed'} 
                  type="button" onClick={e => addReview(e)}>
                    add review
                    <AddIcon/>
                </button>
          </div>

          <div className={rating === 0 && review.length === 0 ? 'noReviewRating':'rateANDreview'}> {/** if no review and no rating given do not display the user's avatar */}

            <div className='rateScore'>
              <Avatar src={userPhoto}/>

              <div className={rating !== 0 ? 'rateScore' : 'noRating'}> {/** shows the rating from the user if given else display none */}
                <h4>{`Rating: ${rating}/10`}</h4>
              </div>
            </div>

            <p className={review.length !== 0 ? 'reviewMessage' : 'noReview'}> {/** shows the review from the user if given else display none */}
              {`Review: ${review}`}
            </p>
          </div>
      </div>
    )
}
export default AnimePost
//85 lines
//99