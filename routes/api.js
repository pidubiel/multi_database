const express = require('express');
const router = express.Router();
const User = require('../models/users');

//Get a list of videos from the DB
router.get('/user', (req,res) => {
  res.send({type: 'GET'});
});

//Add a new video to the DB
router.post('/user', function(req,res, next) {
  User.create(req.body).then(function(user) {
    res.send(user);
  }).catch(next);
});
//Update the video in the DB
router.put('/user/:id', (req,res, next) => {
  res.send({type: 'PUT'});
});

//Delete a video from the DB
router.delete('/uesr/:id', (req,res, next) => {
  res.send({type: 'DELETE'});
});

module.exports = router;