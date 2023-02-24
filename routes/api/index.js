const router = require('express').Router();
const courseRoutes = require('./thoughtRoute');
const studentRoutes = require('./userRoute');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
