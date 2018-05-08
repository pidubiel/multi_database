const express = require('express');
const router = express.Router();
//const User = require('../models/users');

function checkIfDone(user) {
  console.log(res.send(user));
}

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
router.put('/user/:id', function(req, res, next){
  //console.log(req.body);
  User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      User.findOne({_id: req.params.id}).then(function(user){
          res.send(user);
      });
  }).catch(next);
});

//Delete a video from the DB
router.delete('/user/:id', function(req, res, next){
  User.findByIdAndRemove({_id: req.params.id}).then(function(user){
      res.send(user);
  }).catch(next);
});

module.exports = router;