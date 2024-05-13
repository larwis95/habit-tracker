const router = require('express').Router();
const withAuth = require('../libs/middleware/auth');


router.get('/', async (req, res) => {
  res.render('homepage', {
    logged_in: req.session.logged_in,
  });
});

router.get('/dashboard', async (req, res) => {
  res.render('dashboard', {
    logged_in: req.session.logged_in,
  });
});

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

router.get('/about', async (req, res) => {
  res.render('about');
});

module.exports = router;
