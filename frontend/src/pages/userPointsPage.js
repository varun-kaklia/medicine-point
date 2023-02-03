import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserOrder } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Breakcrumb from "../components/Breakcrumb";
import { logoutUser, updateUser } from "../actions/userAction";
import { FaAddressCard, FaCoins, FaGift } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

const UserPointsPage = () => {
  const [points, setPoints] = useState(0);
  const location = useLocation();
  const wallet = (points * 100) / 100;
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const dispatch = useDispatch();
  const confirmOrder = () => {
    if (currentUser && currentUser.points > points) {
      const adjustPoint = currentUser && currentUser.points - points;
      const point = Math.trunc(adjustPoint);
      dispatch(updateUser(point, wallet));
      window.location.reload();
      // dispatch(updateUserAction({currentUser}))
    }
    if (!currentUser.points) {
      alert("You have low points to purchase Points Items");
      const oldPoints = !currentUser.points
        ? points
        : currentUser.points + points;
      const point = Math.trunc(oldPoints);
      dispatch(updateUser(point, wallet));
      window.location.reload();
      // dispatch(updateUserAction({currentUser}))
    }
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null) {
      return (window.location.href = "/login");
    }
  }, [location]);
  useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);

  return (
    <div>
      <Breakcrumb id={"User Points"} />
      <div className="container md:grid grid-cols-12 items-start pt-4 gap-6 pb-16">
        <div className="col-span-3">
          <div className="px-4 py-3 shadow items-center gap-4">
            <div className="flex items-center">
              <div>
                <img
                  src="/images/1.png"
                  alt="Medicine Point- Medicines wholeseller in Noida..!"
                  className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover "
                />
              </div>
              <div className="flex-grow flex pl-2">
                <p className="text-gray-600">Hello,</p>
                <h4 className="text-gray-400 px-1 font-medium">
                  {currentUser && currentUser?.name}
                </h4>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <p className="text-gray-600 text-center">Wallet Balance: </p>
              <p className="text-gray-600 text-center">
                Rs. {currentUser && currentUser.wallet}
              </p>
            </div>
            <div className="flex justify-between pt-2">
              <p className="text-gray-600 text-center">Due Balance: </p>
              <p className="text-gray-600 text-center">
                Rs. {currentUser && currentUser.balance}
              </p>
            </div>
            <div className="flex justify-between pt-2">
              <p className="text-gray-600 text-center">Available Points: </p>
              <p className="text-gray-600 text-center">
                {currentUser && currentUser.points}
              </p>
            </div>
            {/* <div className='flex'><label className='font-xs'>Rs.1001</label></div> */}
          </div>
          <div className="mt-6 divide-gray-200 space-y-4 text-gray-600 divide-y bg-white shadow rounded p-4">
            <div className="space-y-1 pl-8">
              <Link
                to="/myaccount"
                href="#"
                className="relative hover:text-primary block capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <FaAddressCard />
                </span>
                Profile Information
              </Link>
            </div>
            <div className="space-y-1 pt-4 pl-8">
              <Link
                to="/userpoints"
                href="#"
                className="relative hover:text-primary block capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <FaCoins />
                </span>
                Points
              </Link>
            </div>
            <div className="pt-4 space-y-1 pl-8">
              <Link
                to="/myorder"
                className="relative hover:text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <FaGift />
                </span>
                My Order
              </Link>
            </div>
            <div className="pt-4 space-y-1 pl-8">
              <Link
                to="#"
                onClick={() => {
                  dispatch(logoutUser());
                }}
                className="relative hover:text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <AiOutlineLogout />
                </span>
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-9 mt-4 md:grid grid-cols-1 gap-2">
          <div className="border rounded ">
            <div className="text-center py-4">
              <h2 className="text-xl font-medium">
                {currentUser && currentUser.name} Points
              </h2>
            </div>
            <p className="text-center py-2">
              Available points: {currentUser && currentUser.points}
            </p>

            <div className="text-center py-2">
              <span className="px-4">Convert Points into cash</span>
              <input
                type="number"
                className="p-2 w-40 rounded"
                onChange={(e) =>
                  currentUser && currentUser.points >= e.target.value
                    ? setPoints(e.target.value)
                    : alert("Sorry You have low points")
                }
              />
            </div>
            <div className="text-center py-2">
              <span>Cash: {wallet}</span>
            </div>
            <div className="text-center pb-2">
              <button
                className="border-primary rounded p-3 bg-primary text-slate-100 hover:bg-slate-50 hover:border-secondary hover:text-primary hover:transition border "
                onClick={() => confirmOrder()}
              >
                Complete Order
              </button>
            </div>
          </div>
          <div className="border rounded ">
            <div className="text-center py-4">
              <h3 className="text-xl font-medium">Points to Cash Usage</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPointsPage;
