const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const userController = require('./userController')
const db = require('./db'); 
const User = require('./userModel');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);
app.use('/', userController)

app.use(express.urlencoded({ extended: false }));

app.listen(4000, () => {
  console.log("Server works on 4000");
});
