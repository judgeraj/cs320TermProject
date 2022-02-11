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
    // this.state = {
    //   techArticles: []
    // }
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
    // fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=876fb32423264a94984a112b0dfea143')
    // .then((response) => {
    //   return response.json()
    // })
    // .then((data) => {
    //   this.setState({
    //     techArticles: data.articles
    //   });
    // });

  }

  render() {
    console.log(this.state);

    return (
     <div className="App">
        {this.state.businessArticles.map((article, iterator)=> {
          return (
            <div id='singleArticle'> 
              <a href={article.url}>
                <img src={article.urlToImage} className='image'></img>
              </a>
              <a href={article.url}>
                <h2>
                  {article.title}
                </h2>
              </a>
              <p>{article.description}</p>
              <a href={article.url}>{article.url}</a>
            </div>
          );
          })}
      </div>
    );
  }
}

export default App;
