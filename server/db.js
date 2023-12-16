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

db.on('error', console.error.bind(console, 'Error connecting to the database:'));
db.once('open', () => {
  console.log('Connected to the MongoDB database');
});


module.exports = db;