
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  

// Create a new context called AuthContext
export const AuthContext = createContext();

// Define a component called AuthContextProvider that takes in children as props
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Return parsed user or null
  });

  useEffect(() => {
    console.log("Current User:", currentUser);
  }, [currentUser]);

  const register = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", inputs); // API signup endpoint
      console.log("Register API Response:", res.data);
      const { token, user } = res.data;

      if (user) {
        localStorage.setItem("token", token); // Store token in localStorage
        localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
        setCurrentUser(user);
      }

      toast.success("Registration successful!");
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Registration failed. Please check your details and try again.");
    }
  };
  // Login function
  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", inputs);
      console.log("Login API Response:", res.data);
      const { token, user } = res.data;

      if (user) {
        localStorage.setItem("token", token); // Store token in localStorage
        localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
        setCurrentUser(user); 
      }

      toast.success("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setCurrentUser(null);
      toast.info("Logged out successfully!");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again!");
    }
  };

  // Profile image upload function
  const uploadProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Assuming the server returns the updated user data or profile image path
      setCurrentUser((prevUser) => ({
        ...prevUser,
        image: res.data.profileImage, // Update the profile image path
      }));

      // Store updated user in localStorage
      localStorage.setItem("user", JSON.stringify({ ...currentUser, image: res.data.profileImage }));

      toast.success("Profile image updated successfully!");
    } catch (err) {
      console.error("Error uploading profile image:", err);
      toast.error("Error uploading profile image. Please try again.");
    }
  };

  // Update password function
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Password updated successfully!");
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error("Error updating password. Please try again.");
    }
  };

  // Store the currentUser state variable in localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, uploadProfileImage, updatePassword,register }}>
      {children}
    </AuthContext.Provider>
  );
};

