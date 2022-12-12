import React, { useState, useEffect, useLayoutEffect } from "react";
import Breakcrumb from "../components/Breakcrumb";
// import LeftSideShopPanel from "../components/LeftSideShopPanel";
import { FaTh, FaThList } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
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
  const postPerPage = 24
  const [medicines,setMedicines] = useState('') 
  const [loading,setLoading] = useState("")

  
  //Left Side Panel States
  const [inStock, setInStock] = useState(false);
  const [brand, setBrand] = useState("");
  const [salt, setSalt] = useState("");
  const [searchBrand, setSearchBrand] = useState('')
  const [searchSalt, setSearchSalt] = useState('')
  
  const dispatch = useDispatch();
  // const medicineState = useSelector((state) => state.getAllMedicineReducer);
  // const { medicines, loading } = medicineState;
  
  const getMedicinesData = async()=>{
    const res = await axios.get(`/api/medicines/getAllMedicine?limit=${24}&page=${currentPage !== undefined || ""? currentPage: 1}&brand=${newBrand !== undefined || ""? newBrand: ""}&salt=${newSalt !== undefined || ""? newSalt: ""}&select=${select !== undefined || ""?select:""}&instock=${inStock !== false ?inStock:""}`)
    console.log("Response",res)
    if(res){
      setMedicines(res.data)
      setLoading(res.data)
    }
  }
  useLayoutEffect(() => {
    getMedicinesData()
    // dispatch(getAllMedicines({limit:24,page:currentPage,brand:searchBrand?searchBrand:newBrand,salt:searchSalt?searchSalt:newSalt}));
  }, [dispatch,brand,salt,currentPage,location,select,inStock]);

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
  
  //filer stock
  // const filterStock = medicines && medicines?.medicines?.filter((stock)=>{ if (inStock === true) {return stock.stock>0} else{return stock}})
  
  // const filterBrand = filterStock && filterStock.filter(firm => {
  //   if (brand.length > 0) {
  //     return firm?.company?.includes(brand)
  //   } else {
  //     return firm
  //   }
  // })
  
  // const filterSalt = filterBrand && filterBrand.filter(tar => { 
  //   if (salt.length > 0) {
  //     return tar?.Salt === (salt)
  //   } else {
  //     return tar
  //   }
  // })

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = medicines && medicines?.medicines?.slice(indexOfFirstPost,indexOfLastPost)




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
          <div className="flex items-center mb-4">
            <select id="selectMedicine" value={select} onChange={(e)=>setSelect(e.target.value)}  className="w-44 text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
              <option value="default">Default Sorting</option>
              <option value="lowtohigh">Price Low to High</option>
              <option value="hightolow">Price High to Low</option>
            </select>
            <div className="flex gap-2 ml-auto">
            <div className="flex items-center ">
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
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-6">
            {medicines && medicines?.medicines?.map((medicine) => (
              <div key={medicine._id}>
                <ShopPageProducts medicine={medicine && medicine} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Pagination pages={medicines && medicines?.pages} setCurrentPage={setCurrentPage} />
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default ShopPage;
