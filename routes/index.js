const router = require('express').Router();
const usersRoutes = require('./userRoute');
const thoughtsRoutes = require('./thoughtRoute');

router.use('/api/users', usersRoutes);
router.use('/api/thoughts', thoughtsRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
