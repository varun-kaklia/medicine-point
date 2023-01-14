import React from 'react'
import { useNavigate } from 'react-router-dom'
import Breakcrumb from '../components/Breakcrumb'

const RegistrationCompleted =()=>{
    const navigate = useNavigate()
    return(
<div>
  <Breakcrumb id={"Registration Completed"} />
  <div className="container ">
    {/* <div className=""><TiTick/></div> */}
    <h2 className="text-4xl text-center">Registration Completed</h2>
    <p className="text-md text-center py-2">We received your details. Let our team check your details and register with us.</p>
    <div className="text-center pt-2">
    <button onClick={()=>navigate('/login')} className="p-2 px-4 bg-primary border border-primary text-slate-100 hover:bg-transparent hover:text-primary rounded mx-2">Login</button>
    <button onClick={()=>navigate('/')} className="p-2 px-4 bg-primary border border-primary text-slate-100 hover:bg-transparent hover:text-primary rounded mx-2">Home</button>
    </div>
    </div>
    </div>
    )
}

export default RegistrationCompleted