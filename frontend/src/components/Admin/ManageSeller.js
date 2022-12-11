import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllSeller} from '../../actions/sellerAction'

const ManageSeller = () => {

  const dispatch = useDispatch();
  const sellerState = useSelector((state) => state.getAllSellerReducer);
  const { sellers } = sellerState;
  console.log("sellers", sellers)

  useEffect(() => {
    dispatch(getAllSeller());
  }, [dispatch]);
  
  return (
    <div className='px-4 border shadow rounded md:mt-0 mt-8'>
    <div className='py-2'>
    <div className='text-2xl text-gray-700'>Seller Information</div>
    <table className='table-auto w-full py-2 border rounded'>
    <thead className='border-b rounded'>
      <th className='text-gray-700 text-lg'>Seller Name</th>
      <th className='text-gray-700 text-lg'>Last Login</th>
    </thead>
    <tbody>
    {sellers.map((seller)=>{
      return(
      <tr key={seller._id} className='text-center rounded border-b' >
      <td className='text-gray-700 text-lg'>{seller && seller.name}</td>
      <td className='text-gray-700 text-lg'>{seller && seller.date[seller.date.length -1]}</td>
      </tr>
      )
    })}
    </tbody>
    </table>
    </div>
    
    </div>
  )
}

export default ManageSeller