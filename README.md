# React Project MICROBLOG

## INTERFACE:

Home Page\
<img width="600" alt="Home Page" src="https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/815622e1-fd41-43be-a187-bd051a612cfd">

Profile Page\
<img width="600" alt="Profile Page" src="https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/ee72ed1a-b9c8-499a-9d28-1b7c6d2b9da4">

Signup Page\
<img width="600" alt="Signup Page" src="https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/7d4001a5-1a6a-43c1-a916-b73d55399ee5">

Login Page\
<img width="600" alt="Login Page" src="https://github.com/israeltechchallenge/react-microblog-marieslo/assets/110108878/ea0b4cc1-c4fb-42cc-ae92-8dce59fe4e71">

____________________________________________________________________

## COMPONENTS' STRUCTURE:

•	App 

        Integrates with React Router for handling navigation and routing.

        Wraps the application with the TweetProvider context provider to manage tweet-related data.

____________________________________________________________________

### Folder "components":

•	CreateTweet

        Component responsible for creating new tweets.

        Utilizes the useTweetContext hook to access tweet-related context and functionalities.
        Uses the uuid library to generate a unique identifier for each new tweet.
        Manages the state of the tweet text and interacts with the main application to create new tweets.



•	EditProfileForm 

        Component for editing user profile information.

        Uses the useState hook to manage state (newUsername, newPassword, loading, error, successMessage).
        Communicates with the main application to update user profile information.


•	NavBar 

        Represents the navigation bar of the application.

        Uses the useAuth and useTweetContext hooks to access authentication and tweet-related data.
        Handles user logout through the handleLogout function.

•	TweetFeed 

        Component responsible for rendering a feed of tweets.

        Uses the useTweetContext hook to access tweet-related data and functionalities.
        Maps through the list of tweets and renders individual Tweet components.

____________________________________________________________________

### Folder "pages": 

•	HomePage 

        Represents the home page of application where tweets are displayed.

        Uses the CreateTweet component for allowing users to create new tweets.
        Implements infinite scrolling with the help of the React Infinite Scroll Component for loading more tweets as the user scrolls.
        Displays the TweetFeed component to render the list of tweets.


•	LoginPage 

        Component for user login.

        Uses the useAuth hook to access authentication-related functionalities.
        Uses the fetch API to authenticate users based on their entered credentials.

•	ProfilePage 

        Represents the user profile page.

        Uses the useAuth hook to access authentication-related functionalities.
        Uses the EditProfileForm component for editing user profile information.

•	SignupPage 

        Component for user registration and signup.

        Uses the useAuth hook to access authentication-related functionalities.
        Utilizes the uuid library to generate a unique identifier for the user during signup.

____________________________________________________________________

### Folder "lib":

        The TweetProvider context provider plays a crucial role in managing tweet-related data and functions, making them accessible to various components throughout the application. 
        The use of React Router facilitates navigation between different pages, providing a seamless user experience. 

        The authentication-related functionalities are handled using the useAuth hook.
