import React from 'react'
import phonepe from '../assets/images/phonepe.jpeg' 
import paytm from '../assets/images/paytm.jpeg' 

const Payment = () => {
  return (
    <div className='w-full container p-4'>
    <h2 className='text-xl font-semibold'>Payment Methods</h2>
    <div className='w-full grid lg:grid-cols-2 gap-4 rounded-sm bg-gray-50 sm:grid-cols-1 md:grid-cols-2 p-4'>
        <div className='col-span-1 p-2'>
            <label className='text-xl font-medium my-2'>PayTm</label>
            <div className='my-2'>
            <img src={paytm}/>
            </div>
        </div>
        <div className='col-span-1 p-2'>
            <label className='text-xl font-medium my-2'>PhonePe</label>
            <div className='my-2'>
            <img src={phonepe}/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Payment