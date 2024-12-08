// Email validation
const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };
  
  // Password validation (at least 6 characters)
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  module.exports = {
    validateEmail,
    validatePassword,
  };
  