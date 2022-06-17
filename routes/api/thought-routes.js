const router = require('express').Router();

const { getAllThoughts, createThought, removeThought, updateThought, directDeleteThought } = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)

router.route('/:userId')
  .post(createThought);

router.route('/:thoughtId')
  .delete(directDeleteThought);

router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(removeThought)

module.exports = router;