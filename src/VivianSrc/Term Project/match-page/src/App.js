import React from 'react';
import Header from './Header';
import MovieCards from './MovieCards';
import './App.css';
import SwipeButtons from "./SwipeButtons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
    {/* Header */} 
    <Router>
      
      <Switch>   
        <Route path="/friends">
          <Header backButton="/" /> {/*keeps header across pages*/}
            <h1> I am the friends page</h1>
        </Route>
        <Route path="/">    {/*default route at bottom*/}    
          <Header />
          <MovieCards />
          <SwipeButtons>
          </SwipeButtons>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
 {/* Cards */}
      {/* Buttons below the cards */}

      {/* Individual match screen */}