import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAddressCard, FaCreditCard, FaGift, FaHeart, FaHouseUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import Breakcrumb from "../components/Breakcrumb";
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions/userAction";

const AdminAccount = () => {
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      localStorage.getItem("currentUser") === null ||
      currentUser.isAdmin !== true
    ) {
      return window.location.href = "/";
    } 
  }, [currentUser]);

  return (
    <div>
      <Breakcrumb id={"Admin Panel"} />
      <div className="container md:grid grid-cols-12 items-start pt-4 gap-6 pb-16">
        <div className="col-span-3">
          <div className="px-4 py-3 shadow flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src="/images/1.png"
                alt="Medicine Point- Medicine Wholeseller in Noida..!"
                className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover "
              />
            </div>
            <div className="flex-grow">
              <p className="text-gray-600">Hello,</p>
              <h4 className="text-gray-400 font-medium">Admin</h4>
            </div>
          </div>
          <div className="mt-6 divide-gray-200 space-y-4 text-gray-600 divide-y bg-white shadow rounded p-4">
            <div className="space-y-1 pl-8">
              <Link
                to="/admin"
                className="relative text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <FaHouseUser />
                </span>
                Admin Page
              </Link>
            </div>
            <div className="space-y-1 pl-8 pt-4">
              <Link
                to="manageaccount"
                className="relative text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <FaAddressCard />
                </span>
                Manage Accounts
              </Link>
            </div>
            <div className="pt-4 space-y-1 pl-8">
              <Link
                to="orderlist"
                className="relative hover:text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <FaGift />
                </span>
                User Orders History
              </Link>
            </div>
            <div className="pt-4 space-y-1 pl-8">
              <Link
                to="medicinelist"
                className="relative hover:text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <FaCreditCard />
                </span>
                Product Details
              </Link>
            </div>
            <div className="pt-4 space-y-1 pl-8">
              <button
                href="#"
                className="relative hover:text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <FaHeart />
                </span>
                Admin Account
              </button>
            </div>
            <div className="pt-4 space-y-1 pl-8">
              <button
                onClick={()=>dispatch(logoutUser())}
                className="relative hover:text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <AiOutlineLogout />
                </span>
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-9 md:grid grid-cols-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;
