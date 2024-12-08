import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";  // Correct import for the context
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

const SignupPage = () => {
  const { register } = useContext(AuthContext);  // Use useContext to access register function
  const navigate = useNavigate();  // Initialize the navigate function
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // To display form validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation before calling register
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    setError(""); // Clear error

    try {
      await register(formData);  // Call register function from context
      navigate('/login');  // Redirect to login page after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        {/* Left Side: Image */}
        <div className="md:w-1/2 w-full">
          <img
            src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
            alt="Register Illustration"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Right Side: Register Form */}
        <div className="md:w-1/2 w-full p-6 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create an Account</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-500 transition"
            >
              Create your account
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
