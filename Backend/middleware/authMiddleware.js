const jwt = require('jsonwebtoken');

// Middleware to authenticate the user based on the JWT token
const authenticate = (req, res, next) => {
  // Extract the token from the 'Authorization' header
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const secret = process.env.JWT_SECRET || 'your_jwt_secret';

  // Verify the token
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    console.log('Decoded Token:', decoded);
  
    // Attach the decoded payload to `req.user`
    req.user = decoded;
  
    // Validate that req.user is being set
    console.log('req.user:', req.user);
  
    next(); // Proceed to the next middleware or route handler
  });
  
  
};

module.exports = authenticate;
