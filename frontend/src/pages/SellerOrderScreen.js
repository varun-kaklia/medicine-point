import React, { useEffect, useLayoutEffect, useState } from "react";
import { getSellerOrder } from "../actions/orderAction";
import { Link } from 'react-router-dom';
import {getAllSeller, logoutSeller} from '../actions/sellerAction'
import {assignDelivery} from '../actions/orderAction'
import { FaAddressCard, FaCoins, FaGift} from 'react-icons/fa'
import {GrDeliver} from 'react-icons/gr'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import Breakcrumb from "../components/Breakcrumb";

const SellerOrderScreen = () => {
  const [deliveryBy, setDeliveryBy] = useState('')
  const [limit, setLimit] = useState('')
  const orderState = useSelector((state) => state.getSellerOrderReducer);
  const { orders } = orderState;
  const allSellerState = useSelector((state)=>state.getAllSellerReducer)
  const {sellers} = allSellerState
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.getItem("currentUser") === null && localStorage.getItem("currentSeller") === null
    ) {
      return window.location.href = "/login";
    } 
  }, []);

  const currentSeller = JSON.parse(localStorage.getItem('currentSeller'))
  useEffect(() => {
    dispatch(getSellerOrder(currentSeller.RowID, limit));
    dispatch(getAllSeller());
  }, [dispatch, limit]);

  useLayoutEffect(()=>{
    if(currentSeller.type !== "S"){
      return window.location.href ="/deliverOrder"
    }
  })
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
              <div className='flex-grow md:flex hidden pl-2'>
                <p className='text-gray-600'>Hello,</p>
                  <h4 className='text-gray-400 px-1 font-medium'>
                  {currentSeller && currentSeller.name}
                </h4>
              </div>
            </div>
            </div>
            <div className='md:mt-6 divide-gray-200 space-y-4 text-gray-600 divide-y bg-white shadow rounded p-4'>
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
          <div className='col-span-9 mt-4 md:mt-0 md:grid grid-cols-1 gap-2'>
            <div className='shadow rounded bg-white pt-6 pb-8 px-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-medium text-gray-800 text-lg'>Order Information</h3>
                <div>
                <label  className='font-medium text-gray-800 text-lg mr-2'>Order No.</label>
                <input type="number" className="rounded p-1 w-12 text-center" onChange={(e)=>setLimit(e.target.value)} />
                </div>
                {/* <a href="#" className='text-primary'>Edit</a> */}
              </div>
              <div className="divide-y-2">
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
                      <p>{order && order.name}</p>
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
                  <div className='flex py-2'>
                    <div>
                        <div className='text-gray-700 font-bold'>
                        {order && order.remarks}
                        </div>
                    </div>
                  </div>
                { order && order.deliveryAssigned === false?
                  <div className='flex py-2'>
                    <div>
                        <div className='text-gray-700 font-bold'>
                        <select value={deliveryBy} onChange={(e)=>setDeliveryBy(e.target.value)} id="deliveryBy" >
                        {
                          sellers && sellers.map((seller)=>
                          <option key={seller._id} value={seller && seller.name}>{seller && seller.name}</option>
                          )
                        }
                        </select>
                        <label className="px-2">Assigned for Delivery</label>
                        <button onClick={()=>dispatch(assignDelivery({orderId:order._id},deliveryBy))} className="px-4 py-2 bg-primary text-slate-100 border hover:bg-transparent hover:text-primary hover:border-secondary transition rounded">Delivery Boy</button>
                        </div>
                    </div>
                </div>
                :
                <div className="flex py-2">
                  <label className="text-xl font-semibold text-gray-700">{order && order.deliverBy} Already Assigned Delivery to {order && order.deliveryBy}</label>
                </div>
                }
                  </div>
              ))}
          </div>
                </div>
            </div>
          </div>
        </div>



  );
};

export default SellerOrderScreen;
