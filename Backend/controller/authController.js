const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/model');
const validator = require('../utils/validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // File system module for checking if upload directory exists

// Setup file upload using multer
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads', { recursive: true });
  }
  
  // Set up storage for multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the upload destination folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
  
  // Multer configuration
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      
      if (mimeType && extname) {
        return cb(null, true); // Accept file
      } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, and PNG images are allowed.'));
      }
    },
  }).single('profileImage');
  
  // Profile Update function
  const profile = (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return handleError(res, 400, err.message || 'Error uploading file');
      }
  
      const profileImage = req.file ? req.file.filename : null;
  
      if (!profileImage) {
        return handleError(res, 400, 'No image file uploaded');
      }
  
      const userId = req.user?.id; // Use optional chaining
  
      if (!userId) {
        return handleError(res, 401, 'User not authenticated');
      }
  
      // Call the updateProfileImage function from the model
      userModel.updateProfileImage(userId, profileImage, (dbErr) => {
        if (dbErr) {
          return handleError(res, 500, 'Error updating profile image in the database');
        }
  
        res.status(200).json({
          message: 'Profile updated successfully',
          profileImage: `/uploads/${profileImage}`,
        });
      });
    });
  };
// Helper function for handling errors
const handleError = (res, statusCode, message) => res.status(statusCode).json({ message });

// Signup User
const signup = (req, res) => {
  const { username, email, password } = req.body;

  // Validate email and password
  if (!validator.validateEmail(email) || !validator.validatePassword(password)) {
    return handleError(res, 400, 'Invalid email or password');
  }

  // Check if user exists
  userModel.findUserByEmail(email, (err, results) => {
    if (err) return handleError(res, 500, 'Internal server error');
    if (results.length > 0) return handleError(res, 400, 'User already exists');

    // Create new user
    userModel.createUser(username, email, password, (err) => {
      if (err) return handleError(res, 500, 'Error creating user');
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};


const login = (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    userModel.findUserByEmail(email, (err, results) => {
      if (err) return handleError(res, 500, 'Internal server error');
      if (results.length === 0) return handleError(res, 404, 'User not found');
  
      const user = results[0];
  
      // Compare passwords
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return handleError(res, 500, 'Error comparing passwords');
        if (!isMatch) return handleError(res, 400, 'Invalid password');
  
        // Generate JWT token with user.id 
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        

  
        // Send response with token and user data 
        res.status(200).json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              image:  user.image ? `http://localhost:5000/uploads/${user.image}` : '/default-avatar.png',  // Send the full URL of the profile image
            },
          });
      });
    });
  };



// Update Password
// Update Password
const updatePassword = (req, res) => {
    console.log('req.user:', req.user); // Debugging log to ensure req.user is correct
  
    const { currentPassword, newPassword } = req.body;
  
    // Correctly access userId from req.user
    const userId = req.user.id;
  
    if (!userId) {
      console.error('User ID missing in request');
      return res.status(400).json({ message: 'User not authenticated' });
    }
  
    // Proceed with the rest of the logic
    userModel.findUserById(userId, (err, results) => {
      if (err) {
        console.error('Error finding user:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = results[0];
  
      bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ message: 'Error comparing passwords' });
        }
  
        if (!isMatch) {
          return res.status(400).json({ message: 'Incorrect current password' });
        }
  
        userModel.updatePassword(userId, newPassword, (err) => {
          if (err) {
            console.error('Error updating password:', err);
            return res.status(500).json({ message: 'Error updating password' });
          }
  
          res.status(200).json({ message: 'Password updated successfully' });
        });
      });
    });
  };
  

  
  

// Logout (No action needed for JWT)
const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { signup, login, profile, updatePassword, logout };
