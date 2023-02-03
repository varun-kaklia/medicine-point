import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Breakcrumb from "../components/Breakcrumb";
import { FaAddressCard, FaGift, FaCoins } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";
import { logoutSeller } from "../actions/sellerAction";
import { searchMedicine } from "../actions/medicineAction";
import {
  addToCart,
  deleteFromCart,
  flushFromCart,
} from "../actions/cartAction";
import { placeSellerOrder } from "../actions/orderAction";

const SellerOrderCreation = () => {
  const [user, setUser] = useState("");
  const [remarks, setRemarks] = useState("Enter Remarks on Order");
  const [quantity, setQuantity] = useState(1);
  const [getMedicine, setGetMedicine] = useState("");
  const dispatch = useDispatch();
  const sellerState = useSelector((state) => state.loginSellerReducer);
  const { currentSeller } = sellerState;
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;

  const productSearchState = useSelector(
    (state) => state.getSearchMedicineReducer
  );
  const { searchMedicines } = productSearchState;

  const newValue = cartItems.reduce((x, item) => x + item.price, 0);
  const subTotal = Math.trunc(newValue);

  const addToCartHandler = (medicine) => {
    dispatch(addToCart(medicine, quantity));
  };

  const createOrderHandler = (e) => {
      e.preventDefault()
      dispatch(placeSellerOrder(subTotal, remarks, user));
      dispatch(flushFromCart());
      localStorage.removeItem("party");
      window.location.href = "/myaccount";
  };

  useEffect(() => {
    if (getMedicine.length > 0) {
      dispatch(searchMedicine(getMedicine));
    }
  }, [getMedicine]);

  useLayoutEffect(() => {
    setUser(JSON.parse(localStorage.getItem("party")));
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("currentSeller") === null || undefined || "") {
      window.location.href = "/sellerlogin";
    }
    if (localStorage.getItem("party") === null || undefined || "") {
      window.location.href = "/sellerUserCreation";
    }
  }, []);

  useLayoutEffect(() => {
    if (currentSeller && currentSeller.type !== "S") {
      return (window.location.href = "/deliverOrder");
    }
  }, [currentSeller]);
  return (
    <div>
      <Breakcrumb id={"Seller Order Creation"} />
      <div className="container md:grid grid-cols-12 items-start pt-4 gap-6 pb-16">
        <div className="col-span-3">
          <div className="px-4 py-3 shadow items-center gap-4">
            <div className="flex items-center">
              <div>
                <img
                  src="/images/1.png"
                  alt="Medicine Point- Medicine Wholseller in Noida"
                  className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover "
                />
              </div>
              <div className="flex-grow flex pl-2">
                <p className="text-gray-600">Hello,</p>
                <h4 className="text-gray-400 px-1 font-medium">
                  {currentSeller && currentSeller?.name}
                </h4>
              </div>
            </div>
            {/* <div className='flex'><label className='font-xs'>Rs.1001</label></div> */}
          </div>
          <div className="mt-6 divide-gray-200 space-y-4 text-gray-600 divide-y bg-white shadow rounded p-4">
            {currentSeller && (
              <>
                <div className="space-y-1 pl-8">
                  <Link
                    to="/myaccount"
                    href="#"
                    className={`relative hover:text-primary block capitalize transition`}
                  >
                    <span className="absolute -left-8 top-0 text-base">
                      <FaAddressCard />
                    </span>
                    Seller Panel
                  </Link>
                </div>
                <div className="pt-4 space-y-1 pl-8">
                  <Link
                    to="/sellerUserSelection"
                    className="relative hover:text-primary block font-medium capitalize transition"
                  >
                    <span className="absolute -left-8 top-0 text-base">
                      <FaGift />
                    </span>
                    Create Order
                  </Link>
                </div>
                <div className="space-y-1 pt-4 pl-8">
                  <Link
                    to="/sellerOrder"
                    href="#"
                    className="relative hover:text-primary block capitalize transition"
                  >
                    <span className="absolute -left-8 top-0 text-base">
                      <FaCoins />
                    </span>
                    Old Order
                  </Link>
                </div>
                <div className="space-y-1 pt-4 pl-8">
                  <Link
                    to="/deliverOrder"
                    href="#"
                    className="relative hover:text-primary block capitalize transition"
                  >
                    <span className="absolute -left-8 top-0 text-base">
                      <GrDeliver />
                    </span>
                    Deliver Order
                  </Link>
                </div>
              </>
            )}
            <div className="pt-4 space-y-1 pl-8">
              {currentSeller && (
                <Link
                  to="#"
                  onClick={() => {
                    dispatch(logoutSeller());
                  }}
                  className="relative hover:text-primary block font-medium capitalize transition"
                >
                  <span className="absolute -left-8 top-0 text-base">
                    <AiOutlineLogout />
                  </span>
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-9 md:grid md:mt-0 mt-10 grid-cols-1 gap-4">
          <div className="shadow rounded bg-white pt-6 pb-4 px-4">
            <div className="flex items-center mb-4 justify-center">
              <h3 className="font-medium text-gray-800 text-lg">
                Seller Order Creation
              </h3>
            </div>
          </div>
          <div className="justify-end flex py-2">
            <span className="px-2">Total:</span>
            <span className="px-2">{Math.trunc(subTotal)}</span>
          </div>
          <div className="md:grid mt-4 grid-cols-1 gap-4">
            <div className="shadow rounded bg-white pt-6 pb-4 px-4">
              <div className="">
                <input
                  type="text"
                  className="rounded w-full"
                  onChange={(e) => setGetMedicine(e.target.value.toLowerCase())}
                  placeholder="Enter Medicine Name"
                />
              </div>
              <div className="py-2 shadow rounded h-80 px-2 mt-4 overflow-y-scroll">
                {searchMedicines &&
                  searchMedicines?.map((medicine) => (
                    <div className="py-2 my-4 shadow p-1" key={medicine._id}>
                      <div>
                        <div className="flex justify-between">
                          <div className="text-gray-700 font-semibold text-lg pr-2 w-64">
                            {medicine.name}
                          </div>
                          {/* <Link to={`/products/${medicine && medicine?._id}`} state={{medicine:medicine}}>
                  </Link> */}
                          <div className="text-gray-700 font-semibold text-lg">
                            Price: ₹{medicine.Rate}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-gray-500 text-sm">
                            {medicine.company}
                          </div>
                          <div className="text-gray-500 text-sm">
                            MRP ₹{medicine.MRP}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-gray-500 text-sm">
                            Exp {medicine.exp ? medicine.exp : "NA"}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {medicine.dailyOfferPage
                              ? "Offer Available"
                              : "No Offer"}
                          </div>
                          <div
                            className={`text-sm ${
                              medicine.stock > 0
                                ? `text-green-500`
                                : `text-red-600`
                            }`}
                          >
                            Available Qty: {medicine.stock}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between py-2 items-center">
                        <div className="justify-between flex">
                          <div className="text-md text-gray-800 uppercase mb-1 ">
                            Quantity
                          </div>
                          <div className="flex h-6 ml-4  border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max mb-0">
                            <div
                              className="h-6 w-6 flex text-xl items-center justify-center cursor-pointer select-none"
                              onClick={() =>
                                quantity !== 0
                                  ? setQuantity(quantity - 1)
                                  : null
                              }
                            >
                              -
                            </div>
                            <input
                              className="h-6 w-6 flex text-base text-center  justify-center"
                              placeholder={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            />

                            <div
                              className="h-6 w-6 flex text-xl items-center justify-center cursor-pointer select-none"
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              +
                            </div>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => addToCartHandler(medicine)}
                            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded px-4 hover:bg-transparent hover:text-primary transition"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* {getMedicine === "" ? null : (
                  <div className="absolute bg-gray-100 mt-1 w-max p-2 shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto ">
                    {searchMedicines &&
                      searchMedicines?.map((medicine, index) => {
                          return (
                            <div className="p-2" key={index}>
                            <button  onClick={() =>{
                            setSelectedMedicine(medicine)
                            setShowModal(true)}
                            }>
                              {medicine.name}
                            </button>
                            </div>
                          );
                        })}
                  </div>
                )} */}
              </div>
              <h3 className="mt-4 px-2 font-semibold text-lg">
                Selected Items:
              </h3>
              {cartItems &&
                cartItems.map((item, index) => (
                  <div
                    id="order"
                    key={index}
                    className="flex w-full justify-between mt-1 border rounded shadow-md p-2"
                  >
                    <div>
                      <Link
                        className="hover:text-primary"
                        to={
                          item.pointsPage === true
                            ? `/pointproducts/${item._id}`
                            : `/products/${item._id}`
                        }
                        state={{ medicine: item.medicine }}
                      >
                        <div>{item.name}</div>
                      </Link>
                      {item.pointsPage === true ? (
                        <div>
                          Points: {item.quantity} X {item.points} ={" "}
                          {item.pointsPrice}
                        </div>
                      ) : (
                        <div>
                          Price: {item.quantity} X {Math.trunc(item.price)} ={" "}
                          {Math.trunc(item.quantity * item.price)}
                        </div>
                      )}
                      <div className="flex self-center">
                        Quantity:
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => {
                            dispatch(addToCart(item, item.quantity - 1));
                          }}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-secondary mx-1 hover:cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <input
                          placeholder={item.quantity}
                          className="w-8 text-center"
                        />
                        <svg
                          onClick={() => {
                            dispatch(addToCart(item, item.quantity + 1));
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 ml-1 text-green-600 hover:cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="self-center">
                      <svg
                        onClick={() => {
                          dispatch(deleteFromCart(item));
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 right-0 h-6 text-secondary hover:cursor-pointer items-center"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              <div className="mt-4">
                <textarea
                  name="remarks"
                  onChange={(e) => setRemarks(e.target.value)}
                  className="border rounded w-full p-2 h-16"
                />
              </div>
            </div>
          </div>
          <div className=" text-center mt-4">
            <button
              className="px-6 bg-primary text-gray-100 border rounded-md py-2 hover:bg-transparent hover:border-secondary hover:text-primary transition"
              onClick={(e) => createOrderHandler(e)}
            >
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderCreation;
