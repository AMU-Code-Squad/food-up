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

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    let newUser = new User({ username });
    await User.register(newUser, password);

    passport.authenticate('local')(req, res, function () {
      return res.redirect('/FoodUp');
    });
  } catch (err) {
    console.log(err);
    res.render('register');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/FoodUp',
    failureRedirect: '/login',
    failureFlash: 'No account exists for this username. Please sign-up first'
  }),
  (req, res) => {}
);

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Successfully LoggedOut');
  res.redirect('FoodUp');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
