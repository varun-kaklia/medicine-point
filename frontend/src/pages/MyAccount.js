import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link} from 'react-router-dom';
import { logoutUser } from "../actions/userAction";
import { FaAddressCard, FaCoins, FaGift} from 'react-icons/fa'
import {GrDeliver} from 'react-icons/gr'
import { AiOutlineLogout } from 'react-icons/ai'
import Breakcrumb from '../components/Breakcrumb'
import { logoutSeller } from '../actions/sellerAction';

const MyAccount = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  
  const sellerState = useSelector((state) => state.loginSellerReducer);
  const { currentSeller } = sellerState;
  useEffect(() => {
    if (
      localStorage.getItem("currentUser") === null && localStorage.getItem("currentSeller") === null
    ) {
      return window.location.href = "/login";
    } 
  }, []);
  // console.log("Current User", currentUser)
  return (
    <div>
        <Breakcrumb id={"My Account"}/>
        <div className='container md:grid grid-cols-12 items-start pt-4 gap-6 pb-16'>
          <div className='col-span-3'>
          <div className='px-4 md:py-3 py-0 md:block hidden shadow items-center gap-4'>
            <div className='flex items-center'>
              <div>
                <img src='/images/1.png'  alt="Medicine Point- Medicine Wholeseller in Noida..!" className='rounded-full w-14 h-14 border border-gray-200 p-1 object-cover ' />
              </div>
              <div className='flex-grow flex pl-2'>
                <p className='text-gray-600'>Hello,</p>
                <h4 className='text-gray-400 px-1 font-medium'>
                  {currentUser !== null? currentUser?.name : currentSeller.name}
                </h4>
              </div>
            </div>
            {currentUser &&
            <>
            <div className='flex justify-between pt-2'>
              <p className='text-gray-600 text-center'>Wallet Balance: </p>
              <p className='text-gray-600 text-center'>Rs. {currentUser&&currentUser.wallet }</p>
            </div>
            <div className='flex justify-between pt-2'>
              <p className='text-gray-600 text-center'>Due Balance: </p>
              <p className='text-gray-600 text-center'>Rs. {currentUser&&currentUser.balance }</p>
            </div>
            <div className='flex justify-between pt-2'>
              <p className='text-gray-600 text-center'>Available Points: </p>
              <p className='text-gray-600 text-center'>{currentUser&&currentUser.points }</p>
            </div>
            </>
            }
            </div>
            <div className='md:mt-6 divide-gray-200 space-y-4 text-gray-600 divide-y bg-white shadow rounded p-4'>
            {currentUser &&
              <>
              <div className='space-y-1 pl-8'>
                <Link to="/myaccount" href='#' className={`relative hover:text-primary block capitalize transition`}>
                <span className='absolute -left-8 top-0 text-base'><FaAddressCard/></span>
                Profile Information</Link>
            </div>
              <div className='space-y-1 pt-4 pl-8'>
                <Link to="/userpoints" href='#' className='relative hover:text-primary block capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><FaCoins/></span>
                Points</Link>
              </div>
              <div className='pt-4 space-y-1 pl-8'>
                <Link to='/myorder' className='relative hover:text-primary block font-medium capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><FaGift/></span>
                My Order</Link>
              </div>
            </>
            }
            {currentSeller &&
              <>
              <div className='space-y-1 pl-8'>
                <Link to="/myaccount" href='#' className={`relative hover:text-primary block capitalize transition`}>
                <span className='absolute -left-8 top-0 text-base'><FaAddressCard/></span>
                Seller Panel</Link>
            </div>
              <div className='pt-4 space-y-1 pl-8'>
                <Link to={{pathname:'/sellerUserSelection',hash: "#seller" }} className='relative hover:text-primary block font-medium capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><FaGift/></span>
                Create Order</Link>
              </div>
              <div className='space-y-1 pt-4 pl-8'>
                <Link to="/sellerOrder" href='#' className='relative hover:text-primary block capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><FaCoins/></span>
                Old Order</Link>
              </div>
              <div className='space-y-1 pt-4 pl-8'>
                <Link to="/deliverOrder" className='relative hover:text-primary block capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><GrDeliver/></span>
                Deliver Order</Link>
              </div>
            </>
            }
            <div className='pt-4 space-y-1 pl-8'>
              {currentUser &&
                <Link to="#" onClick={() => {
                        dispatch(logoutUser());
                      }} className='relative hover:text-primary block font-medium capitalize transition'>
              <span className='absolute -left-8 top-0 text-base'><AiOutlineLogout/></span>
                Logout</Link>
              }
                  {
                    currentSeller &&
                <Link to="#" onClick={() => {
                        dispatch(logoutSeller());
                      }} className='relative hover:text-primary block font-medium capitalize transition'>
              <span className='absolute -left-8 top-0 text-base'><AiOutlineLogout/></span>
                Logout</Link>
                  }
              </div>
            </div>
          </div>
          <div className='col-span-9 md:grid md:mt-0 mt-4 grid-cols-3 gap-4'>
          {currentUser && 
            <>
            <div className='shadow rounded bg-white pt-6 pb-8 px-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-medium text-gray-800 text-lg'>Personal Profile</h3>
                {/* <a href="#" className='text-primary'>Edit</a> */}
              </div>
                <div className='space-y-1 '>
                  <h4 className='text-gray-700 font-medium'>{currentUser !== null && currentUser?.name }</h4>
                  <p className='text-gray-800'>{currentUser?.email1 !== "" || null || undefined ? currentUser?.email1 : "Ask Admin to Update Email"}</p>
                  <p className='text-gray-800'>{currentUser?.address===""? "Update your address": currentUser?.address}</p>
                  <p className='text-gray-800'>{currentUser?.phone1 !== "" || null || undefined ? currentUser?.phone1 : "Ask Admin to Update Mobile Number"}</p>
                </div>
           </div>
            <div className='shadow rounded mt-3 bg-white pt-6 pb-8 px-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-medium text-gray-800 text-lg'>Shipping Address</h3>
                {/* <a href="#" className='text-primary'>Edit</a> */}
              </div>
                <div className='space-y-1 '>
                  <h4 className='text-gray-700 font-medium'>{currentUser?.name===""? "Check Your Name": currentUser?.name}</h4>
                  <p className='text-gray-800'>{currentUser&&currentUser?.address===""? "Update your address": currentUser?.address}</p>
                  <p className='text-gray-800'>{currentUser?.phone1===""? "Please Update your Mobile No.": currentUser?.phone1}</p>
                </div>
            </div>
            <div className='shadow rounded mt-3 bg-white pt-6 pb-8 px-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-medium text-gray-800 text-lg'>Billing Address</h3>
                {/* <a href="#" className='text-primary'>Edit</a> */}
              </div>
                <div className='space-y-1 '>
                  <h4 className='text-gray-700 font-medium'>{currentUser?.name===""? "Check Your Name": currentUser?.name}</h4>
                  <p className='text-gray-800'>{currentUser?.address===""? "Update your address": currentUser?.address}</p>
                  <p className='text-gray-800'>{currentUser?.phone1===""? "Please Update your Mobile No.": currentUser?.phone1}</p>
                </div>
            </div>
          </>
          }
          {
            currentSeller &&
            <>
              <div className='shadow rounded md:mt-0 mt-4 bg-gray-200 hover:bg-gray-100 pt-6 pb-8 px-4'>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='font-medium text-gray-800 text-lg'>Seller Profile</h3>
                </div>
                <div className='space-y-1'>
                  <h4 className='text-gray-700 font-medium'>{currentSeller !== null && currentSeller?.name}</h4>
                  <p className='text-gray-800'>{currentSeller !== null || undefined || "" ? currentSeller?.email :"Ask Admin to update Email" }</p>
                  <p className='text-gray-800'>{currentSeller !== null || undefined || "" ? currentSeller?.mobile :"Ask Admin to update Phone" }</p>
                </div>
              </div>
              <div className='shadow rounded md:mt-0 mt-4 justify-center bg-gray-200 hover:bg-gray-100 pt-6 pb-8 px-4 transition'>
                <div className='flex justify-center items-center mb-4'>
                  <h3 className='font-medium text-gray-800 text-lg'>Create Order</h3>
                </div>
                <div className='space-y-1 text-center'>
                    <button className='px-6 bg-primary text-gray-100 py-2 border-primary border hover:text-gray-800 rounded hover:bg-transparent hover:border-secondary'>
                  <Link to={{pathname:'/sellerUserSelection',hash: "#seller" }}>
                      New Order
                  </Link>
                    </button>
                </div>
              </div>
              <div className='shadow rounded md:mt-0 mt-4 justify-center bg-gray-200 hover:bg-gray-100 pt-6 pb-8 px-4 transition'>
                <div className='flex justify-center items-center mb-4'>
                  <h3 className='font-medium text-gray-800 text-lg'>Check Old Order</h3>
                </div>
                <div className='space-y-1 text-center'>
                    <button className='px-6 bg-primary text-gray-100 py-2 border-primary border hover:text-gray-800 rounded hover:bg-transparent hover:border-secondary'>
                  <Link to="/sellerOrder">
                      Check Order
                  </Link>
                    </button>
                </div>
              </div>
              <div className='shadow rounded md:mt-0 mt-4 justify-center bg-gray-200 hover:bg-gray-100 pt-6 pb-8 px-4 transition'>
                <div className='flex justify-center items-center mb-4'>
                  <h3 className='font-medium text-gray-800 text-lg'>Deliver Order</h3>
                </div>
                <div className='space-y-1 text-center'>
                    <button className='px-6 bg-primary text-gray-100 py-2 border-primary border hover:text-gray-800 rounded hover:bg-transparent hover:border-secondary'>
                  <Link to="/deliverOrder">
                      Order Delivery
                  </Link>
                    </button>
                </div>
              </div>
            </>
          }
          </div>
        </div>
    </div>
  )
}

export default MyAccount