import React from "react";

const ResponsiveSection = () => {
  return (
    <div className=" container flex flex-col md:flex-row items-center md:items-start p-6 md:p-12 bg-gray-100">
      {/* Left Side: Image */}
      <div className="md:w-1/2 w-full">
        <img
          src="https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg" // Replace with your image URL
          alt="Placeholder"
          className="w-full h-auto rounded-md shadow-lg"
        />
      </div>

      {/* Right Side: Text */}
      
      <div className="md:w-1/2 w-full md:pl-8 mt-6 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Engaging Heading
        </h1>
        <p className="text-gray-600 text-lg mb-4 leading-relaxed">
        Have you ever wanted to share your ideas, stories, or expertise with the world? Starting a blog is a powerful way to express yourself and connect with others who share your interests. Whether you're passionate about travel, food, technology, or personal growth, a blog is your platform to inspire, educate, and entertain.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition">
          Write your Blog
        </button>
      </div>
    </div>
  );
};

export default ResponsiveSection;
