import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserFromToken } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const userData = getUserFromToken(token);
      setUser(userData);
      fetchUserPosts(userData._id);
    }
  }, [token]);

  const fetchUserPosts = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/userPosts/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setPosts(response.data.posts || []); // Ensure posts is an array
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/editPost/${postId}`);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/deletePost/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center">
        Welcome to your Dashboard, {user?.username}
      </h1>
      <h3 className="text-xl font-medium mb-4">Your Posts</h3>
      <div className="w-full px-2 py-1 flex gap-4">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <div className="flex justify-center flex-col w-[20%] bg-[#e4c3bd] rounded-xl px-3 py-3" key={i}>
              <h2 className="mb-2 text-2xl font-bold ">{post.title}</h2>
              <p className="mb-4 text-sm leading-6 capitalize text-justify">{post.content}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => handleEdit(post._id)} className="font-semibold text-lg hover:text-[#BA7264]">Edit</button>
                <button onClick={() => handleDelete(post._id)} className="font-semibold text-lg hover:text-[#BA7264]">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;