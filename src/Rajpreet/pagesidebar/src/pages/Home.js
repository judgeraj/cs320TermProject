import React, { Fragment } from 'react'
import { feedData } from './userFeedData'
import Posts from './Posts'
import './Home.css'

function Home() {
  return (
    <div className='grid'>
      <section className='stories'>
        <Posts />
      </section>
      <section className='suggestions'>
        mini profile
      </section>
    </div>
  );
}

export default Home
{/* <>
      <div className='post'>
        <h1 className='userFeedTitle'>User Feed</h1>
            {feedData.map((item, index) => {
              return(
                <div>
                    <div className='profile'>
                      <h2 className='userPostHeader'>{item.user}</h2>
                      <Fragment><img src={item.profilePic} className='profilePic'></img></Fragment> 
                    </div>
                    <Fragment><img src={item.picture} className='postPicture'></img></Fragment>
                  <p className='descips'>{item.descrip}</p>
                </div>
              );
            })}
      </div>
    </> */}