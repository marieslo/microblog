import React, { createContext, useContext, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider ({ children }) {
  
  const [user, setUser] = useState(() => {
    
    const storedUserData = localStorage.getItem('user');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const register = async (userData) => {
    try {
      const response = await fetch('https://6557800dbd4bcef8b612c361.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Error registering user');
      }
      const responseData = await response.json();
      console.log('User registered:', responseData);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAuthenticated = () => {
    return !!user;
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}