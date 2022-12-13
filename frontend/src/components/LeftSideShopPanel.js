import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {getCompany,getSalt} from '../actions/medicineAction'

const LeftSideShopPanel = ({setInStock,inStock,brand,setBrand,setSalt,salt,searchBrand,setSearchBrand, newSalt,searchSalt,setSearchSalt}) => {
  const dispatch = useDispatch()
  
  const brandState = useSelector((state)=>state.getCompanyDataReducer)
  const {companyData} = brandState
  const saltState = useSelector((state)=>state.getSaltDataReducer)
  const {saltData} = saltState
  
  useLayoutEffect(()=>{
    dispatch(getCompany())
    dispatch(getSalt())
  },[dispatch])


  return (
    <div>
      <div className="col-span-1 bg-white px-4 lg:pb-6 pb-4 shadow rounded overflow-hidden">
        <div className="divide-y divide-gray-200 space-y-5  items-center ">
            {/* Instock/outofstock */}
          {/* <div className="pt-4">
            <h3 className="text-xl text-gray mb-3 uppercase font-medium">
              InStock/Outofstock
            </h3>
            <div className="space-y-2 ">
              <>
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
              </>
            </div>
          </div> */}

          <div className="hidden lg:block">
            {/* Brand Category */}
            <div className="pt-4">
              <h3 className="text-xl text-gray mb-3 uppercase font-medium">
                Brands
              </h3>
              <div className="space-y-2  overflow-y-auto static">
                <input
                  type="search"
                  className="w-full focus:ring-0 rounded-sm h-8 font-xs top-0 "
                  placeholder="Search for Brands"
                  onChange={(e) => setSearchBrand(e.target.value.toLowerCase())}
                />
              </div>
              <div className="space-y-2 overflow-y-auto lg:h-80 h-40 static">
                {companyData &&
                  companyData?.filter((brand) => {
                    return searchBrand.toLowerCase() === "" ? brand : brand && brand?.toLowerCase().includes(searchBrand)
                  }).map((company, index) => {
                    return (
                      <div key={index} className="flex items-center ">
                        <input
                          type="checkbox"
                          id="cat1"
                          className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                          checked={company === brand}
                          value={company}
                          onClick={(e) => company === brand ? setBrand('') : setBrand(e.target.value)}
                        />
                        <label
                          htmlFor="cat-1"
                          className="text-gray-600 ml-3 cursor-pointer"
                          
                        >
                          {company}
                        </label>
                      </div>
                    )
                  })}
              </div>
            </div>
            {/* Salt Category */}
            <div className="pt-4">
              <h3 className="text-xl text-gray mb-3 uppercase font-medium">
                Salt
              </h3>
              <div className="space-y-2  overflow-y-auto static">
              <input
                type="search"
                className="w-full focus:ring-0 rounded-sm h-8 font-xs top-0"
                placeholder={newSalt!=null||undefined ? newSalt:"Search for Salt"}
                onChange={(e) => 
                  setSearchSalt(e.target.value.toLowerCase())
                }
              />
              </div>
              <div className="space-y-2  overflow-y-auto ls:h-80 h-40 static">
                <div>
                {saltData &&
                  saltData.filter((salt) => {
                    return searchSalt && searchSalt?.toLowerCase() === "" ? salt : salt && salt?.toLowerCase().includes(searchSalt)
                  }).map((tar, index) => {
                    return (
                      <div key={index} className="flex items-center ">
                        <input
                          type="checkbox"
                          id="cat1"
                          checked={tar === salt}
                          value={tar}
                          onClick={(e) => tar === salt ? setSalt('') : setSalt(e.target.value)}
                          className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                        />
                        <label
                          htmlFor="cat-1"
                          className="text-gray-600 ml-3 cursor-pointer"
                        >
                          {tar}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <details className="md:hidden block">
              <summary className="text-2xl py-2">
                Brands & Salt Filter
              </summary>

              {/* Brand Category */}
              <div className="pt-4">
                <h3 className="text-xl text-gray mb-3 uppercase font-medium">
                  Brands
                </h3>
                
                <div className="space-y-2  overflow-y-auto static">                    
                  <input
                    type="search"
                    className="w-full focus:ring-0 rounded-sm h-8 font-xs top-0 "
                    placeholder="Search for Brands"
                    onChange={(e) => setSearchBrand(e.target.value.toLowerCase())}
                  />
                </div>
                <div className="space-y-2 overflow-y-auto lg:h-80 h-40 static">
                  {companyData &&
                    companyData?.filter((brand) => {
                      return searchBrand && searchBrand.toLowerCase() === "" ? brand : brand && brand?.toLowerCase().includes(searchBrand)
                    }).map((company, index) => {
                      return (
                        <div key={index} className="flex items-center ">
                          <input
                            type="checkbox"
                            id="cat1"
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                            checked={company === brand}
                            value={company}
                            onClick={(e) => company === brand ? setBrand('') : setBrand(e.target.value)}
                          />
                          <label
                            htmlFor="cat-1"
                            className="text-gray-600 ml-3 cursor-pointer"
                          >
                            {company}
                          </label>
                          {/* <div className="ml-auto text-gray-600 text-sm">(15)</div> */}
                        </div>
                      )
                    })}
                </div>
              </div>
              {/* Salt Category */}
              <div className="pt-4">
                <h3 className="text-xl text-gray mb-3 uppercase font-medium">
                  Salt
                </h3>
                <div className="space-y-2  overflow-y-auto static">  
                  <input
                    type="search"
                    className="w-full focus:ring-0 rounded-sm h-8 font-xs top-0"
                    placeholder={newSalt!=null||undefined ? newSalt:"Search for Salt"}
                    onChange={(e) => 
                      setSearchSalt(e.target.value.toLowerCase())
                    }
                  />
                </div>
                <div className="space-y-2  overflow-y-auto ls:h-80 h-40 static">
                  <div>
                  {saltData &&
                    saltData.filter((salt) => {
                      return searchSalt && searchSalt?.toLowerCase() === "" ? salt : salt && salt?.toLowerCase().includes(searchSalt)
                    }).map((tar, index) => {
                      return (
                        <div key={index} className="flex items-center ">
                          <input
                            type="checkbox"
                            id="cat1"
                            checked={tar === salt}
                            value={tar}
                            onClick={(e) => tar === salt ? setSalt('') : setSalt(e.target.value)}
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                          />
                          <label
                            htmlFor="cat-1"
                            className="text-gray-600 ml-3 cursor-pointer"
                          >
                            {tar}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftSideShopPanel;