import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom';
import TweetProvider from './lib/TweetProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <TweetProvider>
        <App />
      </TweetProvider>
    </React.StrictMode>
  </Router>
);