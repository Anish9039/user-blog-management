

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import { toast } from "react-toastify";  // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const ProfilePage = () => {
  const { currentUser, uploadProfileImage, updatePassword, logout } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // For redirecting if the user is not authenticated

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to the login page
    }
  }, [currentUser, navigate]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile); // Update file state
    await uploadProfileImage(uploadedFile); // Upload image to the server
  };

  // Handle password update
  const onSubmitPassword = async (data) => {
    const { currentPassword, newPassword } = data;
    try {
      await updatePassword(currentPassword, newPassword); // Update password on the server
      toast.success("Password updated successfully!");
      window.location.reload();  // Refresh the page after password update
    } catch (error) {
      toast.error("Failed to update password.");
      console.error(error);  // Log any errors that occur during password update
    }
  };
  

  // Render nothing if the user is not logged in
  if (!currentUser) return null;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">Profile</h2>

      {/* Profile Image Section */}
      <div className="my-4 text-center">
        <img
          src={currentUser.image ? `http://localhost:5000/api/auth/profile${currentUser.image}` : '/default-profile.png'}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        {/* File input for image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border border-gray-300 rounded p-2"
        />
      </div>

      {/* Password Update Form */}
      <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-4">
        {/* Current Password */}
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            {...register('currentPassword', { required: 'Current password is required' })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          />
          {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            {...register('newPassword', { required: 'New password is required' })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
        </div>

        {/* Submit button for password update */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full py-2 px-4 bg-red-600 text-white rounded-md mt-4 hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
