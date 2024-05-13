const router = require('express').Router();

const userRoutes = require('./userApi');

const habitRoutes = require('./habitApi');

const petRoutes = require('./petApi');

const dateRoutes = require('./dateApi');


router.use('/users', userRoutes);
router.use('/habits', habitRoutes);
router.use('/pets', petRoutes);
router.use('/dates', dateRoutes);

module.exports = router;
