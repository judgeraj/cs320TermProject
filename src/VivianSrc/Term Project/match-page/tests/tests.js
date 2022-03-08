const assert = require('chai').assert;
const getMovies = require('../app')getMovies;
const app = require('../app');
const swiped = require('../MovieCards')swiped

describe('app', function(){
    it('array should not be empty', function(){
        let result = getMovies();
        assert(result.length != 0);
    }),
    it('first value should be Last Man Down', function(){
        let result = getMovies();
        assert(result[0] == "Last Man Down");
    })
}

describe('app', function() {
    it('swipe left', function() { 
        let result = swiped(left); 
        assert(lastDirection[0] == "left")
    }), 
    it('swipe right', function() { 
        let result = swiped(right); 
        assert(lastDirection[0] ==  "right")
    })
})
