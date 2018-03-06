const express = require('express');
const router = express.Router();

//Get a list of videos from the DB
router.get('/videos', (req,res) => {
  res.send({type: 'GET'});
});

//Add a new video to the DB
router.post('/videos', (req,res) => {
  res.send({type: 'POST'});
});

//Update the video in the DB
router.put('/videos/:id', (req,res) => {
  res.send({type: 'PUT'});
});

//Delete a video from the DB
router.delete('/videos/:id', (req,res) => {
  res.send({type: 'DELETE'});
});

module.exports = router;