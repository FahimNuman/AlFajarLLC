import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaBarsStaggered, FaRegCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GiBeachBag } from "react-icons/gi";
import { TbArrowNarrowRight } from "react-icons/tb";
import { ShopContext } from "../context/ShopContext";
import logo from "/src/assets/logo.png";
import { useGetCarts } from "../service/cart";
import { useUser } from "../services/userService";

const Header = () => {
  const { userId } = useUser();
  const { setShowSearch, getCartCount, token, setToken } =
    useContext(ShopContext);
  const { data: cartList } = useGetCarts(userId);
  const [menuOpened, setMenuOpened] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpened((prev) => !prev);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <header className="py-5 w-full bg-white">
      <div className="max-padd-container flex justify-between items-center">
        {/* Logo for smaller screens */}
        <Link
          to="/"
          className="bold-24 flex-1 xl:hidden flex items-center gap-2"
          aria-label="Risikder Corporation Home"
        >
          <img src={logo} alt="Risikder Logo" className="h-5 w-auto" />
          <span className="font-medium text-gray-800 text-base">
          Alfajor LLC
          </span>
        </Link>

        {/* Navbar */}
        <div className="flex-1">
          <Navbar
            menuOpened={menuOpened}
            toggleMenu={toggleMenu}
            containerStyles={`${
              menuOpened
                ? "flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-white z-50 px-10 shadow-xl"
                : "hidden xl:flex gap-x-5 xl:gap-8 medium-15 rounded-full px-2 py-1"
            }`}
          />
        </div>

        {/* Logo for larger screens */}
        <Link
  to="/"
  className="bold-24 flex-1 hidden xl:flex items-center justify-start"
  aria-label="Risikder Corporation Home"
>
  {/* <img src={logo} alt="Risikder Logo" className="h-5 w-auto mr-2" /> */}
  <span className="text-red-500 font-medium text-base">Alfajor LLC</span>
</Link>

        {/* Right-Side Icons */}
        <div className="flex items-center gap-x-2 xs:gap-8">
          {/* Hamburger Icon */}
          {!menuOpened && (
            <FaBarsStaggered
              onClick={toggleMenu}
              className="xl:hidden cursor-pointer text-2xl"
              aria-label="Open Menu"
              role="button"
            />
          )}
          {/* Search Icon */}
          <FaSearch
            onClick={() => setShowSearch((prev) => !prev)}
            className="text-xl cursor-pointer"
            aria-label="Search"
            role="button"
          />

          {/* Cart Icon */}
          <Link to="/cart" className="flex relative" aria-label="Cart">
            <GiBeachBag className="text-[25px]" />
            <span className="bg-secondary text-white medium-14 absolute right-0.5 -top-3 flex justify-center items-center w-5 h-5 rounded-full shadow-inner">
              {cartList?.carts?.length || 0}
            </span>
          </Link>

          {/* User Account */}
          <div className="group relative">
            <FaRegCircleUser
              onClick={() => !token && navigate("/login")}
              className="text-2xl cursor-pointer"
              aria-label="User Account"
              role="button"
            />
            {token && (
              <ul className="bg-white shadow-sm p-3 w-32 ring-1 ring-slate-900/15 rounded absolute right-0 hidden group-hover:flex flex-col">
                <li
                  onClick={() => navigate("/orders")}
                  className="flex justify-between cursor-pointer"
                >
                  <p>Orders</p>
                  <TbArrowNarrowRight className="text-[19px] opacity-50" />
                </li>
                <hr className="my-2" />
                <li
                  onClick={logout}
                  className="flex justify-between cursor-pointer"
                >
                  <p>Logout</p>
                  <TbArrowNarrowRight className="text-[19px] opacity-50" />
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;