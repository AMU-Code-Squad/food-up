const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

//Index route//
router.get('/', (req, res) => {
  res.render('landing');
});

//Auth routes//
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
      if (err) {
          req.flash('error', err.message);
          return res.redirect('/register');
      }
      passport.authenticate('local')(req, res, () => {
          req.flash('success', 'Welcome to FoodUp, ' + user.username);
          res.redirect('/');
      });
  });
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'Welcome back!',
  failureRedirect: '/login',
  failureFlash: 'Invalid username or password.'
}));

router.get('/logout', (req, res) => {
  req.logout(); // Ensure the user is logged out
  req.flash('success', 'You have successfully logged out.'); // Set flash message
  res.redirect('/'); // Redirect to the home page or wherever appropriate
});




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
