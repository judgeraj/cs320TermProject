import React, { Component } from 'react'
import './App.css';


async function getBusinessNews() { 
  
}

class App extends Component {
  constructor(args) {
    super(args);
    this.state = {
      businessArticles:[]
    }
  }

  componentDidMount() {
    fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=876fb32423264a94984a112b0dfea143')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({
        businessArticles: data.articles
      });
    });
  }

  render() {
    console.log(this.state);
    return (
     <div className="App">
        {this.state.businessArticles.map((article, iterator)=> {
          return (
            <div> 
              <h2 style={{textAlign:'left'}}>
                {article.title}
              </h2>
              <img src={article.urlToImage}></img>
            </div>
          );
          })}
      </div>
    );
  }
}

export default App;
