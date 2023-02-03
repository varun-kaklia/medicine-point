import React, {useState, useEffect} from "react";
import Breakcrumb from "../components/Breakcrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderAction";
import {updateUser} from '../actions/userAction'
import {flushFromCart} from '../actions/cartAction'

const CheckoutPage = () => {
  // states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone1, setPhone1] = useState("");
  const [points, setPoints] = useState("");
  const [useWallet, setUseWallet] = useState(false)
  const [wallets, setWallets] = useState("0")
  const [wallet, setWallet] = useState("0")

  const { state } = useLocation();
  const { subTotal,pointsPay,remarks } = state;
  // console.log("Remarks", remarks);

  // dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // reducer
  // const orderState = useSelector((state) => state.cartReducer);
  // console.log("Order State-", orderState)

  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const sellerState = useSelector((state) => state.loginSellerReducer)
  const {currentSeller} = sellerState
  
  // useEffect
  useEffect(() => {
    if (currentUser !== null && currentSeller=== null)  {
      setName(currentUser.name);
      setAddress(currentUser.address);
      setPhone1(currentUser.phone1);
      setPoints(currentUser.points);
    }
    else {
      navigate('/login')
      }
    } 
    , [currentUser, navigate, currentSeller]);
  
  const changeWalletUser = () => {
    setUseWallet(!useWallet)
  }

  useEffect(() => {
    if (useWallet === true) {
      setWallets(currentUser && currentUser.wallet)
      setWallet(0)
    } else{
      setWallets(0)
      setWallet(currentUser && currentUser.wallet)}
  },[useWallet,currentUser])

  const newSubTotal = subTotal - wallets
  // console.log("New Sub Total", newSubTotal)
  // console.log("Wallet MOney", wallet)

  const confirmOrderHandle = () => {
    if (pointsPay && points > pointsPay) {
      const adjustPoint = points - pointsPay
      // const newPoints = (newSubTotal > 2000 ? ((2 * newSubTotal) / 100) : 0)
      const pendingPoints = ((2 * newSubTotal) / 100)
      const oldPoints = (adjustPoint)
      const point = Math.trunc(oldPoints)
      dispatch(placeOrder(subTotal,newSubTotal,useWallet,wallets, remarks,pendingPoints));
      dispatch(updateUser(point, wallet))
      dispatch(flushFromCart())
      window.location.href ="/ordercompleted"
      // dispatch(updateUserAction({currentUser}))
    } 
    if(points){
      const adjustPoint = points
      const pendingPoints = ((2 * newSubTotal)/100)
      const oldPoints = (adjustPoint)
      const point = Math.trunc(oldPoints)
      dispatch(placeOrder(subTotal,newSubTotal,useWallet, wallets,remarks, pendingPoints))
      dispatch(updateUser(point,wallet))
      dispatch(flushFromCart())
      window.location.href="/ordercompleted"
    }
    
    if (points === 0 || null || undefined) {
      // alert("You have low points to purchase Points Items")
      // const newPoints = (newSubTotal > 2000 ? ((2 * newSubTotal) / 100) : 0)
      const pendingPoints = ((2 * newSubTotal) / 100) 
      const point = pendingPoints
      dispatch(placeOrder(subTotal,newSubTotal,useWallet,wallets,remarks,pendingPoints));
      dispatch(updateUser(point,wallet))
      dispatch(flushFromCart())
      window.location.href="/ordercompleted"
    }
  };


  return (
    <div>
      <Breakcrumb id={"checkout"} />
      <div className="container md:grid gap-6 grid-cols-12 items-start pb-16 pt-4">
        <div className="col-span-8 border border-gray-200 rounded p-4">
          <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
          <div className="space-y-4 ">
            <div className="">
              <label htmlFor="name" className="text-gray-600 mb-2 block">
                Name <span className="text-primary"></span>
              </label>
              <input type="text"     placeholder="Please Enter Name"                value={name}
                onChange={(e) => setName(e.target.value)} className="input-box" />
            </div>
            <div className="">
              <label className="text-gray-600 mb-2 block">
                Address <span className="text-primary"></span>
              </label>
              <input type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-box" placeholder="Please Enter Full Address" />
            </div>
            <div className="">
              <label className="text-gray-600 mb-2 block">
                Phone Number <span className="text-primary"></span>
              </label>
              <input type="number"
                            value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
               className="input-box" placeholder="Please Enter Mobile Number" />
            </div>
          </div>
        </div>
        <div className="col-span-4 border md:pt-0 mt-4 md:mt-0 border-gray-200 rounded p-4">
          <h4 className="text-gray-800 text-lg font-medium mb-4 uppercase">
            Order Summary
          </h4>
          <div className="md:space-y-2">
            <div className="flex justify-between   font-medium text-gray-800 py-3 uppercase ">
              <p className="font-semibold">SubTotal</p>
              <p>Rs. {subTotal}</p>
            </div>
            <div className="flex justify-between   font-medium text-gray-800 py-3 uppercase ">
              <p className="font-semibold">Points SubTotal</p>
              <p>{pointsPay && pointsPay}</p>
            </div>
            <div className="flex justify-between   font-medium text-gray-800 py-3 uppercase ">
              <p className="font-medium">{currentUser && currentUser?.name } Due Balance:</p>
              <p>Rs. {currentUser && currentUser?.balance}</p>
            </div>
            <div className="flex justify-between   font-medium text-gray-800 py-3 uppercase ">
              <p className="font-medium">{currentUser && currentUser?.name }'s Available Points:</p>
              <p>{currentUser && currentUser?.points}</p>
            </div>
            <div className="flex justify-between   font-medium text-gray-800 py-3 uppercase ">
              <p className="font-medium">{currentUser && currentUser?.name }'s Wallet Balance:</p>
              <p>Rs. {currentUser && currentUser?.wallet}</p>
            </div>
            {currentUser && currentUser?.wallet>0 ?
            <div className="">
              <input
                type="checkbox"
                onChange={() => changeWalletUser()}
              /><span className="px-2">Redeem Wallet Money</span>
            </div>
            :
            null 
            }
            <div className="flex justify-between   font-medium text-gray-800 py-3 uppercase ">
              <p className="font-semibold">Total</p>
              <p>Rs. {useWallet === true? (subTotal - currentUser.wallet):subTotal}</p>
            </div>
            <div className="mb-4 mt-2 items-center flex">
              <input
                type="checkbox"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
              />
              <label
                htmlFor="agreement"
                className="text-gray-600 ml-3 cursor-pointer text-sm"
              >
                Agree to our{" "}
                <Link to="/termsandcondition" className="text-primary">
                  terms & conditions
                </Link>
              </label>
            </div>
            <button
              onClick={() => confirmOrderHandle()}
              className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition"
            >
              Proceed Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
