const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const db = require('../config/db'); 

// Helper function to hash password
const hashPassword = (password, callback) => {
  bcrypt.hash(password, 10, callback);
};

// Register new user
const createUser = (username, email, password, callback) => {
  hashPassword(password, (err, hashedPassword) => {
    if (err) return callback(err);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    pool.query(query, [username, email, hashedPassword], callback);
  });
};

// Find user by email
const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  pool.query(query, [email], callback);
};

// Update user password
const updatePassword = (userId, newPassword, callback) => {
  hashPassword(newPassword, (err, hashedPassword) => {
    if (err) return callback(err);

    const query = 'UPDATE users SET password = ?, last_password_change = CURRENT_TIMESTAMP WHERE id = ?';
    pool.query(query, [hashedPassword, userId], callback);
  });
};

// Find user by ID
const findUserById = (userId, callback) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  pool.query(query, [userId], callback);
};

const updateProfileImage = (userId, profileImage, callback) => {
    
    const query = `UPDATE users SET image = ? WHERE id = ?`;
  
    // Run the SQL query to update the profile image of the user
    db.query(query, [profileImage, userId], (err, result) => {
      if (err) {
        console.error('Error updating profile image:', err);
        return callback(err); // Return error to the callback
      }
      callback(null, result); // Call the callback with null for no error and result data
    });
  };

module.exports = {
  createUser,
  findUserByEmail,
  updatePassword,
  findUserById,
  updateProfileImage,
};