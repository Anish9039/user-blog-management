import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 p-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-lg font-semibold">My Website</h1>
          <p className="text-gray-400 text-sm">© 2024 My Website. All rights reserved.</p>
        </div>

        {/* Right Section: Links */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
