const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend


} = require('../controllers/userController');

// Get all users
router.route('/').get(getUsers);

//Get single user
router.route('/:userId').get(getSingleUser);

// Post a new user
router.route('/').post(createUser);

// Put an update to a user
router.route('/:userId').put(updateUser);

// Delete user 
router.route('/:userId').delete(deleteUser);

//Add friend
router.route('/:userId/friends/:friendId').post(addFriend)

//Delete friend
router.route('/:userId/friends/:friendId').put(deleteFriend)

module.exports = router;