import React from 'react'
import './Products.css'
// import candlePic from '/candle.png'
/*
Getting logic working in the console and implementing 
sprite printing to screen
*/
var candles = 30
var sprites = []
var newURL = 'localhost:3000'

// let candle = 'candles.png'

function computerPicks(candles) {
  // var remainder = candles%4
  // if(remainder == 0) {
  //   return 1
  // }
  return candles%4 == 0 ? 0 : (candles%4) //changed above to simple 1 liner
}

function printcandles(candles) {
  for (let index = 0; index < candles; index++) { 
    console.log("|")    
  } 
  return
}

function startInput(candles) {
  if(typeof candles  == 'number') {
    if(candles < 10 || candles > 100) {
      alert("Enter valid input")
    }
  }
}

function main() {
  var turn
  while (candles > 0) {
    if(turn) {
      var input = prompt("Enter number of stickers to pick 1 - 3: ") 
      if(input <= 3 && input >= 1) {
        candles = candles - input
        console.log("User Turn " + input)
        console.log("total candles left = " + candles)
        if(candles <= 0) {
          console.log("User Wins")
          window.location.replace('localhost:3000')
          return
        }
        turn = 0
      }
    } else {
      candles = candles - computerPicks(candles)
      console.log("AI Turn")
      console.log("total candles left = " + candles)
      if(candles <= 0) {
        console.log("AI Wins")
        window.location.replace('localhost:3000')
        return
      }
      turn = 1
    }
  }
  window.location.replace('localhost:3000')
  return
}

function updateCandles(candles) { 

  for (let index = 0; index < candles; index++) {
    sprites[index] = 'https://pngimg.com/uploads/candle/candle_PNG7281.png'
  }
  return
  // var img = new Image(25, 75);

  //    img.src = 'https://pngimg.com/uploads/candle/candle_PNG7281.png'  
  //   for (var i = 1; i <= candles; i++) {      
  //       document.body.appendChild(img)
  //   }
}


function Products() {
  updateCandles(candles)
  // var num = 20
  // while(num > 0)
  //   console.log(computerPicks(num-=1))
  // startInput(candles)
  while(1) {
    return (
      <div className='products'>
        <button className='button'>1</button>
        <button className='button'>2</button>
        <button className='button'>3</button>
        {sprites.map((item, index) => (
          <img src={item} className='candle'></img>  
        ))}
          {/* <h1>Products</h1> */}    
      </div>
    );
  }
}

export default Products