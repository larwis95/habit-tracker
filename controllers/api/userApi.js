/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const router = require('express').Router();
const { User } = require('../../models');


router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;

      res.status(200).json({username: userData.username, email: userData.email, id: userData.id, message: 'You are now logged in!'});
    });
  } catch (err) {
    console.log(err.constructor.name);
    if (err.constructor.name == "ValidationError") {
      res.status(400).json({ message: "Invalid Email"});
    } else {
      res.status(500).json(err);
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;

      res.status(200).json({username: userData.username, id: userData.id, message: 'You are now logged in!'});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
}
);
module.exports = router;
