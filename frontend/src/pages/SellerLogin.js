import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSeller } from "../actions/sellerAction";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const date= new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
  console.log("Date",date)
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //check login
  console.log('Email', email)
  console.log('Password', password)
  console.log('Name', name)
  
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (localStorage.getItem("currentSeller") ) {
      window.location.href = "/";
    }
  }, []);

  const loginHandler = (e)=>{
    if (email !== ""){
      const seller = {email, password,date}
      console.log("Seller Details",seller)
      dispatch(loginSeller(seller));
    }else{
      const seller = {name, password,date}
      console.log("seller Details",seller)
      dispatch(loginSeller(seller));
    }
  }

  return (
    <div className="container py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Seller Login</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-600 mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
              placeholder="Enter Your Email Address"
            />
          </div>
          <div>
            <label className="text-gray-600 mb-2 block text-center font-bold">
              "Or"
            </label>
          </div>
          <div>
            <label htmlFor="name" className="text-gray-600 mb-2 block">
              Name
            </label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600 mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreement"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="agreement"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                Remember Me
              </label>
            </div>
            {/* <Link to="#" className="text-primary">
              Forgot Password ?
            </Link> */}
          </div>
          <div className="mt-4">
            <button
            type="submit"
              onClick={(e) => loginHandler(e)}
              className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
