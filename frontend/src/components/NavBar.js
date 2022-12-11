import React, { useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logoutUser } from "../actions/userAction";
import { logoutSeller } from "../actions/sellerAction";

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const sellerState = useSelector((state) => state.loginSellerReducer)
  const { currentSeller } = sellerState
  // console.log("current user", currentUser)
  useEffect(() => {
    window.scrollTo(0,0)
  },[location])
  useLayoutEffect(()=>{
    if(currentUser){
      const rid = currentUser.rid
      const email1 = currentUser.email1
      const user = {rid,email1}
      dispatch(getUserDetails(user))
    }
  },[location,currentUser,dispatch])
  return (
    <div>
      <div className="sm:bg-gray-800">
        <div className="container sm:flex hidden">
          <div className="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
            <span className="text-white">
              <i className="fas- fa-bars"></i>
            </span>
            <span className="ml-2 text-white capitalize">Categories</span>
            <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed hidden group-hover:block opacity-0 group-hover:opacity-100 transition group-hover:duration-500 invisible group-hover:visible">
              <a
                href="/shop"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="/images/1.png"
                  alt="Medicine Category"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm"> Medicine</span>
              </a>
              <Link
                to="/shop"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="/images/1.png"
                  alt="Tools Category"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm"> Syrup</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between flex-grow pl-12">
            <div className="flex items-center space-x-6 capitalize">
              <Link
                to="/"
                className="text-gray-200 hover:text-white transition"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-200 hover:text-white transition"
              >
                Shop
              </Link>
              <Link
                to="/aboutus"
                className="text-gray-200 hidden md:block hover:text-white transition"
              >
                About Us
              </Link>
              <Link
                to="/brand"
                className="text-gray-200 hover:text-white transition"
              >
                Brand
              </Link>
              <Link
                to="/salt"
                className="text-gray-200 hover:text-white transition"
              >
                Salt
              </Link>
              <Link
                to="/points"
                className="text-gray-200 hover:text-white hidden md:block transition"
              >
                Points
              </Link>
              <Link
                to="/offer"
                className="text-gray-200 hover:text-white hidden md:block transition"
              >
                Daily Offer
              </Link>
              <Link
                to="/contactus"
                className="text-gray-200 hover:text-white hidden md:block transition"
              >
                Contact Us
              </Link>
            </div>
            {currentUser ? (
              <div className="ml-2">
                <div className="px-8 py-4 bg-secondary flex items-center cursor-pointer relative group">
                  <span className="text-white">
                    <i className="fas- fa-bars"></i>
                  </span>
                  <span className="ml-2 text-white capitalize">
                    Hello {currentUser.name}
                  </span>
                  <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed hidden group-hover:block opacity-0 group-hover:opacity-100 transition group-hover:duration-500 invisible group-hover:visible">
                    <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                      <span className="ml-6 text-gray-600 text-sm">Wallet: {currentUser && currentUser?.wallet}</span>
                    </div>
                    <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                      <span className="ml-6 text-gray-600 text-sm">Due Balance: {currentUser && currentUser?.balance}</span>
                    </div>
                    <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                      <span className="ml-6 text-gray-600 text-sm">Points: {currentUser && currentUser?.points}</span>
                    </div>
                    <Link
                      to="/myorder"
                      className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                      <span className="ml-6 text-gray-600 text-sm">Order</span>
                    </Link>
                    <Link
                      to="#"
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                      className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                      <span className="ml-6 text-gray-600 text-sm">
                        {" "}
                        Sign Out
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : 
              currentSeller !== null || undefined || "" ? (
              <div className="ml-2">
                <div className="px-8 py-4 bg-secondary flex items-center cursor-pointer relative group">
                  <span className="text-white">
                    <i className="fas- fa-bars"></i>
                  </span>
                  <span className="ml-2 text-white capitalize">
                    Hello {currentSeller.name}
                  </span>
                  <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed hidden group-hover:block opacity-0 group-hover:opacity-100 transition group-hover:duration-500 invisible group-hover:visible">
                    <Link
                      to="/myorder"
                      className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                      <span className="ml-6 text-gray-600 text-sm">Order</span>
                    </Link>
                    <Link
                      to="#"
                      onClick={() => {
                        dispatch(logoutSeller());
                      }}
                      className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                      <span className="ml-6 text-gray-600 text-sm">
                        {" "}
                        Sign Out
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              ):
              (
              <div className="ml-4">
                <Link
                  to="/login"
                  className="text-gray-200 hover:text-white transition"
                >
                  Login/Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
