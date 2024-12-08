// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/authContext"; // Make sure the path is correct for your project
// import { toast } from "react-toastify";  // Import toast for notifications
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
// import { useNavigate } from "react-router-dom";  // Import useNavigate

// const LoginPage = () => {
//   const { login } = useContext(AuthContext); // Get the login function from the context
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();  // Initialize navigate function

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if both fields are filled
//     if (!email || !password) {
//       toast.error("Please fill in both email and password."); // Show toast for missing fields
//       return;
//     }

//     // Validate email format
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       toast.error("Please enter a valid email address."); // Show toast for invalid email
//       return;
//     }

//     // Prepare the inputs for login
//     const inputs = { email, password };

//     try {
//       // Call the login function from AuthContext
//       await login(inputs); // This will authenticate and set the user in AuthContext

//       // After successful login, redirect to the homepage
     
//       navigate("/");      // Redirect to the homepage (http://localhost:3000/)
//     } catch (err) {
//       // Show error toast if login fails
//       toast.error("Login failed. Please check your credentials and try again.");
//       console.error("Login failed:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-300">
//       <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
//         {/* Left Side: Image */}
//         <div className="md:w-1/2 w-full">
//           <img
//             src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
//             alt="Login Illustration"
//             className="w-full h-full object-cover rounded-md"
//           />
//         </div>

//         {/* Right Side: Login Form */}
//         <div className="md:w-1/2 w-full p-6 md:p-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email Input */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               />
//             </div>

//             {/* Password Input */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-500 transition"
//             >
//               Login
//             </button>
//           </form>

//           <p className="mt-6 text-sm text-gray-600">
//             Don't have an account?{" "}
//             <a href="/Signup" className="text-blue-600 hover:underline">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext"; // Ensure this is correctly imported
import { toast } from "react-toastify";  // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useNavigate } from "react-router-dom";  // Import useNavigate

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Get the login function from the context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Initialize navigate function

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email and password
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
  
    const inputs = { email, password };
  
    try {
      await login(inputs);  // Call login function
  
      // If login is successful, redirect to the homepage
      navigate("/ProfilePage");  // Redirect to homepage
  
    } catch (err) {
      console.error("Login failed:", err.message);  // Log the error message
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        {/* Left Side: Image */}
        <div className="md:w-1/2 w-full">
          <img
            src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 w-full p-6 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-500 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/Signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
