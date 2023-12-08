import '../styles/style_components/CreateTweet.css';
import { v4 as uuidv4 } from 'uuid'; 
import moment from 'moment'; 
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../lib/AuthProvider';
import { useTweetContext } from '../lib/TweetProvider';

export default function CreateTweet({ onCreateTweet, updatedUsername }) {
  const { user } = useAuth();
  const { username, setUpdatedUsername } = useTweetContext();
  const [tweetText, setTweetText] = useState('');
  const [show, setShow] = useState(false);
  const [showAllTweets, setShowAllTweets] = useState(true);

  useEffect(() => {
    if (user) {
      setUpdatedUsername(user.username);
    }
  }, [user, setUpdatedUsername]);

  const handleCreateTweet = () => {
    const newTweet = {
      id: uuidv4(),
      date: moment().format(),
      text: tweetText,
      username: updatedUsername || username,
    };

    onCreateTweet(newTweet);
    setTweetText('');
  };

  const handleTweetChange = (e) => {
    if (e.target.value.length <= 140) {
      setTweetText(e.target.value);
    } else {
      setShow(true);
    }
  };

  const handleCreateClick = () => {
    if (tweetText.trim() === '') {
      alert("Oops, you can't post empty tweets. Don't be shy, let's chat a little");
      return;
    }
    if (tweetText.length > 140) {
      setShow(true);
      return;
    }
    handleCreateTweet();
  };

  const handleModalHide = () => {
    setShow(false);
  };

  return (
    <div className='create-tweet-container'>
      <textarea
        className='create-tweet-input'
        value={tweetText}
        onChange={handleTweetChange}
        placeholder={`What you have in mind, ${updatedUsername || username}?`}
      />

      <Button
        className='create-tweet-btn'
        variant='primary'
        type='submit'
        onClick={handleCreateClick}
        disabled={!updatedUsername || username}
      >
        Tweet
      </Button>

      <Modal
        className='modal-alert-tweet-more-140'
        show={show}
        onHide={handleModalHide}
      >
        The tweet can't contain more than 140 characters.
      </Modal>
    </div>
  );
}