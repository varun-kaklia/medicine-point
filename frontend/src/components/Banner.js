import React from "react";
import { Link } from "react-router-dom";

const Banner = ({sliderImage}) => {
  return (
    <div className="md:container w-full h-fit md:h-full">
      <div
        className="bg-cover bg-center  bg-no-repeat md:bg-cover md:bg-left py-20 md:py-56 md:pt-96"
        style={{ backgroundImage: `url(./images/${sliderImage ? sliderImage.image : `banner2.jpg`})` }}
      >
        <div className="container text-left">
          <div className="mt-24 ml-6 md:mt-12 md:ml-24">
            <Link
              to="/shop"
              className="bg-secondary border border-secondary text-white px-2 py-1 md:px-8 md:py-3 font-medium rounded-md hover:bg-transparent hover:text-secondary"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
