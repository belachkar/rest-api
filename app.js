const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const postsRoute = require('./routes/posts');

const MDB = {
  username: process.env.MDB_USER,
  password: process.env.MDB_PASS,
  prtl: process.env.MDB_PROTOCOLE_OLD,
  host: process.env.MDB_HOST_OLD,
  // prtl: process.env.MDB_PROTOCOLE,
  // host: process.env.MDB_HOST,
  options: {
    dbName: 'test',
    useNewUrlParser: true,
    authSource: 'admin',
    ssl: true,
    keepAlive: true
  }
};

const urlMDB = MDB.prtl + '://' + MDB.username + ':' + MDB.password + '@' + MDB.host;


// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/posts', postsRoute);
app.get('/', (req, res) => {
  res.send('We are on home');
});

// DB Connection
mongoose.connect(urlMDB, MDB.options);
const mdb = mongoose.connection;

mdb
  .on('connecting', () => console.log('connecting to mongoDB...'))
  .on('disconnecting', () => console.log('disconnecting from mongoDB server...'))
  .on('disconnected', () => console.log('disconnected from mongoDB server.'))
  .on('close', () => console.log('Connection to mongoDB server closed.'))
  .on('error', (err) => console.error('ERROR on connecting to mongoDB server:\n', err))
  .once('open', () => {
    console.log('Connnection to MongoDB SUCCESS');
  });

// Listening
app.listen(3000);
