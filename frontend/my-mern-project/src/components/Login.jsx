import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:5000/user/login", {username,password});
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } catch (error) {
      setMessage("error.response");
    }
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[30%] bg-[#e4c3bd]  rounded-[30px] px-12 py-16">
          <div className="flex justify-center">
            <FaUser size={35} />
          </div>
          <h1 className="w-full text-center text-[2.1rem] mt-4 leading-none tracking-tighter font-semibold text-zinc-700">
            Welcome To mySocialApp
          </h1>
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              className="block border-2 border-zinc-400 rounded-md w-full px-3 py-2 mt-4"
              name="username"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              className="block border-2 border-zinc-400 rounded-md w-full px-3 py-2 mt-4 capitalize"
              name="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <a
              href="#"
              className="mt-2 text-zinc-600 inline-block capitalize font-semibold"
            >
              forgotten password ?
            </a>
            <button
              className="block border-2 w-full px-3 py-2 bg-red-600 text-white rounded-full mt-4"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="text-md leading-[1.3rem] mt-5 text-center">
            By continuing, you agree to mySocialApp's
            <strong> Terms and Conditions</strong> and acknowledge you've read
            our Privacy Policy Notice at collection
          </p>
          <div className="w-full mt-2 text-zinc-700 text-base text-center">
            Not On mySocialApp ?? &nbsp;
            <a href="/" className="font-semibold">
              SignUp
            </a>
          </div>
        </div>
        <div>
          <h4 className="mt-3 text-3xl font-semibold capitalize">{JSON.stringify(message)}</h4>
        </div>
      </div>
    </>
  );
};

export default Login;
