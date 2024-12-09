// blogModel.js
const db = require('../config/db'); // Assuming db is your MySQL connection

// Create Blog
// blogModel.js

// Create Blog
const createBlog = (title, content, userId, callback) => {
  const query = `INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)`;
  db.query(query, [title, content, userId], callback);
};

// Get All Blogs
const getBlogs = (callback) => {
  const query = `SELECT * FROM blogs ORDER BY created_at DESC`;
  db.query(query, callback);
};

// Get Blog by ID
const getBlogById = (blogId, callback) => {
  const query = `
    SELECT blogs.*, users.username
    FROM blogs
    INNER JOIN users ON blogs.user_id = users.id
    WHERE blogs.id = ?  
  `;
  db.query(query, [blogId], callback);
};

  
  
// Update Blog
  const updateBlog = (blogId, title, content, userId, callback) => {
    console.log("Blog ID:", blogId);  // Log blogId
    console.log("User ID:", userId);  // Log userId
  
    const checkQuery = `SELECT * FROM blogs WHERE id = ? AND user_id = ?`;
    
    db.query(checkQuery, [blogId, userId], (err, result) => {
      if (err) {
        return callback(err, null);  // If there’s an error in the query, return the callback with error
      }
      
      
      if (result.length === 0) {
        return callback(null, { affectedRows: 0 });  // No blog found for this user, return 0 affected rows
      }
  
      // Proceed with the update if the blog exists and is owned by the user
      const updateQuery = `UPDATE blogs SET title = ?, content = ? WHERE id = ? AND user_id = ?`;
  
      db.query(updateQuery, [title, content, blogId, userId], (err, result) => {
        if (err) {
          return callback(err, null);  // If error in update, return callback with error
        }
  
        console.log("Update result:", result); // Log the result of the update
        callback(null, result);  
      });
    });
  };
  
  




// Delete Blog
const deleteBlog = (id, userId, callback) => {
  const query = `DELETE FROM blogs WHERE id = ? AND user_id = ?`;
  db.query(query, [id, userId], callback);
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
