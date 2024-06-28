import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"

const Comment = () => {
  const { postId } = useParams(); // Get postId from URL params
  const token = localStorage.getItem("token"); 
  const [comment, setComment] = useState("")

  const storeComment = async (e) => {
   try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/comment`,
        { postId, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }
 
  return (
    <>
      <form onSubmit={storeComment}>
        <div className="w-[80%] mb-3 mt-4 ml-10">
          <input
            type="text"
            name="comment"
            id=""
            className="w-[38rem] bg-[#f2e9e2] border-b-[1px] border-black outline-none py-4 text-xl px-2"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => { setComment(e.target.value) }}
          />
        </div>
        <div className="w-[8%] h-11 bg-[#b2785d] rounded-2xl flex items-center justify-center point-cursor ml-10 cursor-pointer">
          <input
            type="submit"
            value="Comment"
            className="text-white font-semibold commentButton cursor-pointer"
          />
        </div>
      </form>
    </>
  );
};

export default Comment;
