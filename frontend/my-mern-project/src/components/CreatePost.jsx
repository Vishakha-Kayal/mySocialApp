import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        setMessage("Unauthorized: No token found");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/addPost`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href='/';
    } catch (error) {
      console.error(error);
      setMessage("Failed to create post. " + error.response.data.error);
    }
  };

  return (
    <>
      <div className="ml-12 px-8 w-[30%] py-6 bg-[#e4c3bd] rounded-lg mt-4">
        <h2 className="text-2xl text-[#643f38]">Create a new Post</h2>

        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="title"
            className="block mt-3 px-3 py-2 w-full rounded-md text-black"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            type="text"
            className="block mt-3 px-3 py-2 w-full rounded-md h-40 text-black"
            name="description"
            placeholder="Description"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <input
            type="submit"
            className="block mt-3 px-3 py-2 w-full rounded-md bg-[#BA7264] text-white font-semibold text-xl cursor-pointer"
            value="Create Post"
          />
        </form>
      </div>
    </>
  );
};

export default CreatePost;
