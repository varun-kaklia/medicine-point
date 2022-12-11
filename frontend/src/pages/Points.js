import React, {useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import PointPageProducts from "./PointPageProducts";
import {getAllMedicines} from '../actions/medicineAction'

const Points = () => {
  const dispatch = useDispatch()
  const medicineState = useSelector((state) => state.getAllMedicineReducer);
  const { medicines } = medicineState;
  // console.log("Medicine State", medicines )
  
  useEffect(() => {
    dispatch(getAllMedicines());
  }, [dispatch]);

  const pointsPage = medicines && medicines?.medicines?.filter((medicine) => {
    return medicine.pointsPage === true
  })

  // console.log("Points Products in Point Page", pointsPage)
  return <div className="container py-10">
    <h2 className="text-4xl font-extrabold text-primary underline">Points</h2>
    <div className="grid md:grid-cols-3 grid-cols-2 gap-4 py-4">  
      {
        pointsPage.length > 0 ? 
          pointsPage && pointsPage?.map((medicine, index) =>
            <div key={index}>
              <PointPageProducts medicine={medicine}/>
            </div>
        )
        :
        <div>No Points on Product Available..!</div>
      }
    </div>
  </div>;
};

export default Points;
