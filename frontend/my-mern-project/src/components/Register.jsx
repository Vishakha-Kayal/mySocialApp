import React,{useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

const Register = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [message, setMessage] = useState('');

    const handleOnSubmit = async (e) =>{
      try{
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/user/register", { username, email, password });
        setMessage("Account created successfully 😊");
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
        // console.log(response);
      }
      catch (error) {
        console.error(error);
        setMessage("Something Went Wrong")
      }
    }

  return (
    <>
      <div className="w-full h-screen bg-[#f6ecea] flex flex-col justify-center items-center">
        <div className="w-[30vw] bg-[#e4c3bd] rounded-[30px] px-16 py-5">
          <div className="flex justify-center">
            <FaUserPlus size={35} />
          </div>
          <h1 className="text-3xl text-center mt-4 leading-none tracking-tight font-semibold text-zinc-700">
            Create New Account
          </h1>
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              className="block border-2 border-zinc-400 rounded-md w-full px-3 py-2 mt-4"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange = {(e)=>{setUsername(e.target.value)}}
            />
            <input
              type="password"
              className="block border-2 border-zinc-400 rounded-md w-full px-3 py-2 mt-4 capitalize"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <input
              type="email"
              className="block border-2 border-zinc-400 rounded-md w-full px-3 py-2 mt-4"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="text-lg block border-2 w-full px-3 py-2 bg-[#BA7264] text-white rounded-full mt-5" type="submit">
              SignUp
            </button>
          </form>
          <p className="text-sm mx-auto mt-5 font-semibold">
            By continuing, you agree to Pinterest's
            <strong>Terms and Conditions</strong> and acknowledge you've read
            our Privacy Policy Notice at collection
          </p>
          <div className="w-full mt-2 opacity-2 text-base text-center">
            Already signed On Pinterest ?? &nbsp;
            <Link to="/login" className="font-bold">
               LogIn
            </Link>
          </div>
        </div>
        <div className={`mt-3 text-3xl capitalize font-semibold ${message!="Something Went Wrong"?'text-green-800':'text-red-700'} `}>
            {message}
        </div>
      </div>

    </>
  );
};

export default Register;
