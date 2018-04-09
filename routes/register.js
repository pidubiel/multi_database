const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req,res,next) => {
  return res.render('index', { title: 'Home' }); 
});

router.get('/about', (req,res,next) => {
  return res.render('about', { title: 'About' }); 
});

router.get('/contact', (req,res,next) => {
  return res.render('contact', { title: 'Contact' }); 
});

router.get('/register', (req,res,next) => {
  return res.render('register', { title: 'Sign Up' }); 
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword) {

      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      // create object with form input
      var userData = {
        email: req.body.email,
        name: req.body.name,
        favoriteBook: req.body.favoriteBook,
        password: req.body.password
      };

      // use schema's `create` method to insert document into Mongo
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          return res.redirect('/profile');
        }
      });
      
    } else {
      var err = new Error('All fields required.');
      console.log(req.body.email);
      err.status = 400;
      return next(err);
    }
});

module.exports = router;