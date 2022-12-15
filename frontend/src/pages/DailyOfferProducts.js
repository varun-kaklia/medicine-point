import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartAction";
import Star from "../elements/Star";

const DailyOfferProducts = ({ medicine }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
      dispatch(addToCart(medicine, quantity))
  };
  return (
    <div>
      <div className="bg-white shadow rounded overflow-hidden group">
        <div className="pt-4 pb-3 px-4">
          <Link to={`/products/${medicine && medicine._id}`} state={{medicine:medicine}}>
            <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-secondary transition">
              {medicine && medicine.name}
            </h4>
          </Link>
          <div className="flex items-baseline mb-1 space-x-2 ">
            <p className="text-xl text-primary font-semibold">
              Today's Offer: {medicine && medicine.Rate * quantity}
            </p>            
            <p className="text-sm text-gray-400 line-through ">
              Regular Price: {medicine && medicine.dailyRegularPrice * quantity}
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex gap-1 text-sm text-yellow-400">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
            </div>
            <div className="text-sx text-gray-500 ml-3">(150)</div>
          </div>
        </div>
        <div className="flex justify-between lg:px-4 px-2">
          <div className="text-md text-gray-800 uppercase mb-1 ">Quantity</div>
          <div className="flex h-6 lg:ml-4 ml-1 border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max mb-0">
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
  );
};

export default DailyOfferProducts;
