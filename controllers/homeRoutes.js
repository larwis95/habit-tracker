const router = require('express').Router();
const withAuth = require('../libs/middleware/auth');
const { User, Habit, Pet, State } = require('../models');

router.get('/', async (req, res) => {
  res.render('homepage', {
    logged_in: req.session.logged_in,
  });
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Habit }, { model: Pet }, { model: State }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

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
