// shows.js
const express = require("express");
const Show = require("../models/Show");
const router = express.Router();

// Get all the shows
router.get("/", async (req, res) => {
  // debug the GET request
  console.log("GET request to Vivian's shows page");
  //console.log(req.params);
  //console.log(req.body);

  // await getting the shows from the database
  try {
    const shows = await Show.find();
    res.status(200).json(shows);
  } catch (err) {
    res.status(400).json({ message: err });
  }

  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});

// Get a specific show,
router.get("/:showId", async (req, res) => {
  // debug params, body
  console.log("GET request to Vivian's shows page");
  console.log(req.params);
  console.log(req.body);

  try {
    const show = await Show.findById(req.params.showId);
    res.status(200).json(show);
  } catch (err) {
    res.status(404).json({ message: err });
  }

  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});

// Add a show
router.post("/", async (req, res) => {
  // debug the POST contents
  console.log("POST request to Vivian's shows page");
  console.log(req.params);
  console.log(req.body);

  // create a new Show Model from the ShowSchema
  const show = new Show({
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
  });

  // try to save the posted data to the database
  try {
    const savedShow = await show.save();
    res.status(200).json(savedShow);
  } catch (err) {
    res.status(406).json({ message: err });
  }

  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});

// Update some or all fields of a show, request.body must include all fields updated or not
router.put("/:showId", async (req, res) => {
  // debug params, body
  console.log("PUT request to Vivian's shows page");
  console.log(req.params);
  console.log(req.body);

  try {
    const updatedShow = await Show.updateOne(
      { _id: req.params.showId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          rating: req.body.rating,
        },
      }
    );
    res.status(200).json(updatedShow);
  } catch (err) {
    res.status(406).json({ message: err });
  }

  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});

// Update the title of a show
router.patch("/title/:showId", async (req, res) => {
  // debug params, body
  console.log("PATCH request to Vivian's shows page, updating a show's title");
  console.log(req.params);
  console.log(req.body);

  try {
    const updatedShowTitle = await Show.updateOne(
      { _id: req.params.showId },
      {
        $set: {
          title: req.body.title,
        },
      }
    );
    res.status(200).json(updatedShowTitle);
  } catch (err) {
    res.status(406).json({ message: err });
  }

  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});

// Update the rating of a show
router.patch("/description/:showId", async (req, res) => {
  // debug params, body
  console.log(
    "PATCH request to Vivian's shows page, updating a show's description"
  );
  console.log(req.params);
  console.log(req.body);

  try {
    const updatedShowDescription = await Show.updateOne(
      { _id: req.params.showId },
      {
        $set: {
          description: req.body.description,
        },
      }
    );
    res.status(200).json(updatedShowDescription);
  } catch (err) {
    res.status(406).json({ message: err });
  }

  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});

// Update the rating of a show
router.patch("/rating/:showId", async (req, res) => {
  // debug params, body
  console.log("PATCH request to Vivian's shows page, updating a show's rating");
  console.log(req.params);
  console.log(req.body);

  try {
    const updatedShowRating = await Show.updateOne(
      { _id: req.params.showId },
      {
        $set: {
          rating: req.body.rating,
        },
      }
    );
    res.status(200).json(updatedShowRating);
  } catch (err) {
    res.status(406).json({ message: err });
  }

  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});

// Delete a show by showId
router.delete("/:showId", async (req, res) => {
  // debug params, body
  console.log("DELETE request to Vivian's shows page");
  console.log(req.params);
  console.log(req.body);

  try {
    const removedShow = await Show.deleteOne({ _id: req.params.showId });
    res.status(200).json(removedShow);
  } catch (err) {
    res.status(406).json({ message: err });
  }

  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
});

module.exports = router;
