const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  try {
    const newPost = new Post({ ...req.body });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if(!post) res.status(404).json({ message: 'Not found '});
    else {
      for(const paramId in req.body) {
        post[paramId] = req.body[paramId];
      }
      await post.save();
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});



module.exports = router;
