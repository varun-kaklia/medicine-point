import React, {useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Product from "./Product";
import { getAllMedicines } from "../actions/medicineAction";

const ProductContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const medicineState = useSelector((state) => state.getAllMedicineReducer);
  const { medicines } = medicineState;
  useLayoutEffect(()=>{
    const limit = 4
    const page =1
    dispatch(getAllMedicines(limit,page))
  },[location,dispatch])
  return (
    <div>
      <div className=" pb-16 pt-4">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6 ">
          Top New Arrival
        </h2>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
          {medicines && medicines?.medicines?.slice(0, 4).map((medicine,index) => (
          <div key={index}>
              <Product medicine={medicine} />
              </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
