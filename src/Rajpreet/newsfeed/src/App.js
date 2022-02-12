import React, { Component } from 'react'
import './App.css';


async function getBusinessNews() { 
  
}

class App extends Component {
  constructor(args) {
    super(args);
    this.state = {
      businessArticles:[],
      techArticles:[],
      teslaArticles: []
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
    fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=876fb32423264a94984a112b0dfea143')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({
        techArticles: data.articles
      });
    });
    fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-01-11&sortBy=publishedAt&apiKey=876fb32423264a94984a112b0dfea143')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({
        teslaArticles: data.articles
      });
    });
//
  }

  render() {
    console.log(this.state);
    // const allArticles = [this.state.techArticles, this.state.businessArticles, this];
    // console.log(allArticles)
    
    return (
     <div className="App">
        {this.state.techArticles.map((article, iterator) => {
          return (
            <div id='singleArticle'> 
              <a href={article.url} className='imageLink'>
                <img src={article.urlToImage} className='image'></img>
              </a>
              <a href={article.url}>
                <h2>
                  {article.title}
                </h2>
              </a>
              <p>{article.description}</p>
              <a href={article.url} className='links'>{article.url}</a>
            </div>
          );
          })}
        {this.state.businessArticles.map((article, iterator)=> {
          return (
            <div id='singleArticle'> 
              <a href={article.url}>
                <img src={article.urlToImage} className='image2'></img>
              </a>
              <a href={article.url}>
                <h2>
                  {article.title}
                </h2>
              </a>
              <p>{article.description}</p>
              <a href={article.url} className='links'>{article.url}</a>
            </div>
          );
        })}
        {this.state.teslaArticles.map((article, iterator)=> {
          return (
            <div id='singleArticle'> 
              <a href={article.url}>
                <img src={article.urlToImage} className='image3'></img>
              </a>
              <a href={article.url}>
                <h2>
                  {article.title}
                </h2>
              </a>
              <p>{article.description}</p>
              <a href={article.url} className='links'>{article.url}</a>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
