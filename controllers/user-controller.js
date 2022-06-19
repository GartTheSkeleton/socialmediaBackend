const { User } = require('../models');

const userController = {
    //get all users
    getAllUsers(req,res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch (err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    getOneUser({ params },res) {
        User.findOne( {_id: params.userId} )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User exists with that ID.'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate( 
            { _id: params.userId },
            { username: body.username },
            { new: true}
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User exists with that ID.'})
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({params},res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friend: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User exists with that ID.'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    },

    removeFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friend: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User exists with that ID.'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.userId })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User exists with that ID.'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;