const mongoose = require('mongoose');
const User=require('./userModel');
const Message=require('./messageModel');

mongoose.connect('mongodb://localhost:27017/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Błąd połączenia z bazą danych:'));
db.once('open', () => {
  console.log('Połączono z bazą danych MongoDB');
});

module.exports = db;