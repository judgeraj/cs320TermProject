import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './Header';
import MovieCards from './MovieCards';
import SwipeButtons from "./SwipeButtons";
import StreamButtons from "./StreamButtons";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>   
          <Route path="/friends">
            <Header backButton="/" /> {/*keeps header across pages*/}
              <h1> I am the friends page</h1>
          </Route>
          <Route path="/">    {/*default route at bottom*/}    
            <Header />
            <StreamButtons/>
            <MovieCards />
            {/* <SwipeButtons>
            </SwipeButtons> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
