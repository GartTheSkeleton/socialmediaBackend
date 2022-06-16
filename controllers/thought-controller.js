const { Thought } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req,res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch (err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId }
            )
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;