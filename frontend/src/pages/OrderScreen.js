import React, { useEffect, useLayoutEffect } from "react";
import { getUserOrder } from "../actions/orderAction";
import { Link } from 'react-router-dom';
import { logoutUser } from "../actions/userAction";
import {logoutSeller} from '../actions/sellerAction'
import { FaAddressCard, FaCoins, FaGift} from 'react-icons/fa'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import Breakcrumb from "../components/Breakcrumb";

const OrderScreen = () => {
  const orderState = useSelector((state) => state.getUserOrderReducer);
  const { orders } = orderState;
  console.log("Order",orders)
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const sellerState = useSelector((state) => state.loginSellerReducer)
  const {currentSeller} = sellerState
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.getItem("currentUser") === null && localStorage.getItem("currentSeller") === null
    ) {
      return window.location.href = "/login";
    } 
  }, []);
  useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);
  useLayoutEffect(()=>{
    if(localStorage.getItem('currentSeller')!== null ||undefined ||""){
      window.location.href='/myaccount'
    }
  },[])
  return (
    <div>
      <Breakcrumb id={"My Orders"} />
      <div className='container md:grid grid-cols-12 items-start pt-4 gap-6 pb-16'>
          <div className='col-span-3'>
          <div className='px-4 py-3 shadow items-center gap-4'>
            <div className='flex items-center'>
              <div>
                <img src='/images/1.png' alt="Medicine Point- Medicine Wholeseller in Noida..!" className='rounded-full w-14 h-14 border border-gray-200 p-1 object-cover ' />
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
            <div className='mt-6 divide-gray-200 space-y-4 text-gray-600 divide-y bg-white shadow rounded p-4'>
            {currentUser &&
              <>
              <div className='space-y-1 pl-8'>
                <Link to="/myaccount" href='#' className='relative hover:text-primary block capitalize transition'>
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
                <Link to="/myaccount" href='#' className='relative hover:text-primary block capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><FaAddressCard/></span>
                Seller Panel</Link>
              </div>
              <div className='pt-4 space-y-1 pl-8'>
                <Link to='/sellerUserSelection' className='relative hover:text-primary block font-medium capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><FaGift/></span>
                Create Order</Link>
              </div>
              <div className='space-y-1 pt-4 pl-8'>
                <Link to="/myorder" href='#' className='relative hover:text-primary block capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><FaCoins/></span>
                Old Order</Link>
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
          <div className='col-span-9 mt-4 md:grid grid-cols-1 gap-2'>
            <div className='shadow rounded bg-white pt-6 pb-8 px-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-medium text-gray-800 text-lg'>Order Information</h3>
                <h3 className='font-medium text-gray-800 text-lg'>Order Total</h3>
                {/* <a href="#" className='text-primary'>Edit</a> */}
              </div>
              <div className="divide-y-2 py-2">
              {currentUser && orders &&
                orders.map((order, index) => (
                  <div key={index} className="py-2">
                  <div className="flex justify-between gap-2">
                      <p className="text-gray-700 font-medium">{new Date(order.createdAt).toDateString()}</p>
                      <p className="text-gray-700 font-medium">Order No: {order && order.OrderNo }</p>
                  </div>
                  <div className="flex justify-between gap-2">
                    <p className="text-gray-700 font-medium">Status: {order.datedis != null || undefined? "Bill Ready to Dispatch": order.dateisu != null || undefined ? 
                        "Bill Generated" : order.datesub != null || undefined ? "Order Submitted" : <Link to="/contactus" className="text-blue-800 hover:text-blue-700">Contact Us</Link>}</p>
                      <p>{order.datedis != null || undefined ? <span className="text-primary">{order.transferPoints} Points Transferred</span> : <span className="text-secondary">Pending Points: { order.pendingPoints}</span>}</p>
                  </div>
                  <div className='flex justify-between py-2'>
                    <div>
                      {order.orderItems.map((item,index) => (
                        <div className='text-gray-700 font-medium' key={index}>
                          {item.name} * {item.quantity} = {item.price}
                        </div>
                      ))}
                    </div>
                  <div  className='gap-6 self-center'>
                    <div  className='text-gray-800'>{order.orderAmount}</div>
                  </div>
                </div>
                <div>
                <div className="pr-2 md:flex md:justify-between">
                  <div className="flex justify-between items-center">
                  <span className="pr-2 text-xl font-semibold">Use Wallet Money:</span>
                  <span className="px-2">{order.useWallet===false?"No":order.useWallet===true?"Yes":"N.A."}</span>
                  </div>
                  {
                    order.useWallet===false?
                    null
                    :
                  <div className="flex justify-between items-center">
                  <span className="pr-2 text-xl font-semibold">Money Used:</span>
                  <span className="px-2">{order?.wallets}</span>
                  </div>
                  }
                </div>
                </div>
                <div>
                  <p className="text-xl font-semibold">Order Remarks:</p>
                  <span>{order.remarks}</span>
                </div>
                  </div>
              ))}
              {currentSeller && orders &&
                orders.map((order, index) => (
                  <div key={index}>
                  <div className="flex justify-between gap-2">
                      <p className="text-gray-700 font-medium">{new Date(order.createdAt).toDateString()}</p>
                      <p className="text-gray-700 font-medium">Order No: {order && order.OrderNo }</p>
                  </div>
                  <div className="flex justify-between gap-2">
                    <p className="text-gray-700 font-medium">Status: {order.datedis != null || undefined? "Bill Ready to Dispatch": order.dateisu != null || undefined ? 
                        "Bill Generated" : order.datesub != null || undefined ? "Order Submitted" : <Link to="/contactus" className="text-blue-800 hover:text-blue-700">Contact Us</Link>}</p>
                      <p>{order.datedis != null || undefined ? <span className="text-primary">{order.transferPoints} Points Transferred</span> : <span className="text-secondary">Pending Points: { order.pendingPoints}</span>}</p>
                  </div>
                  <div className='flex justify-between py-2'>
                    <div>
                      {order.orderItems.map((item,index) => (
                        <div className='text-gray-700 font-medium' key={index}>
                          {item.name} * {item.quantity} = {item.price}
                        </div>
                      ))}
                    </div>
                  <div  className='gap-6 self-center'>
                    <div  className='text-gray-800'>{order.orderAmount}</div>
                  </div>
                </div>
                  </div>
              ))}
          </div>
                </div>
            </div>
          </div>
        </div>



  );
};

export default OrderScreen;
