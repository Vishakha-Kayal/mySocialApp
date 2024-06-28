const auth = require('../middleware/auth.js');
const express = require('express');
const Posts = require('../models/posts.model');
const User = require('../models/user.model');
const router = express.Router();

router.get('/allPosts', async (req, res) => {
  try {
    const posts = await Posts.find().populate('author comments.author');
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/addPost', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Posts({
      title,
      content,
      author: req.user._id,
      likes: [],
      comments: []
    });
    await post.save();
    const user = await User.findOne({ _id: req.user._id });
    user['posts'].push(post._id)
    await user.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/like', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const post = await Posts.findById(req.body.postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
      await post.save();
      res.send("Liked successfully");
    } else {
      res.send("Already liked");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/comment', auth, async (req, res) => {
  try {
    console.log("postid", req.body.postId);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const post = await Posts.findById(req.body.postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    post.comments.push({ author: req.user._id, comment: req.body.comment });
    await post.save();
    res.send("commented successfully");

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/userPosts/:userId', auth, async (req, res) => {
  try {
    const posts = await Posts.find({ author: req.params.userId });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/editPost/:postId', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).send("You are not authorized to edit this post");
    }
    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();
    res.send("Post updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/deletePost/:postId', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    if (!post) {
      console.error("Post not found");
      return res.status(404).send("Post not found");
    }
    if (post.author.toString() !== req.user._id.toString()) {
      console.error("User not authorized to delete this post");
      return res.status(403).send("You are not authorized to delete this post");
    }
    await post.deleteOne();
    res.send("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

