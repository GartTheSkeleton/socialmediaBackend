const router = require('express').Router();

const { getAllUsers, createUser, getOneUser, updateUser, deleteUser, addFriend } = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:userId/:friendId')
    .put(addFriend)

module.exports = router;