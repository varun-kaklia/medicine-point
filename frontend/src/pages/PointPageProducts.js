import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartAction";

const PointPageProducts = ({ medicine }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.loginUserReducer)
  const {currentUser} = userState
  // console.log("Current User", currentUser)

  // console.log("Shop Page Products Medicine",medicine)
  // console.log("Medicine", medicine)

  const addToCartHandler = () => {
    if(currentUser.points>medicine.points){
      dispatch(addToCart(medicine, quantity))
    } else {
      alert("You don't have enough points to buy items.")
    }
  };
  return (
    <div>
      <div className="bg-white shadow rounded overflow-hidden group">
        <div className="pt-4 pb-3 px-4">
          <Link to={`/pointproducts/${medicine && medicine._id}`} state={{medicine:medicine}}>
            <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-secondary transition">
              {medicine && medicine.name}
            </h4>
          </Link>
          <div className="flex items-baseline mb-1 space-x-2 ">
            <p className="text-xl text-primary font-semibold">
              {medicine.points === null || undefined || ""? 0 : medicine?.points* quantity} Points
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex gap-1 text-sm text-yellow-400">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#facc15" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              </span>
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#facc15" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              </span>
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#facc15" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              </span>
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#facc15" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              </span>
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#facc15" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              </span>
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

export default PointPageProducts;
