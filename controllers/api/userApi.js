const router = require('express').Router();
const { User, Habit, Pet, State } = require('../../models');


router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = dbUserData.id;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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

    res
      .status(200)
      .json({ message: 'You are now logged in!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
}
);

router.post('/habit', async (req, res) => {
  try {
    const habitData = await Habit.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(habitData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/habits/:id' , async (req, res) => {
  try {
    const habitData = await Habit.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    res.status(200).json(habitData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/pet', async (req, res) => {
  try {
    const petData = await Pet.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(petData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/pet/:id', async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id, {
      include: [{ model: State }],
    });

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
