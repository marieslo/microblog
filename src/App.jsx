import './styles/App.css';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthProvider from './lib/AuthProvider';
import TweetProvider from './lib/TweetProvider';

export default function App() {
  const location = useLocation();
  const isNavBarVisible = !['/', '/login', '/signup'].includes(location.pathname);


  return (
    <div>
      <AuthProvider>
        {isNavBarVisible && <NavBar isVisible={true} />}
        <TweetProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </TweetProvider>
      </AuthProvider>
    </div>
  );
}