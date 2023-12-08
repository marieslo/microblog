import '../styles/style_components/EditProfileForm.css'
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function EditProfileForm({ user, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (!user?.id || user.id === '') {
      const defaultUser = {
        id: '',
        username: '',
      };
      setNewUsername(defaultUser.username || '');
      setNewPassword('');
    } else {
      setNewUsername(user.username || '');
      setNewPassword('');
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      if (!user?.id) {
        throw new Error('User ID is not defined');
      }

      if (newPassword && newPassword.length < 8) {
        throw new Error('Your password must include at least 8 characters');
      }

      const requestBody = {};

      if (newUsername && newUsername !== user.username) {
        requestBody.username = newUsername;
      }

      if (newPassword) {
        requestBody.password = newPassword;
      }

      const response = await fetch(`https://6557800dbd4bcef8b612c361.mockapi.io/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Error updating user');
      }

      const updatedUser = await response.json();
      onUpdate(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h5>Edit Username</h5>
      <Form.Control
        className='edit-username-input'
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <h5>Edit Password</h5>
      <Form.Control
        className='edit-password-input'
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button
        className='edit-username-submit-btn'
        variant='primary'
        type='button'
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </div>
  );
}