// authController.js
const blogModel = require('../models/blogModel'); // Import the blog model

// Create Blog (POST)
const createBlog = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // User ID from the JWT token (set by middleware)

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  // You can now save to the database using your model
  blogModel.createBlog(title, content, userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating blog', error: err });
    }
    res.status(201).json({ message: 'Blog created successfully', blogId: result.insertId });
  });
};

// Get All Blogs
const getBlogs = (req, res) => {
  // Fetch all blogs from the database
  blogModel.getBlogs((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching blogs', error: err });
    }
    res.status(200).json(results);
  });
};

// Get Blog by ID
// Get Blog by ID
const getBlogById = (req, res) => {
    const blogId = req.params.id;
  
    // Fetch blog by ID from the model
    blogModel.getBlogById(blogId, (err, result) => {
      if (err || result.length === 0) {
        return res.status(500).json({ message: 'Blog not found', error: err });
      }
      
      // Return the blog data along with the username
      res.status(200).json(result[0]);
    });
  };
  

// Update Blog
const updateBlog = (req, res) => { 
  const blogId = req.params.id;
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  // Call the model function and pass a callback that handles the result
  blogModel.updateBlog(blogId, title, content, userId, (err, result) => {
    if (err) {
      console.error("Error in updating blog:", err);  // Log the error
      return res.status(500).json({ message: 'Error updating blog', error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Blog not found or not owned by this user' });
    }

    res.status(200).json({ message: 'Blog updated successfully' });
  });
};

// Delete Blog
const deleteBlog = (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;

  // Fetch the blog to ensure it exists and belongs to the user
  blogModel.getBlogById(blogId, (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ message: 'Blog not found or not owned by user' });
    }

    // Proceed with deleting the blog if it's valid
    blogModel.deleteBlog(blogId, userId, (err, result) => {
      if (err || result.affectedRows === 0) {
        return res.status(500).json({ message: 'Error deleting blog', error: err });
      }
      res.status(200).json({ message: 'Blog deleted successfully' });
    });
  });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
