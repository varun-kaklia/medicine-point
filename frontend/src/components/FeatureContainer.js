import React from "react";

const FeatureContainer = () => {
  return (
    <div>
      <div className="container py-8 sm:py-12 ">
        <div className="w-10/12 sm:grid grid-cols-3 gap-6 mx-auto justify-center ">
          {/* <div className="border border-primary rounded-sm px-1 py-5 flex justify-center items-center gap-5">
            <img
              src="/images/1.png"
              alt="Test Image for MedicinePoint"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">Free Shipping</h4>
              <p className="text-gray-500 text-sm">Order Over Rs.500</p>
            </div>
          </div> */}
          <div className="border border-primary rounded-sm px-1 py-5 flex justify-center items-center gap-5">
            <img
              src="/images/1.png"
              alt="Medicine Point- Medicine Wholeseller in Noida..!"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">
                Money Guarantee
              </h4>
              <p className="text-gray-500 text-sm">100% Money Guarantee</p>
            </div>
          </div>
          <div className="border border-primary rounded-sm px-1 py-5 flex justify-center items-center gap-5">
            <img
              src="/images/1.png"
              className="w-12 h-12 object-contain"
              alt="Medicine Point- Medicine Wholeseller in Noida..!"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">
                100% Genuine Medicine
              </h4>
              <p className="text-gray-500 text-sm">
                100% genuine quality of Medicine
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureContainer;
