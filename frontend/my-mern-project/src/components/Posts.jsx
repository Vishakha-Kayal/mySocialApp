import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const FetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/allPosts`);
        console.log(response.data);
         // Ensure response.data.posts is an array
        if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    FetchPosts();
  }, []);

  return (
    <div className="w-[90%] h-[84vh] px-8 py-3 mt-8 flex flex-col justify-start bg-[#e4c3bd] gap-5 m-auto">
      <h2 className="cursor-pointer text-2xl underline underline-offset-4 text-[#77463d] hover:text-black">
        <Link to="/CreatePost">Create A New Post</Link>
      </h2>
      <div>
        <h2 className="text-xl font-semibold tracking-widest">All Posts</h2>
      </div>
      <div className="w-full flex flex-wrap gap-2 py-3">
      {posts.length > 0 ? (
          posts.map((post, i) => (
            <Post data={post} key={i} />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
