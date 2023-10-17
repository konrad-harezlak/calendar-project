const express = require('express');
const router = express.Router();
const User = require('./userModel');

// Endpoint do zapisywania danych użytkownika do bazy danych
router.post('/registration', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
    
    module.exports = router;