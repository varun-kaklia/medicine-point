import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartAction";
import Star from "../elements/Star";

const ShopPageProducts = ({ medicine }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(medicine, quantity));
  };

  return (
    <>
    <div className="hidden md:block">
    <div className="gap-6 w-[33%] float-left px-2 py-2">
      <div className="bg-white shadow rounded overflow-hidden group">
        <Link to={`/products/${medicine && medicine?._id}`} state={{medicine:medicine}}>
          <div className="relative">
            <img src={medicine.image ? `/images/upload/${medicine.image}`: `/images/upload/1.png`} alt={`Medicine Point- ${medicine.name}`} className="w-full md:h-64 h-52" />
          </div>
        </Link>
        <div className="pt-4 pb-3 px-4">
          <Link to={`/products/${medicine && medicine._id}`} state={{medicine:medicine}}>
            <h4 className="uppercase overflow-hidden h-8 font-medium text-xl mb-2 text-gray-800 hover:text-secondary transition">
              {medicine && medicine.name}
            </h4>
          </Link>
          <div className="flex items-baseline mb-1 space-x-2 ">
            <p className="text-xl text-primary font-semibold">
              {medicine && medicine.Rate * quantity}
            </p>
            <p className="text-sm text-gray-400 line-through ">
              {medicine && medicine.MRP * quantity}
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex gap-1 text-sm text-yellow-400">
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            </div>
            <div className="text-sx text-gray-500 ml-3">(150)</div>
          </div>
        </div>
        <div className="flex justify-between px-4">
          <div className="text-md text-gray-800 uppercase mb-1 ">Quantity</div>
          <div className="flex h-6 ml-4  border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max mb-0">
            <div
              className="h-6 w-6 flex text-xl items-center justify-center cursor-pointer select-none"
              onClick={() =>
                quantity !== 0 ? setQuantity(quantity - 1) : null
              }
            >
              -
            </div>
            <input
              className="h-6 w-6 flex text-base text-center  justify-center"
              placeholder={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
            />

            <div
              className="h-6 w-6 flex text-xl items-center justify-center cursor-pointer select-none"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </div>
          </div>
        </div>
        <button
          onClick={() => addToCartHandler()}
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
    </div>
    <div className="md:hidden py-2 my-4 shadow p-1" >
    <Link to={`/products/${medicine && medicine?._id}`} state={{medicine:medicine}}>
      <div className="flex justify-between">
      <div className="text-gray-700 font-semibold text-lg pr-2 w-64">{medicine.name}</div>
      <div className="text-gray-700 font-semibold text-lg">Price: ₹{medicine.Rate}</div>
      </div>
      <div className="flex justify-between">
      <div className="text-gray-500 text-sm">{medicine.company}</div>
      <div className="text-gray-500 text-sm">MRP ₹{medicine.MRP}</div>
      </div>
      <div className="flex justify-between">
      <div className="text-gray-500 text-sm">Exp {medicine.exp?medicine.exp:"NA"}</div>
      <div className="text-gray-500 text-sm">{medicine.dailyOfferPage?"Offer Available":"No Offer"}</div>
      <div className={`text-sm ${medicine.stock>0? `text-green-500`:`text-red-600`}`}>Available Qty: {medicine.stock}</div>
      </div>
    </Link>
      <div className="flex justify-between py-2 items-center">
      <div className="justify-between flex">
          <div className="text-md text-gray-800 uppercase mb-1 ">Quantity</div>
          <div className="flex h-6 ml-4  border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max mb-0">
            <div
              className="h-6 w-6 flex text-xl items-center justify-center cursor-pointer select-none"
              onClick={() =>
                quantity !== 0 ? setQuantity(quantity - 1) : null
              }
            >
              -
            </div>
            <input
              className="h-6 w-6 flex text-base text-center  justify-center"
              placeholder={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
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
          onClick={() => addToCartHandler()}
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded px-4 hover:bg-transparent hover:text-primary transition"
        >
          Add to Cart
        </button>
        </div>
      </div>

    </div>
    </>
  );
};

export default ShopPageProducts;
