import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have the token stored in localStorage
      const token = localStorage.getItem('token'); 

      const response = await axios.post(
        'http://localhost:5000/api/blogs',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

     alert("Blog created sucessfully");
      navigate('/');
    } catch (error) {
      console.error('Error creating blog:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-6">
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg border-2 border-gray-300">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Create a New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-600 mb-2">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-600 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition-all">Create Blog</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default BlogCreate;
