# Scrol - Client

Scrol is a full-stack social media application that offers a minimal and clean UI with features such as dark and light mode switching. This repository contains the frontend codebase of Scrol, built using React, Recoil, and Tailwind CSS.

## Features

- **Authentication**: Register, login, and logout functionality.
- **User Interaction**: Search for users, create posts (with or without images), like posts, and comment on posts.
- **Home Feed**: View a paginated feed of posts from all users.
- **User Profiles**: View and interact with other users' profiles, send friend requests, and view their posts.
- **Personal Profile**: View your own posts, check and manage friend requests, and edit your profile details (username, first name, last name, avatar, etc.).
- **Dark/Light Mode**: Toggle between dark and light themes.
- **Responsive Design**: Fully responsive design for all screen sizes.
- **State Management**: Recoil is used for efficient state management across the app.
- **Routing**: Proper routing is implemented using protected and public routes to ensure secure navigation.

## Tech Stack

- **React**: Frontend library for building user interfaces.
- **Recoil**: State management for React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router**: Declarative routing for React applications.

### The backend repository can be found at https://github.com/abhirag2603/Scrol-server


### Screenshots are at the end of readme.md


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/abhirag2603/scrol-client.git
```


Navigate to the project directory:

```bash
cd scrol-client
```

Install the dependencies:

```bash
npm install
```

or

```bash
yarn install
```

Running the Application
Start the development server:

```bash
npm start
```

or

```bash
yarn start
```

Open your browser and visit http://localhost:3000 to see the application in action.

Build
To create a production-ready build:

```bash
npm run build
```

or

```bash
Copy code
yarn build
```

Environment Variables
Create a .env file in the root of the project and add your environment variables. Here is an example:


```Copy code
REACT_APP_API_URL=http://localhost:5000/api
```

License
This project is licensed under the MIT License.

## Screenshots

## Homepage 
![home](SS_home_dark.png)
