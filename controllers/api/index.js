const router = require('express').Router();

const userRoutes = require('./userApi');

const habitRoutes = require('./habitApi');

const petRoutes = require('./petApi');


router.use('/users', userRoutes);
router.use('/habits', habitRoutes);
router.use('/pets', petRoutes);

module.exports = router;
