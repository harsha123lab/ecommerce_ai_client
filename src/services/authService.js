const API_URL = 'http://localhost:5000/api/auth';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
};

// Register a new user
const signup = async (name, email, password) => {
  try {
    console.log('=== SIGNUP: Attempting to register user ===');
    console.log('Email:', email);
    console.log('API URL:', `${API_URL}/signup`);
    
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    
    console.log('Signup response status:', res.status);
    
    const data = await res.json();
    console.log('Signup response data:', data);
    
    if (!res.ok) {
      console.error('Signup failed:', data.message);
      return { success: false, message: data.message || 'Signup failed' };
    }
    
    console.log('Signup successful!');
    return { success: true, message: data.message || 'Account created successfully!' };
  } catch (error) {
    console.error('=== SIGNUP: Error occurred ===');
    console.error('Error details:', error);
    return { success: false, message: 'Network error. Please check if the server is running.' };
  }
};

// Login user
const login = async (email, password) => {
  try {
    console.log('=== LOGIN: Attempting to login ===');
    console.log('Email:', email);
    console.log('API URL:', `${API_URL}/login`);
    
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Login response status:', res.status);
    
    const data = await res.json();
    console.log('Login response data:', data);
    
    if (!res.ok) {
      console.error('Login failed:', data.message);
      return { success: false, message: data.message || 'Login failed' };
    }
    
    // Store token and user data
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    console.log('Token stored:', !!data.token);
    console.log('User stored:', data.user);
    console.log('=== LOGIN: Successful ===');
    
    return { success: true, message: data.message || 'Login successful!', user: data.user };
  } catch (error) {
    console.error('=== LOGIN: Error occurred ===');
    console.error('Error details:', error);
    return { success: false, message: 'Network error. Please check if the server is running.' };
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return { success: true, message: 'Logged out successfully' };
};

// Get current user from localStorage
const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user is logged in
const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

// Get current user from API (verify token is still valid)
const getMe = async () => {
  try {
    const res = await fetch(`${API_URL}/me`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  getMe,
};

export default authService;
export { signup, login, logout, getCurrentUser, isLoggedIn, getMe };
