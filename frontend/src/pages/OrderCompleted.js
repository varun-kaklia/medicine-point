import React from "react";
import Breakcrumb from "../components/Breakcrumb";
import {useNavigate} from 'react-router-dom'

const OrderCompleted = () => {
  const navigate = useNavigate()
  return     <div>
  <Breakcrumb id={"Order Completed"} />
  <div className="container ">
    {/* <div className=""><TiTick/></div> */}
    <h2 className="text-4xl text-center">Order Completed</h2>
    <p className="text-md text-center py-2">One of our agent will call you and assist you for your order.</p>
    <div className="text-center pt-2">
    <button onClick={()=>navigate('/myorder')} className="p-2 px-4 bg-primary border border-primary text-slate-100 hover:bg-transparent hover:text-primary rounded mx-2">Order</button>
    <button onClick={()=>navigate('/')} className="p-2 px-4 bg-primary border border-primary text-slate-100 hover:bg-transparent hover:text-primary rounded mx-2">Home</button>
    </div>
    </div>
    </div>
};

export default OrderCompleted;
