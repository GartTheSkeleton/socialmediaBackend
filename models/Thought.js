 const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../../pizza-hunt/utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true
        },
        username: {
            type: String,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
          }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

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
    reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
    );

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;