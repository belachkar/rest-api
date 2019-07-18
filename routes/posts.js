const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Get back all the posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ Error: err });
  }
});

// Submit a post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const savedPost = await post.save();
    console.log(savedPost);
    res.json(savedPost);
  } catch (err) {
    res.json({ Error: err });
  }
});

// Get specific post
router.get('/post/:id', async (req, res) => {
  const id = req.params.id ? req.params.id : '';

  try {
    const post = await Post.findOne({ _id: id });
    res.json(post);
  } catch (err) {
    console.error('Error getting post:', err);
    res.json({ Error: 'Unable to get the post, be sure the id of the post is correct!' });
  }
});

// Delete a specific post
router.delete('/:id', async (req, res) => {
  const id = req.params.id ? req.params.id : '';

  try {
    const post = await Post.deleteOne({ _id: id });
    res.json({ message: post });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.json({ Error: 'Unable to delete the post, be sure the the post exists!' });
  }
});

// Update a post
router.patch('/:id', async (req, res) => {
  const id = req.params.id ? req.params.id : '';
  const title = req.body.title;
  const description = req.body.description;

  const update = {};
  if (title) update.title = title;
  if (description) update.description = description;

  if (Object.keys(update).length && Object.keys(update).length > 0) {
    try {
      const post = await Post.updateOne({ _id: id }, update);
      res.json({ message: post });
    } catch (err) {
      console.error('Error updating post:', err);
      res.json({ Error: 'Unable to update the post, be sure the the post exists!' });
    }
  } else {
    res.json({ Error: 'Post not updated, no think to update!' });
  }
});

module.exports = router;
