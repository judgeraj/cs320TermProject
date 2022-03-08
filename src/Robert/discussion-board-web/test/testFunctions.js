module.exports = {
    createTopic: function() { /** create topics then add to the database */
        const addTopic = () => {
            const topicName = prompt("Enter new topic");
            if(topicName) {
                database.collection('topics').add({
                    topicName: topicName,
                });
            }
        };
        return addTopic;
    },
    fetchAnime: function(){
        const flag = false;
		const animeFetch = async (animeName) => { /** fetch query from the jikan api site */
				const find = await fetch( `https://api.jikan.moe/v3/search/anime?q=${animeName}&order_by=title&limit=2` )
                .then(res => {
                    if(res.ok){
                        res.json();
                        flag = true;
                    }
                    else{
                        flag = false;
                    }
                });
				setAnimeList(find.results);
		}
        return flag;
    },
    UserLoggin: function(){
        const hook = useDispatch();
            useEffect(() => { /** athenticate the logging in or logging out*/
                authenticate.onAuthStateChanged((newUser) => {
                    if(!newUser) { /** logout if the it is authenticated */
                        hook(logout())
                        return;
                    } 
                    hook(login({ /** if logging in data*/
                        photo: newUser.photoURL,
                        displayName: newUser.displayName
                    }))
                }) 
        },[hook]) /** dependency */
    }
}