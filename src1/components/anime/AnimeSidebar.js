import React, {useState} from 'react';
import './TopicAnimeSidebar.css';
import '../DiscussionBoard/DiscussionBoard.css'
import AnimePost from './AnimePost';

import AddIcon from '@material-ui/icons/Add'; /** avatar icon import from material-ui */
import { SearchRounded } from '@material-ui/icons';

function AnimeSidebar() {
		const [animeSearch, setAnimeSearch] = useState("") /** handles the anime search state */
		const [animeList, setAnimeList] = useState([]) /** handles the anime list */

		const searchForAnime = e => {
			e.preventDefault(); /** prevents the page for refreshing */
			animeFetch(animeSearch);
		}	
		const animeFetch = async (animeName) => { /** fetch query from the jikan api site */
				const find = await fetch( `https://api.jikan.moe/v3/search/anime?q=${animeName}&order_by=title&limit=2` ).then(res => res.json());
				setAnimeList(find.results);
		}
		return (
				<div className='animeHeader'> {/** creates the header of the anime sidebar */}
						<div className="animeTitle">
								<h3>Anime Review / Rating</h3>
								<form className='animeSearch' onSubmit={searchForAnime}> {/** anime search section */}
										<input placeholder='search for anime' 
										required value={animeSearch} onChange={e => setAnimeSearch(e.target.value)} />
										<SearchRounded/>
								</form>
								<AddIcon className='addTopics'/> 
						</div>

						<div className="animeListBar">
								<div className='animeList'> {/** this should return a list of the anime search */}
										<h3>Anime Search Result</h3>
										<div className="animeListBody">
												{animeList.map((animeInfo) => (
														<div className='searchedResult'>
																<img src={animeInfo.image_url} alt=""/>
																<h4>{animeInfo.title}</h4>
														</div>
												))}
										</div>
								</div>
								<div className="animePost">
										<AnimePost /> {/**calls the anime function for posting in the sidebar */}</div>
						</div>
				</div>
		)
}
export default AnimeSidebar;
// 43 lines