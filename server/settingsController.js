const User = require('./userModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const express = require('express');
const app = express();
const cors = require('cors');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


async function saveData(req, res) {
    app.use(cors());

    upload.single('profilePicture')(req, res, async function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error occured while fetching photo.' });
        }
    });

    const { userName } = req.user;
    const user = await User.findOne({ userName });

    const userData = req.body;

    try {
        const passwordMatch = await bcrypt.compare(userData.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error occured' });
    }
    if (userData.firstName) user.firstName = userData.firstName;
    if (userData.lastName) user.lastName = userData.lastName;
    if (userData.position) user.position = userData.position;
    if (userData.experienceLevel) user.experienceLevel = userData.experienceLevel;
    if (userData.description) user.description = userData.description;
    if (userData.email) user.email = userData.email;
    if (userData.userName) user.userName = userData.userName
    if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        user.password = hashedPassword;
    }

    if (req.file) 
        user.profilePicture = req.file.buffer;


    try {
        await user.save();
        const updatedUser = await User.findOne({ userName });
        res.status(200).json({ message: 'User data updated.', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error ocured while saveing user data. ' });
    }
}

module.exports = {
    saveData
};
