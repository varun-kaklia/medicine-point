import React, { useEffect, useRef, useState } from 'react'
import { getAllMedicines, getCompany } from '../actions/medicineAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BrandPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const brandSearch = useRef(null)
    const [searchKeyword, setSearchKeyword] = useState("");
    const companyState = useSelector((state) => state.getCompanyDataReducer)
    const { companyData } = companyState

    const filterCompany = companyData && companyData.filter((company) => {
      return searchKeyword === "" ? null : company && company?.toLowerCase().includes(searchKeyword);
    })

    useEffect(() => {
    dispatch(getCompany());
    }, [dispatch]);
    const handleClick = (myCompany) => {
    navigate('/shop',{state:{newBrand:myCompany}});
    }
  return (
      <div className='container'>
          <h2 className='font-semibold text-xl'>Brand Page</h2>
          <input
          type="text"
          ref={brandSearch}
          className="w-full border-primary border pl-2 md:pl-4 md:my-4 py-3 pr-0 md:pr-3 rounded  focus:outline-none"
          placeholder={searchKeyword.length>0?searchKeyword:"Search Brand"}
          onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
        />
        {searchKeyword === "" ? null : (
        <div className="absolute bg-gray-100 mt-1 min-w-max p-2 shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto ">
          {filterCompany &&
            filterCompany
              .map((myCompany, index) => {
                return (
                  <div className="p-2" key={index}>
                  <button
                  className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                   onClick={()=>handleClick(myCompany)}>
                    {myCompany}
                  </button>
                  </div>
                );
              })}
        </div>
        )}
          <div className='grid md:grid-cols-4 grid-cols-2'>
              {companyData && companyData?.map((myCompany,index) => {
                  return (
                    <div key={index} className="p-2">
                            <button className=" p-2  text-gray-100 border rounded bg-primary hover:text-secondary hover:bg-transparent transition" onClick={()=>handleClick(myCompany)}>
                              {myCompany}
                            </button>
                    </div>
                  )
              })}    
          </div>

    </div>
  )
}

export default BrandPage