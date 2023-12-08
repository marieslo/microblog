import '../styles/style_components/NavBar.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTweetContext } from '../lib/TweetProvider';
import { useAuth } from '../lib/AuthProvider';

export default function NavBar({ isVisible }) {
  const { isAuthenticated, logout } = useAuth();
  const { tweetCount } = useTweetContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!isVisible || pathname === '/' || pathname === '/login' || pathname === '/signup' ) {
    return null;
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      logout();
      navigate('/login');
    }
  };


  return (
    <Navbar>
      <Container className='navbar'>
        <Nav className='me-auto'>

          <Nav.Link as={NavLink} to='/home' className='navbar-home'>
            Home
          </Nav.Link>

          {isAuthenticated() && (
            <Nav.Link as={NavLink} to='/profile' className='navbar-profile'>
              Profile
            </Nav.Link>
          )}
        </Nav>

        <div className='number-of-tweets'>Total: {tweetCount} tweets</div>

        <div className='navbar-logout'>
          {isAuthenticated() && (
            <Nav.Link onClick={handleLogout}>
              Logout
            </Nav.Link>
          )}
        </div>
      </Container>
    </Navbar>
  );
}