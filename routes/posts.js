const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
  res.send('We are on POSTS');
});

router.post('/', (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  console.log(req.body);

  post.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ Error: err });
    });
});

module.exports = router;
