import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/post/${postId}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/editPost/${postId}`, { title, content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/profile');
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="w-[90%] m-auto py-1">
      <h1 className="text-2xl font-medium mb-4 mt-4">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mb-3">
          <label className="text-lg w-[4.3rem]">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-1 px-2 outline-none"
          />
        </div>
        <div className="flex gap-3 mb-3">
          <label className="text-lg">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="py-1 px-2 outline-none"
          />
        </div>
        <button type="submit" className="bg-[#e8a397] mt-3 px-5 py-2 rounded-xl">Edit</button>
      </form>
    </div>
  );
};

export default EditPost;