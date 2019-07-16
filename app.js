const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const MDB = {
  prtl: process.env.MDB_PROTOCOLE,
  username: process.env.MDB_USER,
  password: process.env.MDB_PASS,
  host: process.env.MDB_HOST,
};

const urlMDB = MDB.prtl+'://'+MDB.username+':'+MDB.password+'@'+MDB.host;

const postsRoute = require('./routes/posts');

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/posts', postsRoute);
app.get('/', (req, res) => {
  res.send('We are on home');
});

// DB Connection
mongoose.connect(urlMDB, { useNewUrlParser: true, ssl: true }, (err) => {
  if (!err) {
    console.log('Connnected to DB!');
  } else {
    console.log(urlMDB);
    console.log(err);
  }
});

// Listening
app.listen(3000);
