const router = require('express').Router();
const { State } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const stateData = await State.findAll();
    res.status(200).json(stateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

