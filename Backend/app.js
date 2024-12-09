const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();
const path = require('path'); // Import the 'path' module
const blogRoutes = require('./routes/blogRoutes')

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // This makes files stored in the 'uploads' folder accessible via the '/uploads' route


// Routes
app.use('/api/auth', authRoutes);

app.use('/api', blogRoutes);  // All blog routes are prefixed with '/api'


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
