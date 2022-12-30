import React, { useState, useRef, useLayoutEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {  Link } from "react-router-dom";
import {searchMedicine} from '../actions/medicineAction' 
// import Microphone from "./Microphone";

const Search = () => {
  const thisSearch = useRef(null)
  const dispatch = useDispatch()
  const [searchItemPage,setSearchItemPage] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("");
  // console.log("Search Keyword",searchKeyword)
  const productSearchState = useSelector((state) => state.getSearchMedicineReducer);
  const { searchMedicines, loading } = productSearchState;

  // const filterMedicine = searchMedicines && searchMedicines.filter((medicine) => {
  //   return searchKeyword.toLowerCase() === ""
  //     ? null
  //     : medicine.name.toLowerCase().includes(searchKeyword);
  // })

  // const medicineLength = filterMedicine.length
  
  // console.log("filter MEdicine",medicineLength)
  useLayoutEffect(()=>{
    dispatch(searchMedicine(searchKeyword))
  },[searchKeyword, dispatch])

  const searchHandle = (e) => {
    e.preventDefault()
    setSearchItemPage(true)
    setSearchKeyword("")
    thisSearch.current.value = ""
  }

  return (
    <div className="w-full md:max-w-xl ">
      <div className="md:w-full md:max-w-xl md:relative flex">
        <span className="hidden md:block md:absolute md:left-4 md:top-4 md:text-lg text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        </span>
        <input
          type="text"
          ref={thisSearch}
          className="w-full border-primary border border-r-0 pl-2 md:pl-12 py-3 pr-0 md:pr-3 rounded-l-md  focus:outline-none"
          placeholder={searchKeyword.length>0?searchKeyword:"Search Medicine"}
          onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
        />
        {/* <Microphone setSearchKeyword={setSearchKeyword} searchItemPage={searchItemPage} medicineLength={medicineLength}/> */}
        <button className="bg-primary border border-primary text-white md:px-8 px-3 rounded-r-md hover:bg-transparent hover:text-primary transition">
          <span className="hidden md:block">Search</span>
          <FaSearch className="md:hidden"/>
        </button>
      </div>
      <div>
      {/* medicine list */}
      {searchKeyword === ""  ? null : (
        <div className="absolute bg-gray-100 mt-1 w-max p-2 shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto ">
          {searchMedicines &&
            searchMedicines
              .map((medicine, index) => {
                return (
                  <div className="p-2" key={index}>
                  <button onClick={(e) => searchHandle(e)}>
                  <Link
                    className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                    to={`/products/${medicine._id}`}
                    state={{ medicine: medicine }}
                  >
                    {medicine.name}
                  </Link>
                  </button>
                  </div>
                );
              })}
        </div>
      )}
      </div>
    </div>
  );
};

export default Search;