import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userAction";

const Login = () => {
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  
  const dispatch = useDispatch();
  const loginState = useSelector((state)=>state.loginUserReducer)
  const {loading,error} = loginState

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  const loginHandler = (e)=>{
    if (email1 !== ""){
      const user = {email1, password}
      console.log("User Details",user)
      dispatch(loginUser(user));
    }else{
      const user = {name, password}
      console.log("User Details",user)
      dispatch(loginUser(user));
    }
  }
  

  return (
    <div className="container py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Login If you are a returning customer
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-600 mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              value={email1}
              onChange={(e) => setEmail1(e.target.value)}
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
          {
            loading === false && error ?
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center">
            <label className="text-secondary text-center">Email/ Name/ Password Wrong.!</label>
            </div>
          </div>
          :
          null
          }

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
        <div>
          <p className="mt-4 text-gray-600 text-center">
            Don't have an account?{" "}
            <Link className="hover:text-primary" to="/RegisterPage">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
