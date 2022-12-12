import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userAction";

const PhoneNavbar = ({setBar, bar}) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
    return (
        <div className="w-[80%] py-4 top-0 absolute">
            <div className="relative pt-10">
            <div className="w-fit">
                {/* <img src="images/2.png" /> */}
                </div>
            <div className="bg-gray-400 w-full rounded-r">
            <ul className="px-4 pt-2">
                <li className="py-2"><Link to="/" onClick={()=>setBar(false)} className="text-primary">Home</Link></li>
                <li className="py-2"><Link to="/shop"  onClick={()=>setBar(false)}  className="text-primary">Shop</Link></li>
                <li className="py-2"><Link to="/salt" onClick={()=>setBar(false)}  className="text-primary">Salt Wise</Link></li>
                <li className="py-2"><Link to="/brand" onClick={()=>setBar(false)}  className="text-primary">Brand Wise</Link></li>
                <li className="py-2"><Link to="/points" onClick={()=>setBar(false)}  className="text-primary">Points</Link></li>
                <li className="py-2"><Link to="/offer" onClick={()=>setBar(false)}  className="text-primary">Daily Offer</Link></li>
            </ul>
              {currentUser ? (
              <div className="px-4 pb-2">
                <div className="px-8 py-4 bg-secondary flex items-center cursor-pointer relative group">
                  <span className="text-white">
                    <i className="fas- fa-bars"></i>
                  </span>
                  <span className="ml-2 text-white capitalize">
                    Hello {currentUser.name}
                  </span>
                  <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed hidden group-hover:block opacity-0 group-hover:opacity-100 transition group-hover:duration-500 invisible group-hover:visible">
                    <Link
                      to="/myorder"
                      onClick={()=>setBar(false)}
                      className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                      <span className="ml-6 text-gray-600 text-sm">Order</span>
                    </Link>
                    <Link
                      to="#"
                      onClick={() => {
                          dispatch(logoutUser());
                          setBar(false)
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
            ) : (
              <div className="px-4 pb-2">
                <Link
                  to="/login"
                  onClick={()=>setBar(false)} 
                  className="text-primary hover:text-white transition"
                >
                  Login/Register
                </Link>
              </div>
                )}
                </div>
                </div>
        </div>
 )   
}

export default PhoneNavbar