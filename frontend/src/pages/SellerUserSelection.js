import React, {  useEffect, useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link, useLocation, useNavigate} from "react-router-dom"
import Breakcrumb from '../components/Breakcrumb'
import { FaAddressCard, FaGift, FaCoins } from 'react-icons/fa'
import {GrDeliver} from 'react-icons/gr'
import { AiOutlineLogout } from 'react-icons/ai'
import { logoutSeller } from '../actions/sellerAction'
import {findUserBySeller} from '../actions/userAction'
import ClipLoader from 'react-spinners/ClipLoader'

const SellerUserSelection = () => {
  const [searchUser, setSearchUser] = useState("")
  const [party,setParty] = useState('')
  console.log("party", party)
  const location = useLocation()
  const navigate = useNavigate()
  // console.log("Search User", searchUser)
  // console.log("Selectecd User", selectUser)
  const dispatch = useDispatch()
  const sellerState = useSelector((state) => state.loginSellerReducer)
  const { currentSeller } = sellerState
  const userState = useSelector((state) => state.findUserBySellerReducer);
  const { users, loading } = userState;

  // console.log("User",users)
  // useEffect(()=>{
  //   if(localStorage.getItem('party') !== null || undefined || ""){
  //     navigate('/sellerOrderCreation')
  //     setParty(JSON.parse(localStorage.getItem('party')))
  //   }
  // },[location,navigate])

  useLayoutEffect(() => {
    dispatch(findUserBySeller(searchUser));
  }, [dispatch, searchUser]);
  
  useLayoutEffect(()=>{
    if(currentSeller && currentSeller.type !== "S"){
      return window.location.href ="/deliverOrder"
    }
    if(currentSeller === null || undefined || ""){
      window.location.href="/sellerlogin"
    }
  },[currentSeller])


  return (
      <div>
        <Breakcrumb id={"Seller User Selection"}/>
        <div className='container md:grid grid-cols-12 items-start pt-4 gap-6 pb-16'>
          <div className='col-span-3'>
          <div className='px-4 hidden md:block py-3 shadow items-center gap-4'>
            <div className='flex items-center'>
              <div>
                <img src='/images/1.png' alt='Medicine Point- Medicine Wholeseller in Noida.!' className='rounded-full w-14 h-14 border border-gray-200 p-1 object-cover ' />
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
            <div className='md:mt-6 divide-gray-200 space-y-4 text-gray-600 divide-y bg-white shadow rounded p-4'>
              <div className='space-y-1 pl-8'>
                <Link to="/myaccount" href='#' className={`relative hover:text-primary block capitalize transition`}>
                <span className='absolute -left-8 top-0 text-base'><FaAddressCard/></span>
                Seller Panel</Link>
            </div>
            {currentSeller &&
              <>
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

          <div className='col-span-9 md:grid md:mt-0 mt-4 grid-cols-1 gap-4'>
            <div className='shadow rounded bg-white pt-6 pb-4 px-4'>
              <div className='flex justify-between items-center mb-2'>
                <h3 className='font-medium text-gray-800 text-lg'>Seller User Selection</h3>
              </div>
            </div>
            <div className='md:grid mt-4 grid-cols-1 gap-4'>
                <div className='shadow rounded bg-white pt-6 pb-8 px-4'>
                    <div className=''>
                      <input type="text" className=' rounded w-full' placeholder='Enter Party Name' 
                        onChange={(e)=>setSearchUser(e.target.value.toLowerCase())}
                        autoFocus
                        />
                    </div>
              <div className='py-4 shadow rounded px-4 mt-4 md:h-60 h-40 overflow-y-scroll' >
                {users && users?.filter((searchThisUser) => {
                  return (
                    searchUser === "" || null || undefined ? searchThisUser : searchThisUser && searchThisUser?.name.toLowerCase().includes(searchUser)
                    )
                  }).map((user) => {
                    return (
                <div key={user._id} className="flex items-center ">
                    <div key={user._id}>
                    <button onClick={(e)=>setParty(user)}> 
                    <input
                      type="checkbox"
                      id="cat1"
                      className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                      checked={user?.name === party?.name}
                      value={user.name}
                      onClick={(e)=>setParty(e.target.checked,user)}
                      />
                    <label
                      htmlFor="cat-1"
                      className="text-gray-600 ml-3 cursor-pointer"
                    >
                      {user.name}
                    </label>
                    </button>
                    </div>
                    </div>)
                  })}
                    </div>
                    <div className=' mt-4 flex justify-between'>
                        <h3 className='font-semibold text-gray-800 text-lg'>Party Name: </h3>
                        <h3 className='font-medium text-gray-800 text-lg'>{party !== null || undefined || ""? party.name : party?.name}</h3>      
                    </div>
                    <div className=' mt-2 flex justify-between'>          
                        <p className='font-semibold  text-gray-700 text-base'>User Balance: </p>
                        <p className='font-small  text-gray-700 text-base'>{party !== null || undefined || "" || " "? party.balance : party?.balance}</p>
                    </div>
                    <div className=' mt-2 flex justify-between'>          
                        <p className='font-semibold  text-gray-700 text-base'>GSTIN: </p>
                        <p className='font-small  text-gray-700 text-base'>{party !== null || undefined || ""? party.GSTIN : party?.GSTIN}</p>
                    </div>
                    <div className=' mt-2 flex justify-between'>          
                        <p className='font-semibold  text-gray-700 text-base'>DlNo</p>
                        <p className='font-small  text-gray-700 text-base'>{party !== null || undefined || ""? party.DlNo : party?.DlNo}</p>
                    </div>
                    <div className=' mt-2 flex justify-between'>          
                        <p className='font-semibold  text-gray-700 text-base'>Address</p>
                        <p className='font-small  text-gray-700 text-base'>{party !== null || undefined || ""? party.address : party?.address}</p>
                    </div>
                    <div className=' mt-2 flex justify-between'>          
                        <p className='font-semibold  text-gray-700 text-base'>Points</p>
                        <p className='font-small  text-gray-700 text-base'>{party !== null || undefined || ""? party.points : party?.points}</p>
                    </div>
                </div>
                  </div>
          <div className=' text-center mt-4' id="seller">
            <Link to={{pathname:"/sellerOrderCreation", hash:'order'}}>
                  <button onClick={()=>localStorage.setItem("party",JSON.stringify(party))} className='px-6 bg-primary text-gray-100 border rounded-md py-2 hover:bg-transparent hover:border-secondary hover:text-primary transition'>Create {party !== null || undefined || ""? party.name : party?.name}'s Order</button>
            </Link>
                  </div>
          </div>
          
          </div>
      </div>
  )
}

export default SellerUserSelection