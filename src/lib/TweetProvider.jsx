import React, { createContext, useContext, useState, useEffect } from 'react';
import _ from 'lodash';

const TweetContext = createContext();

export default function TweetProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMoreTweets, setHasMoreTweets] = useState(true);
  const [page, setPage] = useState(1);
  const [tweetCount, setTweetCount] = useState(0);
  const [endMessage, setEndMessage] = useState(null);
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId || '';
  });
  const [username, setUsername] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');

  const showLoadingSpinner = () => setLoading(true);
  
  const hideLoadingSpinner = () => setLoading(false);
  
  const setEndMessageText = (text) => setEndMessage(text);

  const endPointMockAPI = 'https://6557800dbd4bcef8b612c361.mockapi.io/tweets';

  const addTweet = (newTweet) => {
    setTweets((prevTweets) => [...prevTweets, newTweet]);
    setTweetCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const fetchInitialTweetCount = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId || '');

        const response = await fetch(endPointMockAPI, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Error fetching initial tweet count');
        }

        const initialTweets = await response.json();
        setTweetCount(initialTweets.length);
      } catch (error) {
        console.error('Error in fetching initial tweet count:', error);
      }
    };

    fetchInitialTweetCount();
  }, []);

  const createTweetWithTimestamp = (newTweet) => {
    const timestamp = new Date().toISOString();

    return {
      ...newTweet,
      timeofpost: timestamp,
      userId,
    };
  };

  const handleCreateTweet = async (newTweet) => {
    const tweetWithTimestamp = createTweetWithTimestamp(newTweet);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endPointMockAPI, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(tweetWithTimestamp),
      });

      if (!response.ok) {
        throw new Error('Tweet is not added to the server');
      }

      const data = await response.json();
      const updatedTweet = { ...data, userId: userId };

      setTweets((prevTweets) => [updatedTweet, ...prevTweets]);
      setTweetCount((prevCount) => prevCount + 1);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError('Error adding tweet. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchTweets = async () => {
    try {
      const url = new URL(endPointMockAPI);
      url.searchParams.append('sortBy', 'timeofpost');
      url.searchParams.append('order', 'desc');
      url.searchParams.append('completed', 'false');
      url.searchParams.append('page', page);
      url.searchParams.append('limit', '10');

      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      });

      if (!response.ok) {
        handleFetchTweetsError(response.status);
        return;
      }

      const newTweets = await response.json();
      handleFetchTweetsSuccess(newTweets);
    } catch (error) {
      console.error('Error in fetching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchTweetsError = (status) => {
    if (status === 429) {
      setTimeout(handleFetchTweets, 500);
    } else {
      throw new Error('Response is not ok');
    }
  };

  const handleFetchTweetsSuccess = (newTweets) => {
    if (newTweets.length === 0) {
      setHasMoreTweets(false);
    } else {
      setTweets((prevTweets) => [...prevTweets, ...newTweets]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const getTweets = _.debounce(() => {
    handleFetchTweets();
  }, 300);

  useEffect(() => {
    getTweets();
  }, []);

  const handleIntersection = () => {
    getTweets();
  };

  const handleUpdateUserId = (newUserId) => {
    console.log('Updating user ID:', newUserId);
    setUserId(newUserId);
    localStorage.setItem('userId', newUserId);
    setTweets((prevTweets) =>
      prevTweets.map((tweet) => ({ ...tweet, userId: newUserId }))
    );
  };

  const handleUpdateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const value = {
    username,
    setUsername,
    tweets,
    userId,
    loading,
    error,
    hasMoreTweets,
    page,
    addTweet,
    handleCreateTweet,
    getTweets,
    handleIntersection,
    handleUpdateUserId,
    handleUpdateUsername,
    endMessage,
    showLoadingSpinner,
    hideLoadingSpinner,
    setEndMessageText,
    tweetCount,
    updatedUsername,
    setUpdatedUsername, 
  };

  return <TweetContext.Provider value={value}>{children}</TweetContext.Provider>;
}

export const useTweetContext = () => useContext(TweetContext)