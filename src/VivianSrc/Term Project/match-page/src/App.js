import React from 'react';
import Header from './Header';
import MovieCards from './MovieCards';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
    

    {/* Header */}
    
    <Router>
      <Header /> {/*keeps header across pages*/}
      <Switch>   
        <Route path="/friends">
          <h1> I am the friends page</h1>
        </Route>
        <Route path="/">    {/*default route at bottom*/}
          
          <MovieCards />
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