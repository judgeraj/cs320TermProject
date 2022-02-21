import React from 'react';
import './TopicAnimeSidebar.css';

function AnimePost() {
  return (
    <div className='animePhotoBar'> {/** creates the post in the Anime Sidebar */}
        <h4>
          {/** creates fixed Anime post */}
            <img className='animePhoto' 
            src='https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SQSBAJOSTJD4BKWKHQUC45VYT4.jpg'
            height={100} 
            width={100}/>
            Demon Slayer
        </h4>
    </div>
  )
}

export default AnimePost

//11 lines