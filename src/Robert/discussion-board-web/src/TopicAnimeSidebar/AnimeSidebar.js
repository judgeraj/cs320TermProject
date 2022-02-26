import React from 'react';
import './TopicAnimeSidebar.css';
import AnimePost from './AnimePost';

import AddIcon from '@material-ui/icons/Add'; /** avatar icon import from material-ui */

function AnimeSidebar() {
  return (
    <section className='animeHeader'> {/** creates the header of the anime sidebar */}
        <div className="animeTitle">
            <h3>Anime Review / Rating</h3>
            <AddIcon className='addTopics'/>
        </div>

        <div className="animeListBar">
            <div className="animeList">
                <AnimePost /> {/**calls the anime function for posting in the sidebar */}
                <AnimePost />
                <AnimePost />
                <AnimePost />
              </div>
        </div>
    </section>
  )
}
export default AnimeSidebar;

// 17 lines