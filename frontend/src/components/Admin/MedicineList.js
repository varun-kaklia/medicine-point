import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { deleteMedicine, getAllMedicines } from "../../actions/medicineAction";

const MedicineList = () => {
  const dispatch = useDispatch();
  // const [medicine, setMedicine] = useState([]);
  const medicineState = useSelector((state) => state.getAllMedicineReducer);
  const { medicines, loading } = medicineState;

  const limit = medicines.total
  // console.log("medicineState", medicines.total);

  useLayoutEffect(() => {
    if(limit){
      dispatch(getAllMedicines(limit));
    }else(
      dispatch(getAllMedicines())
    )
  }, [dispatch]);
  return (
    <div>
      <div className="mt-10 md:mt-0 w-full">
        <h2 className="border shadow text-center p-4 font-medium text-lg">Medicine List</h2>
        <div className="mt-4">
          <table className="table-auto border w-full">
            <thead  className="divide-y divide-x divide-gray-500">
              <tr>
                <th className="px-1 hidden md:block">Medicine Image</th>
                <th className="px-1">Medicine Name</th>
                <th className="px-1">Company</th>
                <th className="px-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading === false ? medicines &&
                medicines?.medicines?.map((medicine, index) => (
                  <tr key={index} className="text-center">
                    <td className=" hidden md:block">
                      <img src={medicine.image ? `/images/upload/${medicine.image}`: `/images/upload/1.png`} width={175} height={175} alt="Medicine Point- Medicine wholeseller in Noida..!" />
                    </td>
                    <td>{medicine.name}</td>
                    <td>{medicine.company}</td>
                    <td>
                      <div className="flex content-between">
                      <button className="mx-2 md:mx-1">
                      <Link to={`/admin/editmedicine/${medicine._id}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                      </Link>
                      </button>
                      <button
                       className="mx-2 md:mx-1"
                      onClick={() => {
                        dispatch(deleteMedicine(medicine._id, medicine.name));
                      }}
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      </button>
                      </div>
                    </td>
                  </tr>
                ))
                :
                <tr className="flex justify-center py-2">
                  <td colSpan={5} >Wait While Medicine are Loaded...</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;
