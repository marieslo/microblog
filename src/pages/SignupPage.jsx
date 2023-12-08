import '../styles/style_pages/SignupPage.css';
import React, { useState } from 'react';
import { useAuth } from '../lib/AuthProvider';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isStrongPassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(value);
  };

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      alert('Please fill in all the fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again');
      return;
    }
    if (!isStrongPassword(password)) {
      alert('The supplied password does not meet the requirements');
      return;
    }

    const userData = {
      id: uuidv4(),
      username,
      password,
    };

    try {
      await register(userData);
      login({ username });
      navigate('/home');
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.message.includes('username')) {
        alert('Username is already taken. Please choose a different one');
      } else {
        alert('Error registering user. Please try again');
      }
    }
  };

  return (
    <form className='signup-form-container'>
      <fieldset>
        <legend>Sign up</legend>

        <Form.Control
          className='signup-page-input'
          type='text'
          placeholder='Enter your name'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Control
          className='signup-page-input'
          type='password'
          placeholder='Create a password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Control
          className='signup-page-input'
          type='password'
          placeholder='Confirm a password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button 
          className="signup-btn" 
          onClick={handleSignup}
          onKeyDown={(e) => e.key === 'Enter' && handleSignup()}>
          Sign up
        </Button>
      </fieldset>

      <p>
        Your password must include at least: <br/>
        8 characters, <br/> 
        1 uppercase letter, <br/> 
        1 lowercase letter, <br/> 
        1 digit
      </p>

      <p>
        Already have an account?{' '}
        <Link to='/login' className='login-link'>
          Log in here
        </Link>
      </p>
    </form>
  );
}