let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose
};

//process.env.NODE_ENV === 'production' // heroku sets this by default
// We have three ennvironments 'test', 'development', 'production'