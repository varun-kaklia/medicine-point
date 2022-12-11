import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  return (
    <div>
      <div className="container pb-12 pt-4 text-left">
        <h2 className="text-3xl font-medium text-gray-800 uppercase mb-6">
          Shop by Brand
        </h2>
        <div className="sm:grid sm:grid-cols-3 gap-3">
          <div className="relative rounded-sm overflow-hidden group bottom-2 sm:bottom-0">
            <img
              src="/images/todayOffer.jpeg"
              alt="Medicine Point- Cipla Brand Wise Medicines"
              className="w-full h-52"
            />
            <Link
              to="/offer"
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium hover:bg-opacity-50 transition"
            >
              Today's Offer
            </Link>
          </div>
          <div className="relative rounded-sm overflow-hidden group">
            <img
              src="/images/cipla.png"
              alt="Test Category in Medicine Point"
              className="w-full h-52"
            />
            <Link
              to="/shop"
              state={{newBrand:"CIPLA GENERIC"}}
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium hover:bg-opacity-50 transition"
            >
              Cipla
            </Link>
          </div>
          <div className="relative rounded-sm overflow-hidden group top-2 sm:top-0">
            <img
              src="/images/alkem.png"
              alt="Test Category in Medicine Point"
              className="w-full h-52"
            />
            <Link
              to="/shop"
              state={{newBrand:"ALKEM"}}
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium hover:bg-opacity-50 transition"
            >
              Alkem
            </Link>
          </div>
          <div className="relative rounded-sm overflow-hidden group top-4 sm:top-0">
            <img
              src="/images/eris.png"
              alt="Test Category in Medicine Point"
              className="w-full h-52"
            />
            <Link
              to="/shop"
              state={{newBrand:"ERIS"}}
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium hover:bg-opacity-50 transition"
            >
              Eris
            </Link>
          </div>
          <div className="relative rounded-sm overflow-hidden group top-6 sm:top-0">
            <img
              src="/images/zenetra.jfif"
              alt="Test Category in Medicine Point"
              className="w-full h-52"
            />
            <Link
              to="/shop"
              state={{newBrand:"ZENETRA"}}
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium hover:bg-opacity-50 transition"
            >
              Zenetra
            </Link>
          </div>
          <div className="relative rounded-sm overflow-hidden group top-8 sm:top-0">
            <img
              src="/images/flamingo.jpg"
              alt="Test Category in Medicine Point"
              className="w-full h-52"
            />
            <Link
              to="shop"
              state={{newBrand:"FLAMINGO"}}
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium hover:bg-opacity-50 transition"
            >
              Flamingo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
