import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Icons for View, Edit, and Delete
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [notification, setNotification] = useState(""); // To display success notifications

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch all blogs from your backend API
    axios.get('http://localhost:5000/api/blogs')
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  const handleViewDetails = (blog) => {
    setSelectedBlog(blog);
    setIsViewModalOpen(true);
  };

  const handleEditDetails = (blog) => {
    setSelectedBlog(blog);
    setUpdatedTitle(blog.title); // Pre-fill with current title
    setUpdatedContent(blog.content); // Pre-fill with current content
    setIsEditModalOpen(true);
  };

  const handleDeleteDetails = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateBlog = () => {
    const token = localStorage.getItem('token'); // Get the token from local storage

    axios
      .put(
        `http://localhost:5000/api/blogs/${selectedBlog.id}`,
        {
          title: updatedTitle, // Include title in the payload
          content: updatedContent, // Include content in the payload
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Add token to the Authorization header
        }
      )
      .then((response) => {
        // Update the blogs state with the updated blog data
        const updatedBlogs = blogs.map((blog) =>
          blog.id === selectedBlog.id
            ? { ...blog, title: updatedTitle, content: updatedContent }
            : blog
        );
        setBlogs(updatedBlogs); // Update the blogs state
        setIsEditModalOpen(false); // Close the modal
        setNotification("Blog updated successfully!"); // Success notification
      })
      .catch((error) => {
        console.error('Error updating blog:', error.response?.data || error.message);
        setNotification("Error updating blog!"); // Error notification
      });
  };

  const handleDeleteBlog = () => {
    const token = localStorage.getItem('token');  // Get the token from local storage
    
    if (!token) {
      alert('You need to be logged in to delete a blog.');
      return;
    }

    axios
      .delete(`http://localhost:5000/api/blogs/${selectedBlog.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Ensure the token is being sent in the header
        },
      })
      .then((response) => {
        setBlogs(blogs.filter(blog => blog.id !== selectedBlog.id));
        setIsDeleteModalOpen(false);
        setNotification("Blog deleted successfully!"); // Success notification
      })
      .catch((error) => {
        console.error('Error deleting blog:', error);
        setNotification("Error deleting blog!"); // Error notification
      });
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
    setUpdatedTitle(""); // Clear the input field
    setUpdatedContent(""); // Clear the textarea field
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog List</h1>

      {/* Notification */}
      {notification && (
        <div className="mb-4 p-4 bg-green-500 text-white rounded-md">
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.excerpt}</p>
            <div className="mt-4 flex justify-between">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleViewDetails(blog)}
              >
                <FaEye className="inline-block mr-2" />
                View Details
              </button>
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() => handleEditDetails(blog)}
              >
                <FaEdit className="inline-block mr-2" />
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteDetails(blog)}
              >
                <FaTrash className="inline-block mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Details Modal */}
      {isViewModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">{selectedBlog.title}</h2>
            <p className="mb-4">{selectedBlog.content}</p>
            <button
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Details Modal */}
      {isEditModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter Title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="6"
              placeholder="Enter Content"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleUpdateBlog}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Delete Blog</h2>
            <p>Are you sure you want to delete the blog: <strong>{selectedBlog.title}</strong>?</p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={handleDeleteBlog}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
