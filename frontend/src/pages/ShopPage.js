import React, { useState, useEffect, useLayoutEffect } from "react";
import Breakcrumb from "../components/Breakcrumb";
import LeftSideShopPanel from "../components/LeftSideShopPanel";
import { FaTh, FaThList } from "react-icons/fa";
import { useDispatch } from "react-redux";
// import { getAllMedicines } from "../actions/medicineAction";
import ShopPageProducts from "./ShopPageProducts";
import Pagination from "../elements/Pagination";
import {useLocation} from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import axios from "axios";

const ShopPage = () => {
  const location = useLocation()
  const newSalt = location.state?.newSalt
  const newBrand = location.state?.newBrand
  const [select, setSelect] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [medicines,setMedicines] = useState('') 
  const [loading,setLoading] = useState("")
  const [searchMedicine,setSearchMedicine] = useState('')

  
  //Left Side Panel States
  const [inStock, setInStock] = useState(false);
  const [brand, setBrand] = useState("");
  const [salt, setSalt] = useState("");
  const [searchBrand, setSearchBrand] = useState('')
  const [searchSalt, setSearchSalt] = useState('')
  
  const dispatch = useDispatch();
  
  const getMedicinesData = async()=>{
      const res = await axios.post(`/api/medicines/shopPageMedicine?query=${searchMedicine}&limit=${24}&page=${currentPage !== undefined || ""? currentPage: 1}&brand=${newBrand !== undefined || ""? newBrand: ""}&salt=${newSalt !== undefined || ""? newSalt: ""}&select=${select !== undefined || ""?select:""}&instock=${inStock !== false ?inStock:""}`)
      if(res){
        setMedicines(res.data)
        console.log('Medicine in Shop Page', medicines)
        setLoading(res.data)
      }
    }

  useLayoutEffect(() => {
      getMedicinesData()
  }, [dispatch,brand,searchMedicine,salt,currentPage,location,select,inStock]);

  useEffect(() => {
    if (newBrand != null || undefined) {
      setSearchBrand(newBrand)
      setBrand(newBrand)
    }
    if (newSalt != null || undefined) {
      setSearchSalt(newSalt)
      setSalt(newSalt)
    }
    if(medicines && medicines.length>0){

      setCurrentPage(medicines && medicines?.page)
    }
  },[location, newBrand, newSalt])

  return (
    <div>
      <Breakcrumb id={"Shop"} />
      <div className="container lg:grid grid-cols-4 gap-6 lg:pt-4 pb-16 items-start ">
        {/* SideBar */}
        {/* <div>
        <div className="hidden  lg:block">
        <LeftSideShopPanel brand={brand} newSalt={newSalt} salt={salt} inStock={inStock} setInStock={setInStock} setSearchBrand={setSearchBrand} setBrand={setBrand} searchSalt={searchSalt} setSalt={setSalt} searchBrand={searchBrand} setSearchSalt={setSearchSalt} />
        </div>
        <details className="lg:hidden">
        <summary className="text-2xl py-2">
          Filters
        </summary>

        <LeftSideShopPanel brand={brand} newSalt={newSalt} salt={salt} inStock={inStock} setInStock={setInStock} setSearchBrand={setSearchBrand} setBrand={setBrand} searchSalt={searchSalt} setSalt={setSalt} searchBrand={searchBrand} setSearchSalt={setSearchSalt} />
        </details>
        </div> */}
        {loading === true?
          <div className="text-center">
        <ClipLoader/>
        <h3 className="text-xl font-medium py-2">Wait Medicine loading....</h3>
      </div>
      :
        <div className="col-span-3 lg:mt-0 mt-4">
            <div className="flex items-center justify-center pb-2">
              <input
                type='text'
                placeholder="Search Medicine in Shop Page"
                className="border-r-0 rounded-l"
                onChange={(e)=>setSearchMedicine(e.target.value.toLowerCase())}
              />
            <div className="bg-primary p-2 border-primary border rounded-r">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            </div>
            </div>
          <div className="flex items-center mb-4">
            <select id="selectMedicine" value={select} onChange={(e)=>setSelect(e.target.value)}  className="w-44 text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
              <option value="default">Default Sorting</option>
              <option value="lowtohigh">Price Low to High</option>
              <option value="hightolow">Price High to Low</option>
            </select>
            <div className="flex gap-2 ml-auto">
            <div className="flex items-center border border-gray-200 py-2 px-4 rounded">
              <input
                type="checkbox"
                id="cat1"
                onClick={() => setInStock(!inStock)}
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="cat-1"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                In Stock
              </label>
            </div>
            </div>
          </div>
          {/* Products */}
          <div>
            {
              medicines && medicines?.searchMedicine?.map((medicine) => (
              <div key={medicine._id}>
                <ShopPageProducts medicine={medicine && medicine} />
              </div>
              ))
            }
          </div>
          <div className="mt-4 block w-full">
            <Pagination pages={medicines && medicines?.pages} setCurrentPage={setCurrentPage} />
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default ShopPage;
