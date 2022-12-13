import React, {useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import {getDailyOfferPageData} from '../actions/medicineAction'
import DailyOfferProducts from "./DailyOfferProducts";

const DailyOfferPage = () => {
  const dispatch = useDispatch()
  const medicineState = useSelector((state) => state.getDailyOfferPageDataReducer);
  const { medicines } = medicineState;
  // console.log("Medicine State", medicines )
  
  useEffect(() => {
    dispatch(getDailyOfferPageData());
  }, [dispatch]);


  return <div className="container py-10">
    <h2 className="text-4xl font-extrabold text-primary underline">Daily Offer</h2>
    <div className="grid md:grid-cols-3 grid-cols-2 gap-4 py-4">  
      {
        medicines.length > 0 ? 
        medicines && medicines?.map((medicine, index) =>
            <div key={index}>
              <DailyOfferProducts medicine={medicine}/>
            </div>
        )
        :
        <div>No Offer on Product Available right Now..!</div>
      }
    </div>
  </div>;
};

export default DailyOfferPage;
