const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const userController = require('./userController')
const db = require('./db'); 
const User = require('./userModel');
require('dotenv').config();
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);

app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log("Server works on "+port);
});
