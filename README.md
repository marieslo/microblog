# React Microblog

A simple microblogging platform built with React. Users can register, log in, create tweets, and manage profiles. The app features infinite scrolling, user authentication, and a responsive design.

## Technologies Used

- **React**: For building user interfaces.
- **React Router**: For routing.
- **Bootstrap**: For responsive UI.
- **React Infinite Scroll Component**: For infinite scrolling in the tweet feed.
- **UUID**: For generating unique IDs.
- **Moment**: For date formatting.
- **Vite**: For fast development.
- **ESLint**: For linting.

## Features

- **User Authentication**: Register, log in, and update profiles.
- **Tweet Feed**: Infinite scrolling for tweets.
- **Profile Management**: Edit username and password.
- **Tweet Creation**: Create and display new tweets.
- **Responsive Design**: Works on mobile and desktop.

## Interface Screenshots

| Page           | Screenshot                                               |
|----------------|----------------------------------------------------------|
| **Home Page**  | ![Home Page](https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/815622e1-fd41-43be-a187-bd051a612cfd) |
| **Profile Page** | ![Profile Page](https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/ee72ed1a-b9c8-499a-9d28-1b7c6d2b9da4) |
| **Signup Page**  | ![Signup Page](https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/7d4001a5-1a6a-43c1-a916-b73d55399ee5) |
| **Login Page**   | ![Login Page](https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/ea0b4cc1-c4fb-42cc-ae92-8dce59fe4e71) |

*Click on the image to view it in full size.*

## Folder Structure

### Components

- **App**: Handles routing and global tweet state.
- **CreateTweet**: Manages tweet creation.
- **EditProfileForm**: For editing user profile.
- **NavBar**: Navigation and logout.
- **TweetFeed**: Displays tweets with infinite scroll.

### Pages

- **HomePage**: Displays tweets and tweet creation.
- **LoginPage**: Handles user login.
- **ProfilePage**: Edit user profile.
- **SignupPage**: Handles user registration.

### Lib

- **TweetProvider**: Context for tweet data.
- **useAuth**: Custom hook for authentication.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-repo/react-microblog.git
cd react-microblog
npm install
