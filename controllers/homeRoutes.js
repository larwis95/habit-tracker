const router = require('express').Router();
const withAuth = require('../libs/middleware/auth.js');
const { User, Habit, Pet, State } = require('../models');

router.get('/', async (req, res) => {
  res.render('homepage', {
    logged_in: req.session.logged_in,
  });
});

router.get('/dashboard', withAuth, async (req, res) => {

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get(/logout/, async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
