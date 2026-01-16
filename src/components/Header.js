import React, { useContext, useState } from "react";
import Logo from "./Logo";
import ROLE from '../common/role';
import { GrSearch } from "react-icons/gr";
import { LuCircleUser } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";

function Header() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[900px] rounded-b-2xl z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* Logo Section */}
        <div>
          <Link to={"/"}>
          {/* <img src="" alt="My Image" /> */}
          
            <Logo w={90} h={50} />
          </Link>
        </div>

        {/* Search Bar for Large Screens */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input 
            type='text' 
            placeholder='search product here...' 
            className='w-full outline-none py-1 px-2' 
            onChange={handleSearch} 
            value={search}
          />
          <div className='text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        {/* Mobile Search Icon */}
        <div className="lg:hidden flex items-center gap-4">
          <Link to={"/search"} className="text-lg min-w-[40px] h-8 bg-black flex items-center justify-center rounded-full text-white">
            <GrSearch />
          </Link>
        </div>

        {/* User and Cart Section */}
        <div className="flex items-center gap-6">
          {/* User Profile and Menu */}
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <LuCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <div>
                      <Link
                        to={"/admin-panel/all-sellers"}
                        className="whitespace-nowrap block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        Admin Panel
                      </Link>
                      <Link
                        to={"/AdminProfilePage/AdminEditProfile"}
                        className="whitespace-nowrap block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        Profile
                      </Link>
                    </div>
                  )}
                  {user?.role === ROLE.SELLER && (
                    <Link
                      to={"/SellerProfilePage/SellerEditProfile"}
                      className="whitespace-nowrap block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Profile
                    </Link>
                  )}
                  {user?.role === ROLE.USER && (
                    <Link
                      to={"/UserProfilePage/UserEditProfile"}
                      className="whitespace-nowrap block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Profile
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {/* Cart Icon with Item Count */}
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <AiOutlineShoppingCart />
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {/* Login/Logout Button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-black hover:bg-black"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-black"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
