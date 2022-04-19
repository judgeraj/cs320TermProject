import './TopicAnimeSidebar.css';
import React from 'react';

function AnimePost() {
    return (
      <div className='animePhotoBar'> {/** creates the post in the Anime Sidebar */}
          <h4>
            {/** creates fixed Anime post */}
                <img className='animePhoto' 
                src='https://i.pinimg.com/736x/a3/5e/b2/a35eb2fe2fae51682d87a36786fe5dcf.jpg'
                height={100} 
                width={100}
                alt=""/>
                Demon Slayer
          </h4>
      </div>
    )
}
export default AnimePost
//14 lines