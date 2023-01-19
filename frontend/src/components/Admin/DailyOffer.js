import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {GrStatusGood} from 'react-icons/gr'
import {MdDeleteOutline} from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { getDailyOfferPageData, updateForDailyOffer,searchMedicine } from "../../actions/medicineAction";

const DailyOffer = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [dailyRegularPrice, setDailyRegularPrice] = useState('1000')
  const medicineState = useSelector((state) => state.getDailyOfferPageDataReducer);
  const { medicines } = medicineState
  const productSearchState = useSelector((state) => state.getSearchMedicineReducer);
  const { searchMedicines } = productSearchState;

  useEffect(() => {
    dispatch(getDailyOfferPageData())
  }, [dispatch,location]);
  useEffect(()=>{
    if(search.length>0){
      dispatch(searchMedicine(search))
    }
  },[dispatch,search])


  return (
      <div>
      <div className="mt-10 md:mt-0">
        <div className='py-4 '>
          <div className='flex items-center'>
          <input
            type="search"
            className='border-r-0 border-primary rounded-tl rounded-bl'
            placeholder='Search Medicine'
            onChange={(e)=>setSearch(e.target.value.toLowerCase())}
          />
          <div className='border-y p-2 rounded-tr rounded-br border-r text-primary border-primary'>
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
                          dispatch(updateForDailyOffer(medicine._id,medicine.name,{dailyOfferPage:true},{dailyRegularPrice:dailyRegularPrice}))}
                        }
                        >{medicine.name}</button>
                  </div>
                  </div>
                );
              })}
        </div>
      )}</div>
        </div>
        <div className='w-full'>
          <table className="table-auto w-full border p-2">
            <thead  className="divide-y divide-x divide-gray-500">
              <tr>
                <th className="p-2">Medicine Image</th>
                <th className="p-2">Medicine Name</th>
                <th className="p-2">RegularPrice</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines &&
                medicines?.map((medicine, index) => (
                  <tr key={index} className="text-center">
                    <td className='flex justify-center'>
                      <img src={!medicine.image ? "../images/1.png": "../images/upload/"+ medicine.image} width={100} height={100} className="rounded-sm" alt='Medicine Point- Medicine Wholeseller in Noida..!'/>
                    </td>
                    <td>{medicine && medicine.name}</td>
                    <td>
                      <input
                        placeholder={medicine.dailyRegularPrice ? medicine.dailyRegularPrice: dailyRegularPrice}
                        className="text-center w-16  border-2 rounded"
                        onChange={(e)=>setDailyRegularPrice(e.target.value)}
                      />
                    </td>
                    <td >
                      <div className='flex justify-center'>
                      <MdDeleteOutline
                        onClick={() => {
                          dispatch(updateForDailyOffer(medicine._id,medicine.name,{dailyOfferPage:false},{dailyRegularPrice:dailyRegularPrice}))}
                        }
                        size={20}
                        className="text-red-600 mx-2 hover:cursor-pointer"
                      />
                      <GrStatusGood
                        onClick={() => {
                          dispatch(updateForDailyOffer(medicine._id,medicine.name,{dailyOfferPage:true},{dailyRegularPrice:dailyRegularPrice}))}
                        }
                        size={20}
                        className="text-green-700 mx-2 hover:cursor-pointer"
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

export default DailyOffer