import '../styles/style_pages/HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from 'react-bootstrap/Spinner';
import CreateTweet from '../components/CreateTweet';
import TweetFeed from '../components/TweetFeed';
import { useTweetContext } from '../lib/TweetProvider';
import { useAuth } from '../lib/AuthProvider';

export default function HomePage() {
  const { 
    tweets, 
    handleCreateTweet, 
    handleIntersection, 
    error, 
    loading, 
    hasMoreTweets, 
    showLoadingSpinner 
  } = useTweetContext();

  const { isAuthenticated, user } = useAuth();

  const [showAllTweets, setShowAllTweets] = useState(true);
  const [updatedUsername, setUpdatedUsername] = useState('');

  useEffect(() => {
    setUpdatedUsername(user.username);
  }, [user]);

  const handleIntersectionWithLoading = () => {
    showLoadingSpinner();
    handleIntersection();
  };

  return (
    <div>
      {isAuthenticated() && (
        <CreateTweet 
          onCreateTweet={handleCreateTweet} 
          updatedUsername={updatedUsername} 
        />
      )}
      <div className="toggle-tweets-container">
        <button
          className={`toggle-tweets-button ${showAllTweets ? 'all-tweets' : 'my-tweets'}`}
          onClick={() => setShowAllTweets((prevShowAllTweets) => !prevShowAllTweets)}
        >
          {showAllTweets ? 'All Tweets' : 'My Tweets'}
        </button>
      </div>
      <InfiniteScroll
        dataLength={tweets.length}
        next={handleIntersectionWithLoading}
        hasMore={hasMoreTweets}
        loader={loading && <Spinner animation="grow" variant="light" role="status" />}
        endMessage={<div className="no-unread-tweets">You've read all tweets</div>}
      >
        <TweetFeed tweets={tweets} showAllTweets={showAllTweets} user={user} />
      </InfiniteScroll>
      {error && <div>Error: {error}</div>}
    </div>
  );
}