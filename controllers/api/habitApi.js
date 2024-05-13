/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const router = require('express').Router();
const { Habit } = require('../../models');
const withAuth = require('../../libs/middleware/auth');

router.get('/', async (req, res) => {
  try {
    const habitData = await Habit.findAll();
    res.status(200).json(habitData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.get('/user', async (req, res) => {
  try {
    const userHabits = await Habit.findAll(
      {
        where: {
          user_id: req.session.user_id
        }
      });
    res.status(200).json(userHabits);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  try {
    const habitData = await Habit.findByPk(req.params.id);
    if (!habitData) {
      res.status(404).json({ message: 'No habit found with this id!' });
      return;
    }
    res.status(200).json(habitData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newHabit = await Habit.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newHabit);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  };
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedHabit = await Habit.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (!updatedHabit[0]) {
      res.status(404).json({ message: 'No habit found with this id!' });
      return;
    }
    res.status(200).json(updatedHabit);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedHabit = await Habit.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (!deletedHabit) {
      res.status(404).json({ message: 'No habit found with this id!' });
      return;
    }
    res.status(200).json(deletedHabit);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

module.exports = router;
