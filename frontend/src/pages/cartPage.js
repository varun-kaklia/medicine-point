import React, {useEffect, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Breakcrumb from "../components/Breakcrumb";
import {
  FaPlusCircle,
  FaMinusCircle,
  FaTrash,
  FaShoppingBag,
} from "react-icons/fa";
import { addToCart, deleteFromCart } from "../actions/cartAction";

const CartPage = () => {
  const [remarks,setRemarks] = useState("No Remarks on Order")
  const location = useLocation()
  const navigate = useNavigate()
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const dispatch = useDispatch();
  const newValue = cartItems.reduce((x, item) => x + item.price, 0);
  const subTotal = Math.trunc(newValue)
  const pointsPay = cartItems.reduce((x, item) => x + item.pointsPrice, 0);
  useEffect(()=>{
    if(localStorage.getItem("currentSeller") !== null ||undefined || ""){
      navigate('/sellerUserSelection')
    }
  },[location,cartState,subTotal,navigate ])

  return (
    <div>
      <Breakcrumb id={"Cart"} />
      <div className="container md:grid grid-cols-2 gap-2">
        <div className="grid-cols-6 md:border-0 rounded border-2 p-1 md:p-0 divide-y divide-gray-200 items-center">
          <h2 className="text text-lg">My Cart Items</h2>
          {cartItems && cartItems.map((item, index) => (
            <div className="flex " key={index}>
              <div>
                  <Link className="hover:text-primary" to={item.pointsPage === true? `/pointproducts/${item._id}`:`/products/${item._id}`} state={{medicine:item.medicine}}>
                <div>
                  {item.name}
                </div>
                  </Link>
                {item.pointsPage === true ?
                <div>
                  Points: {item.quantity} X {item.points} = {item.pointsPrice}
                </div>
                  :
                  <div>
                  Price: {item.quantity} X {item.price} = {item.price}
                </div>
                }
                <div className="flex self-center">
                  Quantity:
                  <FaMinusCircle
                    className="text-secondary mx-1 hover:cursor-pointer"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity - 1)
                      );
                    }}
                  />
                  <input placeholder={item.quantity} className="w-8" />
                  <FaPlusCircle
                    className="ml-1 text-green-600 hover:cursor-pointer"
                    onClick={() => {
                      dispatch(addToCart(item, item.quantity + 1));
                    }}
                  />
                </div>
              </div>
              <div>
                {" "}
                <img
                  alt={item.name}
                  src="/images/1.png"
                  className="w-20 h-20"
                />{" "}
              </div>
              <div className="items-center">
                <FaTrash
                  className=" text-secondary hover:cursor-pointer items-center"
                  onClick={() => {
                    dispatch(deleteFromCart(item));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="grid-cols-2 md:pt-0 pt-2">
          <h2 className="text-lg font-semibold">Payment Information</h2>
          <div>
            <h3 className="text-lg">Sub Total</h3>
          </div>
          <div>Rs: {subTotal}/-</div>
          <div>{!pointsPay ? 0 : pointsPay} Points</div>
          <textarea placeholder={ remarks} onChange={(e)=>setRemarks(e.target.value)} className="w-full h-20 border-2 border-primary rounded "  />
          <div className="flex gap-2 border-b border-gray-200 pb-5 mt-6">
            <Link
              to={"/checkout"}
              state={{ subTotal: subTotal, remarks:remarks, pointsPay:!pointsPay? 0:pointsPay}}
              className=" flex items-center gap-2 border border-primary bg-primary text-white px-8 py-2 font-medium rounded uppercase hover:bg-transparent hover:text-primary transition"
            >
              <FaShoppingBag />
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
