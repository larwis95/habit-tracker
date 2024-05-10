const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('homepage', {
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

module.exports = router;
