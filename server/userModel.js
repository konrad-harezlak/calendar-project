const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
    },
    experienceLevel: {
        type: String,
    },
    description: {
        type: String,
    },
    profilePicture: {
        type: String, 
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
