const router = require('express').Router();
const thoughtRoute = require('./thoughtRoute');
const userRoute = require('./userRoute');

router.use('./userRoute.js', userRoute);
router.use('./thoughtRoute.js', thoughtRoute);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;
