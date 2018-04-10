const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/profile', (req,res,next) => {
  if(!req.session.userId) {
    const err = new Error('You are not authorized to view this page');
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
    .exec(function (error,user) {
      if(error) {
        return next(error);
      } else {
        return res.render('profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook });
      }
    })
})

router.get('/', (req,res,next) => {
  return res.render('index', { title: 'Home' }); 
});

router.get('/login', (req,res,next) => {
  return res.render('login', { title: 'Log In' })
});

router.post('/login', (req,res,next) => {
  if(req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        const err = new Error('Wrong Email or Password');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    const err = new Error('Email and password are required');
    err.status = 401;
    return next(err);
  }
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
          req.session.userId = user._id;
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