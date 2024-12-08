import './App.css';
import Navbar from './Component/Navbar';
import Body from './Component/body';
import Footer from './Component/footer';
import Login from './Component/LoginPage';
import Signup from './Component/signupPage';
import { AuthContextProvider } from './context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import ProfilePage from './Component/profilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <AuthContextProvider>

    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/Signup" element={<Signup />} /> 
      <Route path="/ProfilePage" element={<ProfilePage />} /> 
      </Routes>
   
      <Footer />
      <ToastContainer />
    </Router>
    </AuthContextProvider>

  );
}

export default App;
