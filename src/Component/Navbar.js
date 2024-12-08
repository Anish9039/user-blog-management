import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext"; // Import context to get currentUser and logout function

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle the dropdown visibility
  const { currentUser, logout } = useContext(AuthContext); // Access current user and logout from context
  const navigate = useNavigate(); 



  // Toggle the dropdown menu (open/close)
  const toggleDropdown = (e) => {
    e.stopPropagation(); 
    setDropdownOpen((prev) => !prev); 
  };

  // Handle clicks outside the dropdown to close it
  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown")) {
      setDropdownOpen(false); 
    }
  };

  // Add event listener to handle clicks outside dropdown
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Navigate to the login page
  const handleLogin = () => {
    navigate("/login"); 
  };

  // Handle user logout
  const handleLogout = () => {
    logout(); 
    setDropdownOpen(false); 
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        
        <div className="text-lg font-bold">
          <a href="#" className="text-white hover:text-gray-300">
            MyWebsite
          </a>
        </div>
  
        {/* Navigation links for larger screens */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Home 
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Blog 
          </a>
        </div>
  
        <div className="relative dropdown">
          {/* Conditional rendering based on whether the user is logged in */}
          {currentUser ? (
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={toggleDropdown} 
            >
              {/* Display user avatar */}
              <img
                src={`http://localhost:5000${currentUser.image}`} // Avatar image path
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:block text-sm">
                {currentUser.name} {/* Display the user's name */}
              </span>
            </button>
          ) : (
            // Show login button if no user is logged in
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleLogin} 
            >
              Login
            </button>
          )}
          
          {/* Dropdown menu for logged-in users */}
          {dropdownOpen && currentUser && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <a href="/ProfilePage">Profile </a>
                </li>
                <li
                  className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout} // Trigger logout when clicked
                >
                  Logout 
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
  
      {/* Mobile navigation links */}
      <div className="md:hidden flex justify-center space-x-6 bg-gray-900 py-2">
        <a href="#" className="text-gray-300 hover:text-white">
          Home 
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          Blog 
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
