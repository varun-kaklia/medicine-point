import React, { useEffect, useLayoutEffect, useState } from 'react'
import {GrStatusGood} from 'react-icons/gr'
import {MdDeleteOutline} from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { searchMedicine, updateForProduct,getPointsPageData } from "../../actions/medicineAction";

const AdminPoints = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('')
  const [points, setPoints] = useState('1000')
  const medicineState = useSelector((state) => state.getPointsPageDataReducer);
  const { medicines } = medicineState;
  const productSearchState = useSelector((state) => state.getSearchMedicineReducer);
  const { searchMedicines } = productSearchState;

  console.log("Points", points)

  useLayoutEffect(() => {
    dispatch(getPointsPageData())
  }, [dispatch]);
  
  useEffect(()=>{
    if(search.length>0){
      dispatch(searchMedicine(search))
    }
  },[search, dispatch])

  return (
        <div>
      <div className="mt-10 md:mt-0">
        <div className='md:py-0 py-4 md:pb-4'>
          <div className='flex items-center'>
          <input
            type="search"
            className=' border-primary rounded-tl rounded-bl border-r-0'
            placeholder='Search Medicine'
            onChange={(e)=>setSearch(e.target.value.toLowerCase())}
          />
          <div className='border-primary border border-l-0 p-2 rounded-r'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          </div>
          </div>
        <div>
      {/* window list */}
      {search === "" ? null : (
        <div className="absolute bg-gray-100 mt-1 w-max p-2 shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto ">
          {searchMedicines &&
            searchMedicines
              .filter((medicine) => {
                return search.toLowerCase() === ""
                  ? null
                  : medicine.name.toLowerCase().includes(search);
              })
              .map((medicine, index) => {
                return (
                  <div className="p-2" key={index}>
                  <div
                    className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                    key={medicine._id}
                  >
                      <button
                        onClick={() => {
                          dispatch(updateForProduct(medicine._id,medicine.name,{pointPageValue:true},{points:points}))}
                        }
                        >{medicine.name}</button>
                  </div>
                  </div>
                );
              })}
        </div>
      )}</div>
        </div>
        <div>
          <table className="table-auto border p-2 w-full">
            <thead  className="divide-y divide-x divide-gray-500">
              <tr>
                <th className="px-2">Medicine Image</th>
                <th className="px-2">Medicine Name</th>
                <th className="px-2">Points</th>
                {/* <th className="px-1">Category</th> */}
                {/* <th className="px-1">Salt</th> */}
                {/* <th className="px-1">Company</th> */}
                <th className="px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines &&
                medicines.map((medicine, index) => (
                  <tr key={index} className="text-center">
                    <td className='flex justify-center'>
                      <img alt='Medicine Point- Medicine Wholeseller in Noida .!' src={!medicine.image ? "../images/1.png": "../images/upload/"+ medicine.image} width={125} height={125} className="rounded-sm"/>
                    </td>
                    <td>{medicine.name}</td>
                    <td className='text-center'>
                      <input
                        placeholder={medicine.points? medicine.points: points}
                        className="text-center w-16 border-primary border rounded"
                        onChange={(e)=>setPoints(e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <div className='flex justify-center'>
                      <MdDeleteOutline
                        onClick={() => {
                          dispatch(updateForProduct(medicine._id,medicine.name,{pointPageValue:false},{points:points}))}
                        }
                        size={20}
                        className="text-red-600 md:mx-2 mx-1 hover:cursor-pointer"
                      />
                      <GrStatusGood
                        onClick={() => {
                          dispatch(updateForProduct(medicine._id,medicine.name,{pointPageValue:true},{points:points}))}
                        }
                        size={20}
                        className="text-green-600 md:mx-2 mx-1 hover:cursor-pointer"
                      />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
}

export default AdminPoints