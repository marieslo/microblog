# React Microblog

A simple microblogging platform built with React, allowing users to register, log in, create tweets, and manage their profiles. The application leverages modern frontend technologies and provides a seamless user experience through components like infinite scrolling, authentication, and more.

## Technologies Used

This project is built using the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling client-side routing.
- **Bootstrap**: For responsive and sleek UI design.
- **React Bootstrap**: Bootstrap components built for React.
- **React Infinite Scroll Component**: To implement infinite scrolling for the tweet feed.
- **UUID**: For generating unique identifiers for tweets and users.
- **Moment**: For date-time formatting.
- **Vite**: A build tool for faster development with hot-reloading.
- **ESLint**: Linting for ensuring code quality.
- **React Hooks**: Used throughout the project for managing component state and side effects.
- **React Context API**: For managing tweet-related and authentication state across the app.

## Features

- **User Authentication**: Allows users to register, log in, and update their profiles.
- **Tweet Feed**: Infinite scrolling feature to display tweets dynamically.
- **Profile Management**: Users can edit their profile information, such as username and password.
- **Tweet Creation**: Users can create new tweets, and they are displayed in the tweet feed.
- **Responsive Design**: The app is built to work on both mobile and desktop devices.

## Interface Screenshots

- **Home Page**  
  ![Home Page](https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/815622e1-fd41-43be-a187-bd051a612cfd)

- **Profile Page**  
  ![Profile Page](https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/ee72ed1a-b9c8-499a-9d28-1b7c6d2b9da4)

- **Signup Page**  
  ![Signup Page](https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/7d4001a5-1a6a-43c1-a916-b73d55399ee5)

- **Login Page**  
  ![Login Page](https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/ea0b4cc1-c4fb-42cc-ae92-8dce59fe4e71)

## Folder Structure

### Components

- **App**: 
  - Integrates with React Router for handling navigation and routing.
  - Wraps the application with the TweetProvider context provider to manage tweet-related data.
  
- **CreateTweet**:
  - Manages tweet creation using a form and state.
  
- **EditProfileForm**:
  - Handles the profile edit form, including state management for user data.
  
- **NavBar**:
  - Displays the navigation bar and user logout functionality.
  
- **TweetFeed**:
  - Renders a list of tweets with infinite scrolling.

### Pages

- **HomePage**:
  - Displays a feed of tweets and the tweet creation form.
  
- **LoginPage**:
  - User login functionality.
  
- **ProfilePage**:
  - Displays and allows the user to edit their profile.
  
- **SignupPage**:
  - Handles user registration.

### Lib

- **TweetProvider**:
  - Context provider to manage tweet data across the app.
  
- **useAuth**:
  - A custom hook for handling authentication functionalities like login, logout, and user profile updates.

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-repo/react-microblog.git
cd react-microblog
npm install
npm run dev