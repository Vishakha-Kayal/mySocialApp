import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Register from './components/Register';

import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import Comment from "./components/Comment";
import Profile from "./components/Profile";
import EditPost from "./components/EditPost";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/'; // Redirect to home page after logout
  };
  const router = createBrowserRouter([
    {
      path:'/',
      element:(
        <>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
        <Posts/>
        </>
      ),
    },
    {
      path:'/profile',
      element:(
        <>
        <Profile/>
        </>
      ),
    },
    {
      path:'/register',
      element:(
        <>
        <Register/>
        </>
      ),
    },
    {
      path:'/login',
      element:(
        <>
        <Login/>
        </>
      ),
    },
    {
      path:'/CreatePost',
      element:(
        <>
        <CreatePost/>
        </>
      ),
    },
    {
      path:'/Comment/:postId',
      element:(
        <>
        <Comment/>
        </>
      ),
    },
    {
      path: '/editPost/:postId',
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <EditPost />
        </>
      ),
    },

  ])
  return <RouterProvider router={router} />;
}

export default App;
