import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { login, logout } from "./features/userSlice";
import { selectUser } from "./features/userSlice";
import { authenticate } from "./firebase/firebase";
import LogginIn from "./firebase/loginUser";

import Header from "./components/common/Header";
import HomePage from "./components/HomePage";
import AnimeSidebar from "./components/anime/AnimeSidebar";
import Discussion from "./components/discussionboard/Discussion";
import Movies from "./components/movies/Movies";
import ConvoLogin from "./components/chats/convo_client/src/ConvoLogin";
import Memes from "./components/memes/memes";

import "./styles/App.css";

function UserLoggin() {
  const hook = useDispatch();
  useEffect(() => {
    /** athenticate the logging in or logging out*/
    authenticate.onAuthStateChanged((newUser) => {
      if (!newUser) {
        /** logout if the it is authenticated */
        hook(logout());
        return;
      }
      hook(
        login({
          /** if logging in data*/
          photo: newUser.photoURL,
          displayName: newUser.displayName,
        })
      );
    });
  }, [hook]); /** dependency */
}
function App() {
  /** create the entire webpage */
  const userId = useSelector(selectUser);
  UserLoggin();

  return (
    <div className="app">
      {userId ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discussionboard" element={<Discussion />} />
            <Route path="/animereview" element={<AnimeSidebar />} />
            <Route path="/movies" element={<Movies />} />      
            <Route path="/convo" element={<ConvoLogin />} />
	          <Route path="/memes" element={<Memes />} />
          </Routes>
        </>
      ) : (
        <LogginIn />
      )}
    </div>
  );
}

export default App;
// 44  (app.js)
// 23  (app.css)
// 256 (TopicAnimeSidebar directory)
// 185 (DiscussionBoard directory)
// 21  (loginUser.css)
// = 529 total (without including closing brackets, closing parenthesis, comments, and new lines  )
