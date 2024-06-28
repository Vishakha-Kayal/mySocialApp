import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated ,onLogout }) => {
  return (
    <div className="w-[90%] px-8 py-3 flex justify-between bg-[#e4c3bd] gap-10 m-auto mt-4">
      <h2 className="text-3xl font-semibold">MySocialApp</h2>
      <div className="flex gap-5 text-xl">
        {isAuthenticated ? (
          <>
            <Link to="/profile"><button className="w-36 h-[7vh] rounded-md text-white bg-[#BA7264] point-cursor hover:bg-[#77463d] transition-all duration-150 ease-in-out">Profile</button></Link>
            <Link to="/logout"><button className="w-36 h-[7vh] rounded-md border-[3px] border-[#BA7264] point-cursor hover:text-white hover:bg-[#77463d] transition-all duration-150 ease-in-out" onClick={onLogout}>Logout</button></Link>
          </>
        ) : (
          <>
            <Link to="/register"><button className="w-36 h-[7vh] rounded-md text-white bg-[#BA7264] point-cursor hover:bg-[#77463d] transition-all duration-150 ease-in-out">SignUp</button></Link>
            <Link to="/login"><button className="w-36 h-[7vh] rounded-md border-[3px] border-[#BA7264] point-cursor hover:text-white hover:bg-[#77463d] transition-all duration-150 ease-in-out">Login</button></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;