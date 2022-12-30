import axios from "axios";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    await axios.post("/api/users/register", user);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error });
  }
};

export const updateUser = (point,wallet) => async (dispatch, getState) => {
  dispatch({ type: "UPDATE_USER_REQEUST" });
  const currentUser = getState().loginUserReducer.currentUser
  try {
    const response = await axios.post('/api/users/updatepoint', {point,wallet,currentUser})
    dispatch({type:"USER_UPDATE_SUCCESS", payload:response.data})
  } catch (error) {
    dispatch({type:"USER_UPDATE_FAIL",payload:error})
  }
}

export const updateUserByAdmin = (points,wallet,rid,password) => async (dispatch) => {
  dispatch({ type: "UPDATE_USERBYADMIN_REQEUST" });
  try {
    const response = await axios.post('/api/users/updateUserbyadmin', {points,wallet,rid,password})
    dispatch({type:"USER_UPDATEBYADMIN_SUCCESS", payload:response.data})
  } catch (error) {
    dispatch({type:"USER_UPDATEBYADMIN_FAIL",payload:error})
  }
}

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const response = await axios.post("/api/users/login", user)
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data })
    localStorage.setItem("currentUser", JSON.stringify(response.data))
    window.location.href ="/"
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error });
  }
};

export const getUserDetails = (user) => async(dispatch)=>{
  try{
    const response = await axios.post('/api/users/updateUser',user)
    localStorage.removeItem("currentUser")
    localStorage.setItem("currentUser",JSON.stringify(response.data))
  }catch(error){
    window.alert("Error",error)
  }

}

export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  window.location.href = "/login";
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const res = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_USERS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_USERS_FAIL", payload: err });
  }
};

export const findUserBySeller = (searchUser) => async (dispatch) => {
  dispatch({ type: "GET_USERSBYSELLER_REQUEST" });
  try {
    const res = await axios.post("/api/users/findUserBySeller",{searchUser});
    dispatch({ type: "GET_USERSBYSELLER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_USERSBYSELLER_FAIL", payload: err });
  }
};

export const deleteUser = (userid, name) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/deleteuser", {
      userid,
    });
    window.alert(`${name} is deleted successfully`);
    window.location.reload();
    console.log(res);
  } catch (error) {
    window.alert("Something going wrong, unable to delete medicine", error);
  }
};

export const getUserById = (rid) => async (dispatch) => {
  dispatch({ type: "GET_USERBYID_REQUEST" });
  try {
    const response = await axios.post("/api/users/getuserbyid", {
      rid,
    });
    // console.log("Response of Action file from api", res);
    dispatch({ type: "GET_USERBYID_SUCCESS", payload: response.data })
  } catch (err) {
    dispatch({ type: "GET_USERBYID_FAIL", payload: err });
  }
};
