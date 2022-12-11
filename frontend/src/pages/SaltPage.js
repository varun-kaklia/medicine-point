import React, { useEffect, useRef, useState } from 'react'
import { getSalt } from '../actions/medicineAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SaltPage = () => {
    const dispatch = useDispatch()
    const saltSearch = useRef(null)
    const [searchKeyword, setSearchKeyword] = useState("");
    const navigate = useNavigate()
    const medicineState = useSelector((state) => state.getSaltDataReducer)
    const { saltData } = medicineState
    
    const filterSalt = saltData && saltData.filter((salt) => {
      return searchKeyword === "" ? null : salt && salt?.toLowerCase().includes(searchKeyword);
    })

    useEffect(() => {
    dispatch(getSalt());
    }, [dispatch]);
    const handleClick = (mySalt) => {
    navigate('/shop',{state:{newSalt:mySalt}});
    }

  return (
      <div className='container'>
          <h2 className='font-semibold text-xl'>Salt Page</h2>
          <input
          type="text"
          ref={saltSearch}
          className="w-full border-primary border pl-2 md:pl-4 md:my-4 py-3 pr-0 md:pr-3 rounded  focus:outline-none"
          placeholder={searchKeyword.length>0?searchKeyword:"Search Salt"}
          onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
        />
        {searchKeyword === "" ? null : (
        <div className="absolute bg-gray-100 mt-1 min-w-max p-2 shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto ">
          {filterSalt &&
            filterSalt
              .map((mySalt, index) => {
                return (
                  <div className="p-2" key={index}>
                  <button
                  className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                   onClick={()=>handleClick(mySalt)}>
                    {mySalt}
                  </button>
                  </div>
                );
              })}
        </div>
        )}
          <div className='grid md:grid-cols-4 grid-cols-2'>
              {saltData && saltData?.map((mySalt,index) => {
                  return (
                    <div key={index} className="p-2">
                      <button className=" p-2  text-gray-100 border rounded bg-primary hover:text-secondary hover:bg-transparent transition" onClick={()=>handleClick(mySalt)}>
                        {mySalt}
                      </button>
                    </div>
                  )
              })}    
          </div>

    </div>
  )
}

export default SaltPage