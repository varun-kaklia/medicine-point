import axios from "axios";

export const loginSeller = (seller) => async (dispatch) => {
    dispatch({ type: "SELLER_LOGIN_REQUEST" });
  try {
    const response = await axios.post("/api/seller/login", seller)
    dispatch({ type: "SELLER_LOGIN_SUCCESS", payload: response.data })
    localStorage.setItem("currentSeller", JSON.stringify(response.data))
    window.location.href ="/"
  } catch (error) {
    dispatch({ type: "SELLER_LOGIN_FAIL", payload: error });
  }
};

export const logoutSeller = () => (dispatch) => {
  localStorage.clear();
  window.location.href = "/sellerlogin";
};


export const getAllSeller = () => async (dispatch) => {
  dispatch({ type: "GET_SELLER_REQUEST" });
  try {
    const res = await axios.get("/api/seller/getallseller");
    // console.log("Response of Action file from api", res);
    dispatch({ type: "GET_SELLER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_SELLER_FAIL", payload: err });
  }
};