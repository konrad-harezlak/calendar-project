const mongoose = require('mongoose');
require('dotenv').config();
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD 
const uri = `mongodb+srv://${username}:${password}@db.380bxnf.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Błąd połączenia z bazą danych:'));
db.once('open', () => {
  console.log('Połączono z bazą danych MongoDB');
});

module.exports = db;