import React,{useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "../elements/Search";
import PhoneNavbar from "../elements/phoneNavbar";
import {FaBars} from 'react-icons/fa'
import {RxCross1} from 'react-icons/rx'

const Header = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const sellerState = useSelector((state) => state.loginSellerReducer)
  const {currentSeller} = sellerState
  const [bar, setBar] = useState(false)
  console.log('Current Bar', bar)
  return (
    <div>
      {/* Header */}
      <div className="py-1 shadow-sm bg-white">
        <div className="md:container items-center md:justify-between flex w-full">
          <div className="md:hidden block">
            <div onClick={()=>setBar(!bar)} className="cursor-pointer p-2">
              {
                bar?
                  <RxCross1 size={20}/>
                  :
                  <FaBars size={20}/>
              }
            </div>
            {bar ?
              <PhoneNavbar setBar={setBar} />                
              :
              null
            }
          </div>
          <div>
          <Link to="/">
            {/* Logo */}
            <img
              src="/images/1.png"
              alt="Medicine Point Noida- Medicine Wholeseller in Noida.!"
              className="w-20"
            />
          </Link>
          </div>
          <div>
          </div>
          {/* Search Bar */}
          <Search />

          {/* Items List */}
          <div className="px-2 flex items-center space-x-4">
            <button>
            <Link
              to="/createOrder"
              className="text-center text-gray-700 hover:text-primary transition relative items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
              <div className="text-xs leading-3 hidden md:block">Cart</div>
              <div className="absolute -right-3 -top-1 w-4 h-4 rounded-full flex justify-center bg-primary text-white text-xs">
                {cartState?.cartItems?.length}
              </div>
            </Link>
            </button>
            <button>
            <Link
              to={!currentUser && !currentSeller ? "/login" : "/myaccount"}
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="text-xs leading-3 hidden md:block">Account</div>
            </Link>
            </button>
            {/* <Link
              to="/createOrder"
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
            <button className="flex justify center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
              <div className="text-xs leading-3 hidden md:block">Create Order</div>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
