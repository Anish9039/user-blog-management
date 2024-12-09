A full-stack blog application built with React.js and MySQL. Features include user authentication with JWT, profile management (image upload & password update), and a responsive blog interface with CRUD operations. Built using React, Express.js, MySQL, JWT, bcrypt, and Multer for file uploads.

Overview
The Blog Management Application is a full-stack application that allows users to manage blogs with features like:

User Authentication (Signup, Login using JWT)
Blog Management (Create, Read, Update, Delete)
Responsive user interface with modals for viewing, editing, and deleting blogs
Secure backend API to handle blog data and user management
This application is built using React.js for the frontend, Node.js with Express.js for the backend, and MySQL as the database.


Here’s a comprehensive README.md file  based on the details Documentation and step:


# Blog Management Application
# Overview
## The Blog Management Application is a full-stack application that allows users to manage blogs with features like:

## User Authentication (Signup, Login using JWT)
## Blog Management (Create, Read, Update, Delete)
## Responsive user interface with modals for viewing, editing, and deleting blogs
## Secure backend API to handle blog data and user management
## This application is built using React.js for the frontend, Node.js with Express.js for the backend, and MySQL as the database.

# Features

## User Management: Users can sign up, log in, and manage their profiles securely.
## Blog CRUD Operations: Users can create, read, update, and delete blogs.
## Responsive Design: The UI is designed to be user-friendly and mobile-responsive.
## Secure API: Implements authentication using JWT to ensure secure access.**

# Installation Instructions

## Prerequisites
### Node.js (v14)
### npm (Node Package Manager)
### MySQL (Database)

# Backend Setup

# Clone the repository:
## git clone https://github.com/your-username/user-blog-management.git
## cd blog-management-app/backend

# Install dependencies:

## npm install

## Getting Started with Create React App

# Create the env file in the backend or can modify the code as per the databse 

## const pool = mysql.createPool({
##   host: 'localhost',
##   user: 'root',    // username 
##   password: '',       //password
##   database: 'blog_app',
## });

# Set up the MySQL database:

## Run the SQL schema provided in the backend/db/schema.sql file to create the required tables.

# start the backend srver

# By running this: node app.js

# Frontend setup

1. Navigate to the frontend directory:
# cd ../frontend

2. Install dependencies:
# npm install

3. Start the frontend server
# npm start


# How to run project locally.

# Make sure the backend server is running by navigating to the backend folder and running npm start.
# Start the frontend server from the frontend folder using npm start.
# Open your browser and navigate to http://localhost:3000.


# API Documentation

# Authentication

1. Register User
## POST : [api/auth/register](http://localhost:5000/api/auth/signup)
## Body:
## json

{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response:
# json
{
  "message": "User registered successfully"
}

2. Login User
POST : [api/auth/login](http://localhost:5000/api/auth/login)

json
{
  "email": "string",
  "password": "string"
}
Response:

{
	"message": "No token provided"
}

3. Update password

Put: [api/auth/update-password]http://localhost:5000/api/auth/update-password

json:
{
  "currentPassword": "123456789",
  "newPassword": "Anishthapa1@"
}

response:
{
	"message": "Password updated successfully"
}

4. Logout
POST: [http://localhost:5000/api/auth/logout]
response:
{
	"message": "Password updated successfully"
}



Blogs
1. Get All Blogs
GET [/blogs](http://localhost:5000/api/blogs)
Response:
[
  {
    "id": 1,
    "title": "Blog Title",
    "content": "Blog Content",
    "author": "Author Name"
  }
]



2. Create Blog
POST [/blogs](http://localhost:5000/api/blogs)

json:
{
  "title": "My New Blog Post",
  "content": "This is the content of my new blog post"
}

response
{
  "message": "Blog created successfully"
}

3. Update Blog
PUT [/blogs/:id](http://localhost:5000/api/blogs/7)

json
{
  "title": "anish",
  "content": "anish"
}

Response{
  "message": "Blog updated successfully"
}

4. Delete Blog
DELETE [/blogs/:id](http://localhost:5000/api/blogs/1)

Response:
{
  "message": "Blog deleted successfully"
}


# Technologies Used
## Frontend: React.js, TailwindCSS
## Backend: Node.js, Express.js
## Database: MySQL
## Authentication: JWT (JSON Web Tokens)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
