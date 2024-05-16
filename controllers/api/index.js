const router = require('express').Router();

const userRoutes = require('./userApi');

const habitRoutes = require('./habitApi');

const petRoutes = require('./petApi');

const dateRoutes = require('./dateApi');

const stateRoutes = require('./stateApi');

router.use('/users', userRoutes);
router.use('/habits', habitRoutes);
router.use('/pets', petRoutes);
router.use('/dates', dateRoutes);
router.use('/states', stateRoutes);

module.exports = router;
