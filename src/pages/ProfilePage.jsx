import '../styles/style_pages/ProfilePage.css';
import React, { useEffect, useState } from 'react';
import EditProfileForm from '../components/EditProfileForm';
import { useAuth } from '../lib/AuthProvider';
import { useTweetContext } from '../lib/TweetProvider';

export default function ProfilePage() {
  const { user } = useAuth();
  const { username, setUsername } = useTweetContext();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.username) {
          const response = await fetch(`https://6557800dbd4bcef8b612c361.mockapi.io/users?search=${user.username}`);
          const fetchedUserData = await response.json();

          console.log('Fetched user data:', fetchedUserData);

          if (Array.isArray(fetchedUserData) && fetchedUserData.length > 0 && fetchedUserData[0].id) {
            setUserData(fetchedUserData[0]);
          } else {
            console.error('Invalid user data or user ID not defined:', fetchedUserData);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleUpdate = (updatedUser) => {
    if (updatedUser && updatedUser.id) {
      console.log('Updated User Data:', updatedUser);
      
      // Update the username in local storage
      const updatedUserData = { ...user, username: updatedUser.username };
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      
      // Update the username in the TweetContext
      setUsername(updatedUser.username);
    } else {
      console.error('Invalid updated user data or user ID not defined:', updatedUser);
    }
  };

  return (
    <div className='edit-profile-container'>
      {userData ? (
        <>
          <h1>Profile</h1>
          <EditProfileForm user={userData} onUpdate={handleUpdate} />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}