const { Thought, User } = require('../models');

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
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
              );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User exists with that ID.' });
              return;
            }
            res.json(dbUserData);
          })
        .catch(err => res.status(400).json(err));
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then (deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({message: "No Thought with this ID."})
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId }},
                { new: true }
            )
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json( {message: 'No user found with this ID.'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },

    directDeleteThought({params}, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then (deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({message: "No Thought with this ID."})
            }
            res.json(deletedThought)
        })
        .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            {thoughtText: body.thoughtText},
            { new: true }
            )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json( { message: "No Thought with this ID" } )
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Reply failed.'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            {new: true}
        )
        .then(dbReactionData => res.json(dbReactionData))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;