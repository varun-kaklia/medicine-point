import React, { useEffect, useState, useRef, useLayoutEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from "react-router-dom"
import Breakcrumb from '../components/Breakcrumb'
import { FaAddressCard, FaGift, FaCoins } from 'react-icons/fa'
import {GrDeliver} from 'react-icons/gr'
import { AiOutlineLogout } from 'react-icons/ai'
import { logoutSeller } from '../actions/sellerAction'
import {getAllMedicines} from '../actions/medicineAction'
import { addToCart, deleteFromCart, flushFromCart } from '../actions/cartAction'
import {placeSellerOrder} from '../actions/orderAction' 
import ClipLoader from 'react-spinners/ClipLoader'

const SellerOrderCreation = () => {
  const [showModal, setShowModal] = useState(false)
  const [user,setUser] = useState('')
  const [remarks, setRemarks] = useState('Enter Remarks on Order')
  const [searchMedicine, setSearchMedicine] = useState('')
  const medicineSearch = useRef(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedMedicine, setSelectedMedicine] = useState('')
  const [getMedicine, setGetMedicine] = useState('')
  const dispatch = useDispatch()
  const sellerState = useSelector((state) => state.loginSellerReducer)
  const { currentSeller } = sellerState
  const medicineState = useSelector((state) => state.getAllMedicineReducer)
  const { loading,medicines } = medicineState
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;

  const productSearchState = useSelector((state) => state.getSearchMedicineReducer);
  const { searchMedicines } = productSearchState;

  const filterMedicine = searchMedicines && searchMedicines.filter((searchThisMedicine) => {
    return (
      getMedicine === "" ? searchThisMedicine : searchThisMedicine && searchThisMedicine?.name.toLowerCase().includes(getMedicine)
    )
  })

  const newValue = cartItems.reduce((x, item) => x + item.price, 0);
  const subTotal = Math.trunc(newValue)
  const createOrderHandler = (e) => {
      e.preventDefault()
      localStorage.removeItem('party')
      dispatch(placeSellerOrder(subTotal,remarks,user))
      dispatch(flushFromCart())
      window.location.href="/myaccount"
  }

  const handleSelectedMedicine = (e) => {
    e.preventDefault()
    setShowModal(false)
    dispatch(addToCart(selectedMedicine, quantity));
    setQuantity(1)
    medicineSearch.current.value=""
    setSearchMedicine('')
  }

  useLayoutEffect(() => {
    dispatch(getAllMedicines())
    setUser(JSON.parse(localStorage.getItem("party")))
  }, [dispatch])

  useEffect(() => {
      if (localStorage.getItem("currentSeller") === null || undefined || "") {
          window.location.href="/sellerlogin"
    }
    if(localStorage.getItem("party") === null || undefined || "" ){
      window.location.href="/sellerUserCreation"
    }
  },[])

  useLayoutEffect(()=>{
    if(currentSeller && currentSeller.type !== "S"){
      return window.location.href ="/deliverOrder"
    }
  },[currentSeller])
  return (
    <div>
      {
        showModal ? (
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto w-full fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Product Info</h3>
                  <button
                    className="bg-transparent self-center border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-200 py-0 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 text-red-700  h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>

                    </span>
                  </button>
                </div>
                <div className="relative w-full p-6 flex-auto">
                        <div className='flex w-full justify-between mt-1 border rounded shadow-md p-2'>
                          <div>
                              <Link className="hover:text-primary" to={`/products/${selectedMedicine._id}`} state={{medicine:selectedMedicine}}>
                            <div className='text-gray-800 font-semibold text-lg'>
                              {selectedMedicine.name}
                            </div>
                      </Link>
                      <div className='flex justify-between'>
                        <div>{ selectedMedicine.Salt}</div>
                        {selectedMedicine.stock > 1 ? 
                        <div className='text-green-700'>{selectedMedicine.stock}</div>
                        :
                        <div className='text-red-700'>{ selectedMedicine.stock}</div>
                        }
                      </div>
                      <div className='text-gray-800 font-semibold text-lg'>{selectedMedicine.company}</div>
                                  <div>
                                  Price: {quantity} X {selectedMedicine.Rate} = {quantity*selectedMedicine.Rate}
                                </div>
                                <div className="flex self-center items-center">
                                 Quantity:
                                 <svg xmlns="http://www.w3.org/2000/svg"
                          onClick={() => { 
                                     setQuantity(quantity > 1 ? quantity-1: null)
                                     dispatch(
                                       addToCart(selectedMedicine, quantity - 1)
                                     );
                                   }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary mx-1 hover:cursor-pointer">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                                 <input autoFocus type="number" placeholder={quantity} className="w-10 h-6 text-center rounded " onChange={(e)=>setQuantity(e.target.value)}/>
                        <svg onClick={() => {
                                    setQuantity(quantity+1)
                                      dispatch(addToCart(selectedMedicine, quantity + 1));
                                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1 text-green-600 hover:cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"  />
                                  </svg>
                                </div>
                              </div>
                               <div className='self-center md:block hidden px-4'>
                                 <svg
                                   onClick={() => {
                                    dispatch(deleteFromCart(selectedMedicine));
                                  }}
                                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 right-0 h-6 text-secondary hover:cursor-pointer items-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                              </div>
                            </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-primary hover:bg-transparent font-bold border uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 border-primary hover:border-secondary hover:text-primary transition "
                    type="button"
                    onClick={(e) => handleSelectedMedicine(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ):null
      }
        <Breakcrumb id={"Seller Order Creation"}/>
        <div className='container md:grid grid-cols-12 items-start pt-4 gap-6 pb-16'>
          <div className='col-span-3'>
          <div className='px-4 py-3 shadow items-center gap-4'>
            <div className='flex items-center'>
              <div>
                <img src='/images/1.png' alt='Medicine Point- Medicine Wholseller in Noida' className='rounded-full w-14 h-14 border border-gray-200 p-1 object-cover ' />
              </div>
              <div className='flex-grow flex pl-2'>
                <p className='text-gray-600'>Hello,</p>
                <h4 className='text-gray-400 px-1 font-medium'>
                  {currentSeller && currentSeller?.name}
                </h4>
              </div>
            </div>
              {/* <div className='flex'><label className='font-xs'>Rs.1001</label></div> */}
            </div>
            <div className='mt-6 divide-gray-200 space-y-4 text-gray-600 divide-y bg-white shadow rounded p-4'>
            {currentSeller &&
              <>
              <div className='space-y-1 pl-8'>
                <Link to="/myaccount" href='#' className={`relative hover:text-primary block capitalize transition`}>
                <span className='absolute -left-8 top-0 text-base'><FaAddressCard/></span>
                Seller Panel</Link>
            </div>
              <div className='pt-4 space-y-1 pl-8'>
                <Link to='/sellerUserSelection' className='relative hover:text-primary block font-medium capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><FaGift/></span>
                Create Order</Link>
              </div>
              <div className='space-y-1 pt-4 pl-8'>
                <Link to="/sellerOrder" href='#' className='relative hover:text-primary block capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><FaCoins/></span>
                Old Order</Link>
              </div>
              <div className='space-y-1 pt-4 pl-8'>
                <Link to="/deliverOrder" href='#' className='relative hover:text-primary block capitalize transition'>
                <span className='absolute -left-8 top-0 text-base'><GrDeliver/></span>
                Deliver Order</Link>
              </div>
            </>
            }
            <div className='pt-4 space-y-1 pl-8'>
                  {
                    currentSeller &&
                <Link to="#" onClick={() => {
                        dispatch(logoutSeller());
                      }} className='relative hover:text-primary block font-medium capitalize transition'>
              <span className='absolute -left-8 top-0 text-base'><AiOutlineLogout/></span>
                Logout</Link>
                  }
              </div>
            </div>
          </div>
          {
          loading === true?
          <div className='col-span-9 md:grid md:mt-0 mt-4 grid-cols-1 gap-4 md:justify-items-center text-center w-full'>
          <ClipLoader
          color='#113078'
          size={50}
          />
          <h3>Wait medicines List is Loading...</h3>
          </div>
          :
          <div className='col-span-9 md:grid md:mt-0 mt-10 grid-cols-1 gap-4'>
            <div className='shadow rounded bg-white pt-6 pb-4 px-4'>
              <div className='flex items-center mb-4 justify-center'>
                <h3 className='font-medium text-gray-800 text-lg'>Seller Order Creation</h3>
              </div>
            </div>
            <div className='md:grid mt-4 grid-cols-1 gap-4'>
              <div className='shadow rounded bg-white pt-6 pb-4 px-4'>
                <div className=''>
                  <input type="text" className='rounded w-full' ref={medicineSearch} onChange={(e)=>setGetMedicine(e.target.value.toLowerCase())} placeholder='Enter Medicine Name' />
                </div>
              <div className='py-2 shadow rounded px-2 mt-4 overflow-y-scroll'>
              {getMedicine === "" || null ? null : (
                  <div className="absolute bg-gray-100 mt-1 w-max p-2 shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto ">
                    {filterMedicine &&
                      filterMedicine
                        .map((medicine, index) => {
                          return (
                            <div className="p-2" key={index}>
                            <button  onClick={() =>{
                            setSelectedMedicine(medicine)
                            setShowModal(true)}}>
                              {medicine.name}
                            </button>
                            </div>
                          );
                        })}
                  </div>
                )}
                    </div>
                        <h3 className='mt-4 px-2 font-semibold text-lg'>Selected Items:</h3>
                         {cartItems && cartItems.map((item, index) => (
                        <div id='order' key={index} className='flex w-full justify-between mt-1 border rounded shadow-md p-2'>
                              <div>
                                  <Link className="hover:text-primary" to={item.pointsPage === true? `/pointproducts/${item._id}`:`/products/${item._id}`} state={{medicine:item.medicine}}>
                                <div>
                                  {item.name}
                                </div>
                                  </Link>
                                {item.pointsPage === true ?
                                <div>
                                  Points: {item.quantity} X {item.points} = {item.pointsPrice}
                                </div>
                                  :
                                  <div>
                                  Price: {item.quantity} X {item.price} = {item.price}
                                </div>
                                }
                                <div className="flex self-center">
                                 Quantity:
                                 <svg xmlns="http://www.w3.org/2000/svg"
                                   onClick={() => {
                                     dispatch(
                                       addToCart(item, item.quantity - 1)
                                     );
                                   }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary mx-1 hover:cursor-pointer">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                                 <input placeholder={item.quantity} className="w-8 text-center" />
                                 <svg  onClick={() => {
                                      dispatch(addToCart(item, item.quantity + 1));
                                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1 text-green-600 hover:cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"  />
                                  </svg>
                                </div>
                              </div>
                               <div className='self-center'>
                                 <svg
                                   onClick={() => {
                                    dispatch(deleteFromCart(item));
                                  }}
                                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 right-0 h-6 text-secondary hover:cursor-pointer items-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                              </div>
                            </div>
                          ))}
                          <div className='mt-4'>
                          <textarea name='remarks' onChange={(e)=>setRemarks(e.target.value)} className='border rounded w-full p-2 h-16'/></div>
                          </div>
                          </div>
                <div className=' text-center mt-4'>
                    <Link to="/myaccount">
                        <button className='px-6 bg-primary text-gray-100 border rounded-md py-2 hover:bg-transparent hover:border-secondary hover:text-primary transition' onClick={(e)=>createOrderHandler(e)}>Create Order</button>
                    </Link>
                  </div>
              </div>
          }
          </div>
      </div>
  )
}




export default SellerOrderCreation