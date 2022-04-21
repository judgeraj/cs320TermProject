import React, { Component } from 'react'
import './Feed.css';

// var tech;
// var business;
// var tesla;
// var apple; 
// var wall;

//refactoring plans just havent been able to get it owrking
var promises = ['https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=876fb32423264a94984a112b0dfea143',
'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=876fb32423264a94984a112b0dfea143','https://newsapi.org/v2/everything?q=tesla&from=2022-01-22&sortBy=publishedAt&apiKey=876fb32423264a94984a112b0dfea143']

function teslaButton() {
  // if(tesla) {
  //   tesla = false;
  // } else {
  //   tesla = true;
  // }
}

function businessButton() {
  if(this.state.business) {
    this.state.business = false;
  } else {
    this.state.business = true;
  }
}

class Feed extends Component {
  constructor(args) {
    super(args);
    this.state = {
      businessArticles:[],
      techArticles:[],
      teslaArticles: [],
      appleArticles: [],
      wallstreetArticles: [],
      tech: "",
      tesla:"",
      business:"",
      wall:"",
      apple:""
    }
  }

  componentDidMount() {

    // fetch(promises)
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((data) => {
    //     arts.push(data.articles)
    //     console.log(arts)
    //   }); 
    // date = Ti
    fetch('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=876fb32423264a94984a112b0dfea143')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          wallstreetArticles: data.articles
        });
    });

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

    fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-04-22&sortBy=publishedAt&apiKey=876fb32423264a94984a112b0dfea143') //'https://newsapi.org/v2/everything?q=tesla&from=2022-01-22&sortBy=publishedAt&apiKey=876fb32423264a94984a112b0dfea143'
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        this.setState({
           teslaArticles: data.articles
        });
    });
    
    fetch('https://newsapi.org/v2/everything?q=apple&from=2022-04-11&to=2022-04-11&sortBy=popularity&apiKey=876fb32423264a94984a112b0dfea143')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          appleArticles: data.articles
        });
      });
  }
  
  render() {

    var allAPI = []
    var allArticles = []
    var titles = []

    this.state.businessArticles.forEach(element => {
      allArticles.push(element)
      console.log(element);  
    });

    this.state.teslaArticles.forEach(element => {
      allArticles.push(element)
      console.log(element);  
    });

    this.state.techArticles.forEach(element => {
      allArticles.push(element)
      console.log(element);  
    });

    this.state.appleArticles.forEach(element => {
      allArticles.push(element)
      console.log(element);  
    });

    this.state.wallstreetArticles.forEach(element => {
      allArticles.push(element)
      console.log(element);  
    });

    console.log(allArticles)
    console.log(this.state.business)
      return (
        <div className="Feed">
          {/* <button onClick={teslaButton} className='tButton'>tesla</button>
          <button onClick={businessButton} className='tButton'>business</button>
          <h1 className='title'>KARO NEWS</h1> */}
            {allArticles.map((article, iterator) => {
              return (
                <div className='singleArticle'> 
                  <a href={article.url} className='imageLink'>
                    <img src={article.urlToImage} className='image'></img>
                  </a>
                  <a href={article.url}>
                    <h2>
                      {article.title}
                    </h2>
                  </a>
                  <p className='articleText'>{article.description}</p>
                  <a href={article.url} className='links'>{article.url}</a>
                </div>
              );
            })} 
        </div>
      );
    }
}
export default Feed;