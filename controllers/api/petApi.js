/* eslint-disable no-console */
const router = require('express').Router();
const { Pet, State } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const petData = await Pet.findAll();
    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/user', async (req, res) => {
  try {
    const petData = await Pet.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: { model: State }
    });

    if (!petData) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const petData = await Pet.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(petData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/', async (req, res) => {
  try {
    const petData = await Pet.update(req.body, {
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!petData[0]) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.delete('/', async (req, res) => {
  try {
    const petData = await Pet.destroy({
      where: {
        user_id: req.params.user_id,
      },
    });

    if (!petData) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
