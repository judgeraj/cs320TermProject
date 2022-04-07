const fetch = require("node-fetch");
let test = require("unit.js");
const controlFlow = require("unit.js/src/control-flow");

async function blackBoxTests() {
  const showsGetEndPoint = "http://localhost:3000/shows/";
  const emptyBody = {};
  let data = null;

  const response = await fetch(showsGetEndPoint, { method: "GET" });
  const responseData = response.json();
  responseData.then((data) => {
    // the fully tested feature is the GET request to the api,
    // asking for the shows in the database

    /*
      Black-box acceptance test
      verify that the api is returning status OK
    */
    test.assert(response.status === 200);
    console.log("Passed: test.assert(response.status === 200)");

    /*
      Black-box acceptance test
      verify that the api is not returning status 400 since the api
      is up and returning valid responses through postman
    */
    test.assert(response.status !== 400);
    console.log("Passed: test.assert(response.status !== 400)");

    /*
      Black-box acceptance test
      the api call should not return an empty object since we know there
      is data in this table, the null assertion is included to verify
      that the variable data was correctly reassigned
    */
    test.assert(data !== emptyBody && data !== null);
    console.log("Passed: test.assert(data !== emptyBody && data !== null)");

    /*
      Black-box acceptance test
      the api call should not return duplicate shows
      */
    test.object(data[0]).isNotEqualTo(data[1]);
    console.log("Passed: test.object(data[0]).isNotEqualTo(data[1])");

    /*
      Black-box acceptance test
      the 1st attribute should be the id assigned by the database
    */
    test.array(Object.keys(data[0])).hasProperty(0, "_id");
    console.log(
      "Passed: test.array(Object.keys(data[0])).hasProperty(0, '_id')"
    );

    /*
      Black-box acceptance test
      the 2nd attribute should be the title of the show
    */
    test.array(Object.keys(data[0])).hasProperty(1, "title");
    console.log(
      "Passed: test.array(Object.keys(data[0])).hasProperty(1, 'title')"
    );

    /*
      Black-box acceptance test
      the 3rd attribute should be the description of the show
    */
    test.array(Object.keys(data[0])).hasProperty(2, "description");
    console.log(
      'Passed: test.array(Object.keys(data[0])).hasProperty(2, "description")'
    );

    /*
      Black-box acceptance test
      the 4ty attribute should be the rating of the show
    */
    test.array(Object.keys(data[0])).hasProperty(3, "rating");
    console.log(
      'Passed: test.array(Object.keys(data[0])).hasProperty(3, "rating")'
    );

    /*
      Black-box acceptance test
      the 5th attribute should be the date the show was added to the database
    */
    test.array(Object.keys(data[0])).hasProperty(4, "dateAdded");
    console.log(
      'Passed: test.array(Object.keys(data[0])).hasProperty(4, "dateAdded")'
    );

    /*
      Black-box acceptance test
      the 6th attribute should be the internal revision key
    */
    test.array(Object.keys(data[0])).hasProperty(5, "__v");
    console.log(
      'Passed: test.array(Object.keys(data[0])).hasProperty(5, "__v")'
    );
  });
}

async function whiteBoxTests() {
  /*
    together the 2 test below give branch coverage to the if-else statement
  */
  const animePostEndPoint = "http://localhost:3000/anime/post/";
  const discussionId = "621ab82852eda1c38e871f4a";
  const emptyBody = {};
  const validBody = {
    imageId: "testing 1..2..3",
    url: "https://thegreatestwebsiteofalleternity.com",
  };

  // post the empty body that is missing a url field
  await fetch(animePostEndPoint + discussionId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(emptyBody),
  });

  const response1 = await fetch(animePostEndPoint + discussionId, {
    method: "GET",
  });
  const response1Data = response1.json();
  response1Data.then((data) => {
    /*
      White-box test
      testing the else branch in the following code:
      var url = null;
      if (req.body.url) {
          url = req.body.url;
      }
    */
    test.object(data[0]).hasProperty("url", null);
    console.log('Passed: test.object(data[0]).hasProperty("url", null)');
  });

  // post the valid body that has a url
  await fetch(animePostEndPoint + discussionId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(validBody),
  });

  const response2 = await fetch(animePostEndPoint + discussionId, {
    method: "GET",
  });
  const response2Data = response2.json();
  response2Data.then((data) => {
    /*
      White-box test
      testing the if branch in the following code:
      var url = null;
      if (req.body.url) {
          url = req.body.url;
      }
    */
    test.object(data[1]).hasNotProperty("url", null);
    console.log('Passed: test.object(data[0]).hasNotProperty"url", null)');
  });
}

async function integrationsTests() {
  // test that the post call correctly integrates and creates an instance
  // of the Show schema

  const showsEndPoint = "http://localhost:3000/shows/";
  const show = {
    title: "title...",
    description: "description...",
    rating: "0",
  };

  await fetch(showsEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(show),
  });

  const response = await fetch(showsEndPoint, {
    method: "GET",
  });
  const responseData = response.json();
  responseData.then((data) => {
    /*
      Integration test
      if correct then the object we passed in will come back,
      meaning the pieces of the controller are working together
    */
    test.object(data[0]).isEqualTo(show);
    console.log("Passed: test.object(data[0]).isEqualTo(show)");
  });
}

blackBoxTests();
whiteBoxTests();
integrationsTests();
