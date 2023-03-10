const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../controllers/thoughtController');

// All thoughts
router.route('/').get(getThoughts);

// Single thought
router.route('/:thoughtId').get(getSingleThought);

// Create thought
router.route('/').post(createThought);

// Update thought
router.route('/:thoughtId').put(updateThought);

// Delete thought
router.route('/:thoughtId').delete(deleteThought);

// Create reaction
router.route('/:thoughtId/reactions').put(createReaction);

// Delete reaction
router.route('/:thoughtId/reactions').delete(deleteReaction);

module.exports = router;
