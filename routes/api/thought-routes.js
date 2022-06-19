const router = require('express').Router();

const { getAllThoughts, createThought, removeThought, updateThought, directDeleteThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)

router.route('/:userId')
  .post(createThought)

router.route('/react/:thoughtId')
  .post(addReaction)
  .delete(directDeleteThought)

router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(removeThought)

router
  .route('/react/:thoughtId/:reactionId')
  .delete(removeReaction)

module.exports = router;