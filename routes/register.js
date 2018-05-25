const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Media = require('../models/media');
const mid = require('../middleware');


router.get('/profile', mid.requiresLogin, (req,res,next) => {
  User.findById(req.session.userId)
    .exec(function (error,user) {
      if(error) {
        return next(error);
      } else {
        const userResult = null;
        Media.find({userId: req.session.userId}).then(function(result){
          const movies = result.filter(function(media){
            return media.mediaType === 'Movie';
          });
          const books = result.filter(function(media){
            return media.mediaType === 'Book';
          });
          const music = result.filter(function(media){
            return media.mediaType === 'Music';
          });
          const someArr = ['Janusz', 'Grazyna', 'Kamil']
          console.log(music);
          templateObject = {
            title: 'Profile',
            name: user.name,
            favorite: user.favoriteBook,
            movies: movies,
            books: books,
            music: music,
            someArr: someArr
          }
          //return res.render('profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook, media: result });
          return res.render('profile', templateObject);
        });
        //console.log(userResult);
        
      }
    })
})

router.get('/', (req,res,next) => {
  return res.render('index', { title: 'Home' }); 
});

router.get('/login', mid.loggedOut, (req,res,next) => {
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

router.get('/logout', (req,res,next) => {
  if (req.session) {
    //delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/')
      }
    });
  }
})

router.get('/about', (req,res,next) => {
  return res.render('about', { title: 'About' }); 
});

router.get('/contact', (req,res,next) => {
  return res.render('contact', { title: 'Contact' }); 
});

router.get('/register', mid.loggedOut, (req,res,next) => {
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

// POST /profile
router.post('/profile', function(req, res, next) {
  if (req.body.title && req.body.genre && req.body.author && req.body.mediaType) {
      // create object with form input
      var newItem = {
        userId: req.session.userId,
        mediaType: req.body.mediaType,
        title: req.body.title,
        genre: req.body.genre,
        author: req.body.author
      };
      console.log('User ID: ', req.session.userId);
      //Add new item to the Database
            // use schema's `create` method to insert document into Mongo
      Media.create(newItem, () => {
          //req.session.userId = user._id;
          return res.redirect('/profile');
        });
      // return res.render('profile', { title: newItem.title, genre: newItem.genre, author: newItem.author });
      //console.log(newItem);


      // use schema's `create` method to insert document into Mongo
      // User.create(userData, function (error, user) {
      //   if (error) {
      //     return next(error);
      //   } else {
      //     req.session.userId = user._id;
      //     return res.redirect('/profile');
      //   }
      // });
      
    } else {
      console.log(newItem);
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

module.exports = router;