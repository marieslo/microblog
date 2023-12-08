import '../styles/style_pages/LoginPage.css';
import React, { useState } from 'react';
import { useAuth } from '../lib/AuthProvider';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {

  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please fill in all the fields');
      return;
    }
    const isUserRegistered = await authenticateUser(username, password);
    if (!isUserRegistered) {
      alert('Incorrect login or password or user is not registered');
      return;
    }
    login({ username });
    navigate('/home');
  };

  const authenticateUser = async (username, password) => {
    try {
      const response = await fetch(`https://6557800dbd4bcef8b612c361.mockapi.io/users?search=${username}`);
      const data = await response.json();
      return data.length > 0 && data[0].password === password;
    } catch (error) {
      console.error('Error authenticating user:', error);
      return false;
    }
  };


  return (
    <form className='login-page-container'>
      <fieldset>
        <legend>Login</legend>
        <Form.Control
          className='loginpage-input'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Control
          className='loginpage-input'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button 
          className="login-btn" 
          onClick={handleLogin}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}>
          Login
        </Button>
      </fieldset>
      <p>
        If you are not registered yet, please,{' '}
        <Link to='/signup' className='signup-link'>
          sign up here
        </Link>
      </p>
    </form>
  );
}