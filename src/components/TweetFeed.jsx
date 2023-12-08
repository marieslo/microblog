import "../styles/style_components/TweetFeed.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { useTweetContext } from "../lib/TweetProvider";

const Tweet = ({ id, username, date, text }) => (
  <div key={id} className="tweet-container">
    <div id="wrapper-tweetusername-and-tweet-date">
      <div className="tweet-username">{username}</div>
      {date && <div className="tweet-date">{date}</div>}
    </div>
    <div className="tweet-text">{text}</div>
  </div>
);

export default function TweetFeed({ tweets, showAllTweets }) {
  const { username: userUsername } = useTweetContext();

  return (
    <Container>
      <Stack gap={3}>
        {tweets
          .filter((tweet) =>
            showAllTweets ? true : tweet.username === userUsername
          )
          .map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
          ))}
      </Stack>
    </Container>
  );
}