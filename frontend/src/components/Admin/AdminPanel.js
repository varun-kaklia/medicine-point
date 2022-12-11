import React from 'react'
import { Link } from 'react-router-dom'


const AdminPanel = () => {

  return (
      <div className='container'>
          <h2 className='text-xl text-gray-500 font-semibold text-center md:mt-0 mt-4 border shadow-md p-4 rounded'>Admin Panel</h2>
          <div className='md:grid grid-cols-2 gap-4 py-4'>
            <Link to={`/admin/manageaccount`}>
              <div className=' bg-indigo-400 hover:bg-indigo-300 hover:transition p-16 rounded-md'>
                  <p className='text-center text-2xl'>Users</p>
                  <p className='text-center text-xl'>&nbsp;</p>
              </div>
            </Link>
            <Link to={`/admin/medicinelist`}>
              <div className=' bg-lime-400 hover:bg-lime-300 hover:transition p-16 rounded-md mt-4 md:mt-0'>
                      <p className='text-center text-2xl'>Medicines</p>
                  <p className='text-center text-xl'>&nbsp;</p>
              </div>
            </Link>
            <Link to={`/admin/points`}>
              <div className=' bg-fuchsia-400 hover:bg-fuchsia-300 hover:transition p-16 rounded-md mt-4 md:mt-0'>
                      <p className='text-center text-2xl'>Medicine Points</p>
                  <p className='text-center text-xl'>&nbsp;</p>
              </div>
            </Link>
            <Link to={`/admin/orderlist`}>
              <div className=' bg-amber-400 hover:bg-amber-300 hover:transition p-16 rounded-md mt-4 md:mt-0'>
                      <p className='text-center text-2xl'>Orders</p>
                  <p className='text-center text-xl'>&nbsp;</p>
              </div>
            </Link>
            <Link to={`/admin/manageSeller`}>
              <div className=' bg-violet-400 hover:bg-violet-300 hover:transition p-16 rounded-md mt-4 md:mt-0'>
                      <p className='text-center text-2xl'>Sellers</p>
                  <p className='text-center text-xl'>&nbsp;</p>
              </div>
            </Link>
            <Link to={`/admin/dailyoffer`}>
              <div className=' bg-rose-400 hover:bg-rose-300 hover:transition p-16 rounded-md mt-4 md:mt-0'>
                      <p className='text-center text-2xl'>Daily Offer</p>
                  <p className='text-center text-xl'>&nbsp;</p>
              </div>
            </Link>
            <Link to={`/admin/sliderImageEdit`}>
              <div className=' bg-rose-400 hover:bg-rose-300 hover:transition p-16 rounded-md mt-4 md:mt-0'>
                      <p className='text-center text-2xl'>Slider Image Edit</p>
                  <p className='text-center text-xl'>&nbsp;</p>
              </div>
            </Link>
          </div>
      </div>
  )
}

export default AdminPanel