import React, {useState, useEffect} from 'react';
import './TopicAnimeSidebar.css';
import '../discussionboard/DiscussionBoard.css'
import AnimePost from './AnimePost';
import database from '../../firebase/firebase';

import AddIcon from '@material-ui/icons/Add'; // avatar icon import from material-ui 
import { SearchRounded } from '@material-ui/icons';

function AnimeSidebar() {
		const [animeSearch, setAnimeSearch] = useState("") // handles the anime search state 
		const [animeList, setAnimeList] = useState([]) // handles the anime list 

		const [rateAnime, setRateAnime] = useState([])
		const rateThisAni = (ani,e) =>{
			if(ani){
				database.collection('anime').add({
					animeTitle: ani.title,
					animeImg: ani.image_url,
					rating: 0,
					review: "",
					userImg: ""
				});
			}
			e.preventDefault()
		}

		useEffect(() => {
			database.collection('anime').orderBy('animeTitle', 'desc').onSnapshot(snapshot => // grabs the database info 

				//REFACTORED CODE: indstead of storing the data in the array, I stored the ID for each documents.
				//This will be used for finding the right data fields in firebase

				//setRateAnime(snapshot.docs.map((doc) => doc.data()))); <------- Refactored
				setRateAnime(snapshot.docs.map((doc) => doc.id))) 
		}, []);

		const searchForAnime = (e) => {
			e.preventDefault(); // prevents the page for refreshing 
			animeFetch(animeSearch);
		}	
		const animeFetch = async (animeName) => { // fetch query from the jikan api site 
				const find = await fetch( `https://api.jikan.moe/v3/search/anime?q=${animeName}&order_by=title&limit=3` ).then(res => res.json());
				setAnimeList(find.results);
		}
		return (
				<div className='animeHeader'> {/** creates the header of the anime sidebar */}
						<div className="animeTitle">
								<h3>Anime Review / Rating</h3>
								<form className='animeSearch' 
									onSubmit={e => searchForAnime(e)}> {/** anime search section */}
										<input placeholder='search for anime' 
										required value={animeSearch} 
										onChange={e => setAnimeSearch(e.target.value)} />
										<SearchRounded/>
								</form>
								<AddIcon className='addTopics'/> 
						</div>

						<div className="animeListBar">
								<div className='animeList'> {/** this should return a list of the anime search */}
										<h4>Select Anime and Create Post</h4>
										<div className="animeListBody" >
												{/**display all search result and as buttons for creating the post*/}
												{animeList.map((animeInfo) => (
														<button className='searchedResult' 
															onClick={(e) => rateThisAni(animeInfo,e)}>
																<img src={animeInfo.image_url} 
																	alt=""
																	width={150}
																	height={200}/>
																<h4>{animeInfo.title}</h4>
														</button>
												))}
										</div>
								</div>
								<form className="animePost">
									{/**calls the anime function for posting in the sidebar */}
										{rateAnime.map((ani) => (
											<AnimePost key={ani.ani} animeDocID={ani}/>
										))}
								</form>
						</div>
				</div>
		)
}
export default AnimeSidebar;
//65 lines