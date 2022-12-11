import React, {useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import {getAllMedicines} from '../actions/medicineAction'
import DailyOfferProducts from "./DailyOfferProducts";

const DailyOfferPage = () => {
  const dispatch = useDispatch()
  const medicineState = useSelector((state) => state.getAllMedicineReducer);
  const { medicines } = medicineState;
  // console.log("Medicine State", medicines )
  
  useEffect(() => {
    dispatch(getAllMedicines());
  }, [dispatch]);

  const dailyOfferPage = medicines && medicines?.medicines?.filter((medicine) => {
    return medicine.dailyOfferPage === true
  })

  return <div className="container py-10">
    <h2 className="text-4xl font-extrabold text-primary underline">Daily Offer</h2>
    <div className="grid md:grid-cols-3 grid-cols-2 gap-4 py-4">  
      {
        dailyOfferPage.length > 0 ? 
        dailyOfferPage && dailyOfferPage?.map((medicine, index) =>
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
