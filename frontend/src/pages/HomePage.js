import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import CategorySection from "../components/CategorySection";
import FeatureContainer from "../components/FeatureContainer";
import { getAllMedicines } from "../actions/medicineAction";
import Product from "../components/Product";
import { getSliderImage } from "../actions/sliderAction";

const HomePage = () => {
  const dispatch = useDispatch();
  const medicineState = useSelector((state) => state.getAllMedicineReducer);
  const { loading, medicines, error } = medicineState;
  const getSliderImages = useSelector((state)=>state.getSliderImageReducer)
  const {sliderImage} = getSliderImages

  useLayoutEffect(() => {
    const limit = 8
    const page = 1
    dispatch(getAllMedicines(limit,page));
    dispatch(getSliderImage())
  }, [dispatch]);

  const sliceMedicine = medicines && medicines?.medicines?.slice(0, 8)

  return (
    <div>
      <Banner sliderImage={sliderImage && sliderImage} />
      <div className="hidden lg:block">
      <FeatureContainer />
      </div>
      <CategorySection />
      {/* <ProductContainer /> */}
      <div className="container sm:pb-16">
        {loading ? (
          <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
            Loading New Arrival
          </h2>
        ) : error ? (
          <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
            Error While Loading Medicines
          </h2>
        ) : (
          <div>
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
              Top New Arrival
            </h2>
            <div>
              <div className="grid grid-cols-2 sm:grid sm:grid-cols-4 pb-2 sm:pb-0 gap-6">
                {sliceMedicine && sliceMedicine?.map((medicine) => (
                  <div key={medicine._id}>
                    <Product medicine={medicine && medicine} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
