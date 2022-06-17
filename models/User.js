const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 4,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    thoughts: [
        {type: Schema.Types.ObjectId, ref: 'Thought'}
    ],
    friends: [
        {type: Schema.Types.ObjectId, ref: "User"}
    ]
})

const User = model('User', userSchema);

module.exports = User;