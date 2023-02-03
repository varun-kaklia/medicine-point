import React, { useState, useRef, useLayoutEffect, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from "react-router-dom"
import Breakcrumb from '../components/Breakcrumb'
import {searchMedicine} from '../actions/medicineAction'
import { addToCart, deleteFromCart } from '../actions/cartAction'

const CreateOrder = () => {
  const [remarks,setRemarks] = useState("No Remarks on Order")
  const [showModal, setShowModal] = useState(false)
  const [getMedicine, setGetMedicine] = useState('')
  const medicineSearch = useRef(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedMedicine, setSelectedMedicine] = useState('')
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const pointsPay = cartItems.reduce((x, item) => x + item.pointsPrice, 0);

  const newValue = cartItems.reduce((x, item) => x + item.price, 0);
  const subTotal = Math.trunc(newValue)

  const handleSelectedMedicine = (e) => {
    e.preventDefault()
    setShowModal(false)
    dispatch(addToCart(selectedMedicine, quantity));
    setQuantity(1)
  }

  const productSearchState = useSelector((state) => state.getSearchMedicineReducer);
  const { searchMedicines, loading } = productSearchState;

  useEffect(()=>{
    if(getMedicine.length>0){
      dispatch(searchMedicine(getMedicine))
    }
  },[getMedicine, dispatch])

  useLayoutEffect(() => {
    if(localStorage.getItem("currentSeller")!== null || undefined || ""){
      window.location.href="/sellerUserSelection"
    }
  }, [dispatch])

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
                      {selectedMedicine.pointsPage === true ?
                                <div>
                                  Points: {quantity} X {selectedMedicine.points} = {quantity * selectedMedicine.points}
                                </div>
                                  :
                                  <div>
                                  Price: {quantity} X {selectedMedicine.price} = {quantity * selectedMedicine.Rate}
                                </div>
                                }
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
        <Breakcrumb id={"Order Creation"}/>
        {/* {
            loading === true?
            <div className='col-span-9 md:grid md:mt-0 mt-4 grid-cols-1 gap-4 md:justify-items-center text-center w-full'>
            <ClipLoader
            color='#113078'
            size={50}
            />
            </div>
            : */}
        <div className='container md:grid grid-cols-12 items-start pt-4 gap-6 pb-16'>
          <div className='col-span-8 md:grid md:mt-0 grid-cols-1 gap-4'>
            <div className='shadow rounded bg-white p-4'>
              <div className='flex items-center justify-center'>
                <h3 className='font-medium text-gray-800 text-lg'>Create Order</h3>
              </div>
            </div>
            <div className='md:grid mt-4 grid-cols-1 gap-4'>
              <div className='shadow rounded bg-white pt-6 pb-4 px-4'>
                <div className=''>
                  <input type="text" className='rounded w-full' ref={medicineSearch} onChange={(e)=>setGetMedicine(e.target.value.toLowerCase())} placeholder='Enter Medicine Name' />
                </div>
              <div className='py-2 shadow rounded px-2 mt-4 overflow-y-scroll'>
              {getMedicine === "" ? null : (
                  <div className="absolute bg-gray-100 mt-1 w-max p-2 shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto ">
                    {searchMedicines &&
                      searchMedicines
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
                {/* {medicines && medicines?.medicines?.map((medicine) => {
                  return (
                    <div className="flex items-center py-2 px-1 justify-between " key={medicine._id}>
                      <div className='w-full'>
                        <div className='flex justify-between'>
                        <div>
                        <button
                          className="text-gray-600 hover:text-primary transition cursor-pointer"
                            >
                              <Link to={`/products/${medicine._id}`} state={{medicine:medicine}}>
                          {medicine && medicine?.name}
                              </Link>
                        </button>
                          </div>
                          <p>{medicine && medicine?.stock > 1 ? <p className='text-green-700'>{medicine?.stock}</p>:<p className='text-red-700'>0</p>}</p>
                        </div>
                        <div className='flex justify-between'>
                          <p>{medicine && medicine?.company}</p>
                          <p>{medicine && medicine?.Salt}</p>
                        </div>
                      </div>
                      <button className='pl-2'>
                        <div className='flex justify-center'>
                          <button className='text-gray-50 bg-primary px-1 py-1 border border-primary rounded hover:border-secondary hover:bg-transparent hover:text-primary transition' onClick={() =>{
                            setSelectedMedicine(medicine)
                            setShowModal(true)}}>Add
                            </button>
                        </div>
                      </button>
                      </div>
                  )
                })} */}
                    </div>
                    <div className='py-4'>
                    <h2>Any Remarks:</h2>
          <textarea placeholder={ remarks} onChange={(e)=>setRemarks(e.target.value)} className="w-full h-20 border-2 border-primary rounded "  />
                    </div>
                          </div>
                          </div>
              </div>
                        <div className='col-span-4 border rounded mt-4 md:mt-0 shadow-md'>
                        <h3 className='my-4 md:mt-0 px-2 font-semibold text-lg pt-2'>Selected Items:</h3>
                         {cartItems && cartItems.map((item, index) => (
                        <div id='order' key={index} className='flex w-full justify-between mt-1 border-t p-2'>
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
                          <div className='my-2 flex justify-between px-2'><h2>SubTotal:</h2>{subTotal && subTotal}</div>
                          <div className='my-2 flex justify-between px-2'><h2>Points:</h2>{!pointsPay ? 0 : pointsPay}</div>
                        <div className=' text-center my-4'>
                        <Link to="/checkout" state={{ subTotal: subTotal, remarks:remarks, pointsPay:!pointsPay ? 0 : pointsPay}}>
                            <button className='px-6 bg-primary text-gray-100 border rounded-md py-2 hover:bg-transparent hover:border-secondary hover:text-primary transition'>Checkout</button>
                        </Link>
                        </div>
                        </div>
          </div>
        {/* } */}
      </div>
  )
}




export default CreateOrder