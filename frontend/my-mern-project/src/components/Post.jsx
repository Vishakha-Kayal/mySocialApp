import React, { useState ,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Post = ({ data }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 
  const [count,setCount] =  useState(0);
  useEffect(() => {
    setCount(data.comments.length);
  }, [data.comments]);
  const checkAuthenticated = async () => {
    if (!token) {
      navigate("/register");
      return;
    } else {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/like`,
        { postId: data._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.location.href = "/";
    }
  };
  const isAuthenticateToComment = () => {
    if (!token) {
      navigate("/register");
      return;
    }
  };
  return (
    <div className="w-[26%] bg-[#f6ecea] rounded-lg px-2 py-2 flex flex-col justify-center">
      <p className="tracking-tighter font-semibold mb-2 text-base">Created by @ {data['author'].username}</p>
      <h2 className="w-full mb-4 text-2xl text-center font-bold uppercase">{data.title}</h2>
      <p className="w-full mb-4 text-md leading-6 capitalize px-2">{data.content}</p>
      <div className="flex justify-between">
        <h3
          className="text-lg text-[#643f38] font-semibold cursor-pointer hover:text-[#ba7264] transition-all duration-150 ease-in-out"
          onClick={() => {
            checkAuthenticated();
          }}
        >
          {data.likes != "" ? "Liked👍" : "Like"}
        </h3>
        <h3
          className="text-lg text-[#643f38] font-semibold cursor-pointer hover:text-[#ba7264] transition-all duration-150 ease-in-out"
          onClick={isAuthenticateToComment}
        >
          <Link to={`/Comment/${data._id}`}>Add a Comment</Link>
        </h3>
      </div>
      <div className="w-full border-t-[3px] mt-2 border-[#d3a096]">
        <h3 className="mb-1 px-1 font-semibold">{count} Comments</h3>
        <div className="w-full flex flex-col gap-2">
          {data.comments.length!=0
            ? data["comments"].map((comment,i) => (
                  <div className="w-full h-full flex " key={i}>
                    <h1 className="text-sm font-semibold pl-2">
                      @{comment["author"].username} - 
                    </h1>
                    <h1 className="text-sm pb-2 pl-2">{comment.comment}</h1>
                  </div>

              ))
            : "No comments yet"}
        </div>
      </div>
    </div>
  );
};

export default Post;
