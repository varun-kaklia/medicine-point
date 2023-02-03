import axios from "axios";

export const placeOrder = (subTotal,newSubTotal,useWallet,wallets,remarks,pendingPoints) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });
  const currentUser = getState().loginUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;
  try {
    const res = await axios.post("/api/orders/placeorder", {
      subTotal,
      newSubTotal,
      currentUser,
      cartItems,
      useWallet,
      wallets,
      remarks,
      pendingPoints
    });
    dispatch({ type: "PLACE_ORDER_SUCCESS",res });
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAIL", error });
    // console.log(error);
  }
};

export const placeSellerOrder = (subTotal, remarks, user) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_SELLERORDER_REQUEST" });
  const currentSeller = getState().loginSellerReducer.currentSeller;
  const cartItems = getState().cartReducer.cartItems;
  try {
    const res = await axios.post("/api/orders/placesellerorder", {
      subTotal,
      currentSeller,
      cartItems,
      remarks,
      user
    });
    dispatch({ type: "PLACE_SELLERORDER_SUCCESS",res });
  } catch (error) {
    dispatch({ type: "PLACE_SELLERORDER_FAIL", error });
    // console.log(error);
  }
};



export const getUserOrder = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({
    type: "USER_ORDER_REQUEST",
  });
  try {
    const response = await axios.post("/api/orders/getuserorder", {
      userid: currentUser._id,
    });
    // console.log(response);
    dispatch({ type: "USER_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "USER_ORDER_FAIL", payload: error });
  }
};

export const getSellerOrder = (sellerID, limit) => async (dispatch) => {
  dispatch({type: "SELLER_ORDER_REQUEST"});
  try {
    const response = await axios.post("/api/orders/getsellerorder",{sellerID, limit});
    dispatch({ type: "SELLER_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "SELLER_ORDER_FAIL", payload: error });
  }
};


export const getAllOrders = () => async (dispatch) => {
  // const currentUser = getState().loginUserReducer.currentUser;
  dispatch({
    type: "ALL_ORDER_REQUEST",
  });
  try {
    const response = await axios.get("/api/orders/alluserorder");
    dispatch({ type: "ALL_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ALL_ORDER_FAIL", payload: error });
  }
};

export const deliverOrder = (orderid) => async (dispatch, getState) => {
  // const currentUser = getState().loginUserReducer.currentUser;
  dispatch({
    type: "GET_ALL_ORDER_REQUEST",
  });
  try {
    await axios.post("/api/orders/deliverorder", { orderid });
    window.alert("Order Delivered Successfully.!");
    window.location.reload()
    const orders = await axios.get("/api/orders/alluserorder");
    dispatch({ type: "GET_ALL_ORDER_SUCCESS", payload: orders.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDER_FAIL", payload: error });
  }
};

export const assignDelivery = (orderId,deliveryBy)=> async (dispatch)=>{
  try {
   await axios.post("/api/orders/assignDelivery",{orderId,deliveryBy});
   window.location.reload()
  } catch (error) {
    window.alert("Some Kind of Error Found",error)
  }
}

export const generateOtp = (email, orderId)=> async(dispatch)=>{
  try{
    const res = await axios.post("/api/orders/generateOtp",{email, orderId})
    console.log("Response", res)
  }
  catch(error){
    window.alert("Some Kind of Error Found",error)
  }
}

export const matchOtp = (otp, orderId)=> async(dispatch)=>{
  dispatch({
    type:"MATCH_OTP_REQUEST"
  })
  try{
    const res = await axios.post("/api/orders/matchOtp",{otp, orderId})
    console.log("Response",res)
    dispatch({type:"MATCH_OTP_SUCCESS", payload: res.data})
    window.location.reload()
  }
  catch(error){
    dispatch({type:"MATCH_OTP_FAIL", payload:error})
  }
}


export const getOrderById = (id) => async (dispatch) => {
  dispatch({ type: "GET_ORDERBYID_REQUEST" });
  try {
    const response = await axios.post("/api/orders/getorderbyid", {
      id,
    });
    // console.log("Response of Action file from api", res);
    dispatch({ type: "GET_ORDERBYID_SUCCESS", payload: response.data })
  } catch (err) {
    dispatch({ type: "GET_ORDERBYID_FAIL", payload: err });
  }
};


export const updateOrder = (updateThisOrder) => async (dispatch) => {
  dispatch({ type: "UPDATE_ORDER_REQUEST" });
  try {
    // console.log("New Data in Medicine Action", formData)
    const response = await axios.post("/api/orders/updateorder", 
    updateThisOrder
    );
    // console.log("Response of Action file from api", res);
    dispatch({ type: "UDPATE_ORDER_SUCCESS", payload: response.data });
    window.location.href = "/admin/orderlist";
  } catch (err) {
    dispatch({ type: "UDPATE_ORDER_FAIL", payload: err });
  }
};