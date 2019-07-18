const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const MDB = {
  username: process.env.MDB_USER,
  password: process.env.MDB_PASS,
  prtl: process.env.MDB_PROTOCOLE_OLD,
  host: process.env.MDB_HOST_OLD,
  options: {
    // dbName: 'test',
    ssl: true,
    useNewUrlParser: true,
    authSource: 'admin'
  }
};

const urlMDB = MDB.prtl + '://' + MDB.username + ':' + MDB.password + '@' + MDB.host;

const postsRoute = require('./routes/posts');

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/posts', postsRoute);
app.get('/', (req, res) => {
  res.send('We are on home');
});

// DB Connection
mongoose.connect(urlMDB, MDB.options);
const mdb = mongoose.connection;

mdb.on('error', (err) => console.error('ERROR on connecting to mongoDB:\n', err));
mdb.once('open', () => {
  console.log('Connnection to MongoDB SUCCESS');
});
// mongoose.connect(urlMDB, { useNewUrlParser: true, ssl: true }, (err) => {
//   if (!err) {
//     console.log('Connnected to DB!');
//   } else {
//     console.log(urlMDB);
//     console.log(err);
//   }
// });


// Listening
app.listen(3000);
