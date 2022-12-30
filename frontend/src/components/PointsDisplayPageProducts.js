import React, { useEffect, useState }  from "react";
import Breadcrumb from "../components/Breakcrumb";
import {
  FaPhoneAlt,
  FaShoppingBag,
  FaStar,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ProductContainer from "../components/ProductContainer";
import { useParams, useLocation } from "react-router-dom";
import { addToCart } from "../actions/cartAction";

const PointsDisplayPageProducts = () => {
    const [quantity, setQuantity] = useState(1);
    const [image, setImage] = useState("")
    const dispatch = useDispatch();
    const { state } = useLocation()
    const { medicine } = state
    console.log('Medicine', medicine)
    const { id } = useParams()

    const userState = useSelector((state) => state.loginUserReducer)
    const {currentUser} = userState
    

  
  console.log('Params id:-',id)
    const addToCartHandler = () => {
    if(currentUser.points>medicine.points){
        dispatch(addToCart(medicine, quantity))
    } else {
        alert("You don't have enought Points..")
        }
        
  };

  return (
    <div>
      <Breadcrumb id={`Shop >> ${medicine.name}`} />
      <div className="container md:grid grid-cols-2 gap-6">
        <div>
          <img src={!medicine.image ? "/images/upload/1.png": `/images/upload/${medicine.image}`} className="w-full"  alt="Medicine Point- Medicine Wholeseller in Noida..!" />
          <div className="grid grid-cols-5 gap-4 mt-4">
            <img
              src={!medicine.image ? "/images/upload/1.png": `/images/upload/${medicine.image}`}
              // src={medicine?.name==="AZAX 500MG 20X3T"? "/images/azax500/1.jpg" : medicine?.name==="WALKER ZENETRA 1"? "/images/zenetra/1.jpg"  : image}
              className="w-full cursor-pointer border border-primary"
              alt="Medicine Point- Medicine Wholeseller in Noida..!"
            />
            {/* <img src={medicine?.name === "AZAX 500MG 20X3T" ? "/images/azax500/2.jpg" : medicine?.name === "WALKER ZENETRA 1" ? "/images/zenetra/1.jpg" : image}
              onClick={(e) => setImage(e.target.src)}
              className="w-full cursor-pointer" />
            <img src={medicine?.name === "AZAX 500MG 20X3T" ? "/images/azax500/3.jpg" : medicine?.name === "WALKER ZENETRA 1" ? "/images/zenetra/1.jpg" : image}
              onClick={(e) => setImage(e.target.src)}
              className="w-full cursor-pointer" />
            <img src={medicine?.name === "AZAX 500MG 20X3T" ? "/images/azax500/1.jpg" : medicine?.name === "WALKER ZENETRA 1" ? "/images/zenetra/1.jpg" : image}
              onClick={(e)=>setImage(e.target.src)}
              className="w-full cursor-pointer" />
            <img src={medicine?.name === "AZAX 500MG 20X3T" ? "/images/azax500/2.jpg" : medicine?.name === "WALKER ZENETRA 1" ? "/images/zenetra/1.jpg" : image}
              onClick={(e)=>setImage(e.target.src)}
              className="w-full cursor-pointer" /> */}
          </div>
        </div>
        <div className="">
          <h2 className="text-3xl font-medium uppercase mb-2">{medicine?.name}</h2>
          <div className="flex items-center mb-4">
            <div className="flex gap-1 text-sm text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            {/* <div className="text-xs text-gray-500 ml-3">(160 Reviews)</div> */}
          </div>
          <div>
            <div className="text-gray-800 font-semibold space-x-2">
              <span>Availability:</span>
              {medicine?.stock >0?
              <span className="text-green-600">In Stock: {medicine?.stock}</span>
              :
              <span className="text-red-600">Out of Stock: {medicine?.stock}</span>
              }
            </div>
            <div className="text-gray-800 font-semibold space-x-2">
              <span>Brand:</span>
              <span className="text-gray-600">{medicine?.company}</span>
            </div>
            <div className="text-gray-800 font-semibold space-x-2">
              <span>Salt:</span>
              <span className="text-gray-600">{medicine?.Salt}</span>
            </div>
            <div className="text-gray-800 font-semibold space-x-2">
              <span>HSN:</span>
              <span className="text-gray-600">MEDICINEPOINT66</span>
            </div>
            {/* <div className="text-gray-800 font-semibold space-x-2">
              <span>Product Code:</span>
              <span className="text-gray-600">{medicine&&medicine?.code}</span>
            </div> */}
          </div>
          <div className="flex items-baseline mb-1 space-x-2 mt-4">
            <p className="text-2xl text-primary font-semibold">{medicine?.points * quantity} Points</p>
            {/* <p className="text-base text-gray-400 line-through ">Rs.{medicine?.MRP}</p> */}
          </div>
          <p className="mt-4">
            This is testing product so information may changes after sometime.
            So don't rely on these information.
          </p>
          <div>
            <div className="text-md text-gray-800 uppercase mb-1 mt-4">
              Quantity
            </div>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
              <div className="h-8 w-8 flex text-xl items-center justify-center cursor-pointer select-none"
                            onClick={() =>
                              quantity <= 1 ? null : setQuantity(quantity - 1)
                            }>
                -
              </div>
              <div className="h-8 w-8 flex text-base items-center justify-center">
                {quantity}
              </div>
              <div className="h-8 w-8 flex text-xl items-center justify-center cursor-pointer select-none"
                            onClick={() => setQuantity(quantity + 1)}>
                +
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-b border-gray-200 pb-5 mt-6">
            <button
              to="/checkout"
              onClick={() => addToCartHandler()}
              className=" flex items-center gap-2 border border-primary bg-primary text-white px-8 py-2 font-medium rounded uppercase hover:bg-transparent hover:text-primary transition"
            >
              <FaShoppingBag />
              Add To Cart
            </button>
            <a
              href="tel:+919717407466"
              className=" flex items-center gap-2 border border-primary bg-primary text-white px-8 py-2 font-medium rounded uppercase hover:bg-transparent hover:text-primary transition"
            >
              <FaPhoneAlt />
              Call Us
            </a>
            {/* <a
              href="#"
              className=" flex items-center gap-2 border text-gray-600 border-gray-300  px-8 py-2 font-medium rounded uppercase  hover:text-primary transition"
            >
              <FaHeart />
              Wishlist
            </a> */}
          </div>
{/* 
          <div className="flex gap-3 mt-4">
            <a className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 items-center justify-center text-center">
              <FaFacebook />
            </a>
            <a className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 items-center justify-center">
              <FaTwitter />
            </a>
            <a className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 items-center justify-center">
              <FaInstagram />
            </a>
            <a className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 items-center justify-center">
              <FaLinkedin />
            </a>
          </div> */}
        </div>
      </div>
      <div className="container pb-16">
        <h3 className="border-b border-gray-400 font-roboto text-gray-800 pb-3 font-bold text-xl">
          Product Details
        </h3>
        <div className="md:w-3/5 pt-6">
          <div className="text-gray-600 space-y-3">
            <p>
              This is testing paragraph for our medicine. This is testing
              paragraph for our medicine. This is testing paragraph for our
              medicine. This is testing paragraph for our medicine. This is
              testing paragraph for our medicine. This is testing paragraph for
              our medicine. This is testing paragraph for our medicine.
            </p>
            <p>
              This is testing paragraph for our medicine. This is testing
              paragraph for our medicine. This is testing paragraph for our
              medicine. This is testing paragraph for our medicine. This is
              testing paragraph for our medicine. This is testing paragraph for
              our medicine. This is testing paragraph for our medicine.
            </p>
            <p>
              This is testing paragraph for our medicine. This is testing
              paragraph for our medicine. This is testing paragraph for our
              medicine. This is testing paragraph for our medicine. This is
              testing paragraph for our medicine. This is testing paragraph for
              our medicine. This is testing paragraph for our medicine.
            </p>
          </div>
          <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
            <tbody>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Packet
                </th>
                <td className="py-2 px-4 border border-gray-300 ">100X11</td>
              </tr>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Packet
                </th>
                <td className="py-2 px-4 border border-gray-300 ">100X11</td>
              </tr>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Packet
                </th>
                <td className="py-2 px-4 border border-gray-300 ">100X11</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ProductContainer />
      </div>
    </div>
  );
};

export default PointsDisplayPageProducts;
