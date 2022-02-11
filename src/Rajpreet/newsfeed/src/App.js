import React, { Component } from 'react'
import './App.css';


async function getBusinessNews() { 
  // let response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=876fb32423264a94984a112b0dfea143');
  // let data = response.json();
  //return data;
  fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=876fb32423264a94984a112b0dfea143')
    .then(response => response.json())
    .then(data => console.log(data));
}

class App extends Component {
  render() {
    var data = getBusinessNews();
    // console.log(data);
    return (
     <div className="App">
        Person name newsfeed
      </div>
    );
  }
}

export default App;
