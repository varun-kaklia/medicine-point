export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLACE_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PLACE_ORDER_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "PLACE_ORDER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const placeSellerOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLACE_SELLERORDER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PLACE_SELLERORDER_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "PLACE_SELLERORDER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getUserOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "USER_ORDER_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "USER_ORDER_SUCCESS":
      return {
        loading: false,
        succes: true,
        orders: action.payload,
      };
    case "USER_ORDER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getSellerOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "SELLER_ORDER_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "SELLER_ORDER_SUCCESS":
      return {
        loading: false,
        succes: true,
        orders: action.payload,
      };
    case "SELLER_ORDER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getOrderByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ORDERBYID_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ORDERBYID_SUCCESS":
      console.log("Payload Data", action);
      return {
        order: action.payload,
        loading: false,
      };
    case "GET_ORDERBYID_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const updateOrderByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_REQUEST":
      return {
        ...state,
        updateloading: true,
      };
    case "UPDATE_ORDER_SUCCESS":
      return {
        updatesuccess: true,
        updateloading: false,
      };
    case "UPDATE_ORDER_FAIL":
      return {
        updateerror: action.payload,
        updateloading: false,
      };

    default:
      return state;
  }
};

export const allUserOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ALL_ORDER_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "ALL_ORDER_SUCCESS":
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };
    case "ALL_ORDER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const matchOtpReducer = (state ={ otp :[]}, action)=>{
  switch (action.type) {
    case "MATCH_OTP_REQUEST":
      return{
        loading:true,
        ...state
      }
    case "MATCH_OTP_SUCCESS":
      return{
        loading:false,
        success:true,
        otp: action.payload
      }
    case "MATCH_OTP_FAIL":
      return{
        loading:false,
        error:action.payload
      }
    default:
      return state
  }
}