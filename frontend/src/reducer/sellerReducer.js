export const loginSellerReducer = (state = {}, action) => {
  switch (action.type) {
    case "SELLER_LOGIN_REQUEST":
      return {
        loading: true,
      };
    case "SELLER_LOGIN_SUCCESS":
      return {
        loading: false,
        success: true,
        currentSeller: action.payload,
      };
    case "SELLER_LOGIN_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllSellerReducer = (state = { sellers: [] }, action) => {
  switch (action.type) {
    case "GET_SELLER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SELLER_SUCCESS":
      return {
        sellers: action.payload,
        loading: false,
      };
    case "GET_SELLER_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
