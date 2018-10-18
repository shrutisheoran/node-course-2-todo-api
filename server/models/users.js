let { mongoose } = require('../db/mongoose');

let User = mongoose.model('User', {
    user: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    }
});

module.exports = {
    User
};