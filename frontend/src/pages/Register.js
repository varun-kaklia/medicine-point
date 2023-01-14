import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userAction";
import { ToastContainer} from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email1, setEmail1] = useState("");
  // const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [phone1, setPhone1] = useState("");
  const [dlNumber, setDlNumber] = useState("");
  const [gstin, setGstin] = useState("");
  const password = useState("1234");
  const confirmPassword = useState("1234");

  const navigate = useNavigate()

  const registerState = useSelector((state) => state.registerUserReducer);
  const { error, success, loading } = registerState;
  // console.log("This is error", error)
  // console.log("This is success", success)
  // console.log("This is loading", loading)

  useEffect(()=>{
    if (success) {
      navigate('/registrationcompleted')
    }
  })

  const dispatch = useDispatch();

  const registerHandler = (e) => {
    e.preventDefault();
      const user = {
        name,
        email1,
        address,
        phone1,
        DlNo: dlNumber,
        GSTIN:gstin,
        password,
        confirmPassword,
      };
      // console.log("User on Register Page-", user);
      dispatch(registerUser(user));
  };

  return (
    <div className="container py-16">
      {loading && (
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      {success && (
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      {error && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          Create An Account
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Register here if you don't have an account
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="text-gray-600 mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.toLocaleUpperCase())}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
              placeholder="Enter Your Full Name"
            />
          </div>
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
            <label htmlFor="address" className="text-gray-600 mb-2 block">
              Shop Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
              placeholder="Enter Your Shop Address"
            />
          </div>
          <div>
            <label htmlFor="phone1" className="text-gray-600 mb-2 block">
              Mobile Number
            </label>
            <input
              type="number"
              maxLength={10}
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
              placeholder="Enter Your Mobile Number"
            />
          </div>
          <div>
            <label htmlFor="dlnumber" className="text-gray-600 mb-2 block">
              Drug License Number
            </label>
            <input
              type="text"
              maxLength={40}
              value={dlNumber}
              onChange={(e) => setDlNumber(e.target.value)}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
              placeholder="Enter Your Drug License Number"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-600 mb-2 block">
              GST No.
            </label>
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
              placeholder="Enter Your GSTIN"
            />
          </div>
          {/* <div>
            <label htmlFor="password" className="text-gray-600 mb-2 block">
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
          <div>
            <label htmlFor="confirmPassword" className="text-gray-600 mb-2 block">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
              placeholder="Confirm Your Password"
            />
          </div> */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreement"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                for="agreement"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                I have read and agree to the &nbsp;
              </label>
              <Link to="#" className="text-primary">
                terms & conditions
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={(e) => registerHandler(e)}
              className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
              Create Account
            </button>
          </div>
        </div>
        <div>
          <p className="mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link className="hover:text-primary " to="/LoginPage">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
