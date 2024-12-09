// blogRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/blogMiddleware');  // Ensure correct middleware
const authBlog = require('../controller/authBlog');

// Create Blog (POST)
router.post('/blogs', authenticate, authBlog.createBlog);

// Get All Blogs (GET)
router.get('/blogs', authBlog.getBlogs);

// Get Blog by ID (GET)
router.get('/blogs/:id',authenticate, authBlog.getBlogById);  // Ensure you're calling getBlogById here

// Update Blog (PUT)
router.put('/blogs/:id', authenticate, authBlog.updateBlog);

// Delete Blog (DELETE)
router.delete('/blogs/:id', authenticate, authBlog.deleteBlog);

module.exports = router;
