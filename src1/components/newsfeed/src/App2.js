import React, { Component } from 'react'
import './App.css';

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

class App extends Component {
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
    fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-01-22&sortBy=publishedAt&apiKey=876fb32423264a94984a112b0dfea143') //'https://newsapi.org/v2/everything?q=tesla&from=2022-01-22&sortBy=publishedAt&apiKey=876fb32423264a94984a112b0dfea143'
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        this.setState({
           teslaArticles: data.articles
        });
    });
    fetch('https://newsapi.org/v2/everything?q=apple&from=2022-02-21&to=2022-02-21&sortBy=popularity&apiKey=876fb32423264a94984a112b0dfea143')
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

    // this.state.techArticles.forEach(element => {
    //   titles.push(element.title)
    // });

    // console.log(titles)
    // for (let i = 0; i < allAPI.length; i++) {
    //   for (let j = 0; j < allAPI[0].length; j++) {
    //     const element = allAPI[i][j];
    //     console.log(element)
    //     allArticles.push(element)
    //   }
    // }
    if(this.state.business) {
      this.state.businessArticles.forEach(element => {
        allArticles.push(element)
        console.log(element);  
      });
    } 
    // console.log(this.state.teslaArticles)
    if(this.state.tesla) {
      this.state.teslaArticles.forEach(element => {
        allArticles.push(element)
        console.log(element);  
      });
    }
    if(!this.state.tech) {
      this.state.techArticles.forEach(element => {
        allArticles.push(element)
        console.log(element);  
      });
    }
    if(!this.state.apple) {
      this.state.appleArticles.forEach(element => {
        allArticles.push(element)
        console.log(element);  
      });
    }
    if(!this.state.wall) {
      this.state.wallstreetArticles.forEach(element => {
        allArticles.push(element)
        console.log(element);  
      });
    }

    console.log(allArticles)
    // var art = allArticles[0]
    // console.log(arts[0])
    // const allArticles = [this.state.techArticles, this.state.businessArticles, this];
    console.log(this.state.business)
      return (
        <div className="App">
          <button onClick={teslaButton} className='tButton'>tesla</button>
          <button onClick={businessButton} className='tButton'>business</button>
          <h1 className='title'>KARO NEWS</h1>
            {allArticles.map((article, iterator) => {
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
                  <p className='articleText'>{article.description}</p>
                  <a href={article.url} className='links'>{article.url}</a>
                </div>
              );
            })} 
        </div>
      );
    }
}
export default App;