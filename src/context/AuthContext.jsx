import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, signup as signupService, logout as logoutService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage (token)
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('=== AUTHCONTEXT: Login attempt ===');
      console.log('Email:', email);
      const result = await loginService(email, password);
      console.log('=== AUTHCONTEXT: Login result ===');
      console.log('Result:', result);
      
      if (result.success) {
        console.log('Setting user in context:', result.user);
        setUser(result.user);
        return { success: true, user: result.user };
      }
      console.error('Login failed:', result.message);
      return { success: false, message: result.message || 'Login failed' };
    } catch (error) {
      console.error('=== AUTHCONTEXT: Login error ===');
      console.error('Error:', error);
      return { success: false, message: error.message || 'An error occurred during login' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      console.log('=== AUTHCONTEXT: Signup attempt ===');
      console.log('Email:', email);
      const result = await signupService(name, email, password);
      console.log('=== AUTHCONTEXT: Signup result ===');
      console.log('Result:', result);
      
      if (result.success) {
        console.log('Signup successful!');
        return { success: true, message: 'Account created successfully!' };
      }
      console.error('Signup failed:', result.message);
      return { success: false, message: result.message || 'Signup failed' };
    } catch (error) {
      console.error('=== AUTHCONTEXT: Signup error ===');
      console.error('Error:', error);
      return { success: false, message: error.message || 'An error occurred during signup' };
    }
  };

  const logout = () => {
    const result = logoutService();
    setUser(null);
    return result;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};