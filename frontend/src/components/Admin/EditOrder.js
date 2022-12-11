import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getOrderById, updateOrder} from '../../actions/orderAction'
import {getAllSeller} from '../../actions/sellerAction'

const EditOrder = () => {
  const [deliveryBy, setDeliveryBy] = useState('')
  const { id } = useParams()
  // console.log("Id", id)
  const getOrderByState = useSelector((state)=>state.getOrderByIdReducer)
  const {order} = getOrderByState
  const getSellerByState = useSelector((state)=>state.getAllSellerReducer)
  const {sellers} = getSellerByState
  // console.log("Seller",getSellerByState)
  const dispatch = useDispatch()
  // console.log("Order", order)
  useEffect(()=>{
    dispatch(getAllSeller());
    if(order){
      if(order._id === id){
        setDeliveryBy(order.deliveryBy)
      }else{
        dispatch(getOrderById(id))
      }
    }else{
      dispatch(getOrderById(id))
    }
  },[order,dispatch,id])

  const handleUpdate= (e)=>{
    e.preventDefault()
    const updateThisOrder ={
      _id:id,
      deliveryBy
    }
    dispatch(updateOrder(updateThisOrder))
  }
    return (
          <div className='col-span-9 md:mt-0 mt-8 grid grid-cols-1 gap-2'>
            <div className='shadow rounded bg-white pt-6 pb-8 px-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-medium text-gray-800 text-lg'>Order Information</h3>
                {/* <h3 className='font-medium text-gray-800 text-lg'>Item Price</h3> */}
                {/* <a href="#" className='text-primary'>Edit</a> */}
              </div>
              <div className="flex items-center justify-between">
              <div>
              {
                order && order.name
              }
              </div>
              {order && order.isDelivered === true?
              <div>
                <h2>Order Already Deliver by {order && order.deliveryBy}</h2>
              </div>
              :
              <div className="flex justify-between items-center">
                Assing Delivery to &nbsp;
              <select value={deliveryBy} onChange={(e)=>setDeliveryBy(e.target.value)} id="deliveryBy" >
                {
                  sellers && sellers.map((seller)=>
                  <option key={seller._id} value={seller && seller.name}>{seller && seller.name}</option>
                  )
                }
              </select>
              </div>
              }
              </div>
              <div className="py-2">
                <h2 className="flex justify-center text-xl">Ordered Item List</h2>
                    <table className="w-full">
                      <tbody>
                {order && order?.orderItems.map((items,index)=>{
                  return(
                        <tr  key={index}>
                          <td>{items.name}</td>
                          <td className="px-4">{items.quantity}</td>
                          <td>{items.price}</td>
                        </tr>
                  )
                })}
                </tbody>
              </table>
              </div>
              <div className="text-center">
                <button onClick={(e)=>handleUpdate(e)} className="px-4 py-2 bg-primary text-slate-100 rounded hover:bg-transparent border-primary border hover:text-primary hover:border-secondary transition">Update Order</button>
              </div>
                </div>
            </div>
    )

    
}

export default EditOrder