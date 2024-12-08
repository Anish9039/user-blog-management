const express = require('express');
const authController = require('../controller/authController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

router.post('/logout', authController.logout);

// Profile route (for uploading image)
router.post('/profile', authenticate, authController.profile);

// Update password route
router.put('/update-password', authenticate, authController.updatePassword);



router.get('/test', (req, res) => {
    res.send('Route is working');
  });
  
module.exports = router;
