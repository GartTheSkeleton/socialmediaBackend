 const { Schema, model } = require('mongoose');
const dateFormat = require('../../pizza-hunt/utils/dateFormat');

const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtValue => dateFormat(createdAtValue)
    },
    username: {
        type: String,
        ref: 'User',
        required: true
    },
    reactions: []
    },
    {
        toJSON: {
            getters: true
        }
    }
    );

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;