const bcrypt = require('bcrypt');
const User = require('./userModel');
const express = require('express');

async function registerUser(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const { userName, email } = req.body;
  const newUser = new User({ userName, email, password: hashedPassword });

  try {
    
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik o podanej nazwie już istnieje.' });
    }

    await newUser.save();
    console.log('Użytkownik został pomyślnie zarejestrowany.');

    res.redirect('/');

  } catch (error) {
    console.error('Błąd podczas rejestracji użytkownika:', error);
    res.redirect('/registration');
  }
  return res.status(200);
}

module.exports = {
  registerUser
};
