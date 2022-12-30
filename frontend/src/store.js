import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getAllMedicineReducer,
  addMedicineReducer,
  getMedicineByIdReducer,
  updateMedicineByIdReducer,
  getAllUsersReducer,
  getSearchMedicineReducer,
  getCompanyDataReducer,
  getSaltDataReducer,
  getDailyOfferPageDataReducer,
  getPointsPageDataReducer
} from "./reducer/medicineReducer";
import {getSliderImageReducer} from './reducer/sliderReducer'
import { loginSellerReducer, getAllSellerReducer} from './reducer/sellerReducer'
import { cartReducer } from "./reducer/cartReducer";
import { registerUserReducer, loginUserReducer,updateUserReducer, getUserByIdReducer,updateUserByAdminReducer,findUserBySellerReducer } from "./reducer/userReducer";
import { placeOrderReducer, allUserOrderReducer, placeSellerOrderReducer, matchOtpReducer , getOrderByIdReducer} from "./reducer/orderReducer";
import { getUserOrderReducer, getSellerOrderReducer , updateOrderByIdReducer} from "./reducer/orderReducer";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const currentSeller = localStorage.getItem("currentSeller") ? JSON.parse(localStorage.getItem("currentSeller")) : null;

const rootReducer = combineReducers({
  getAllMedicineReducer: getAllMedicineReducer,
  getPointsPageDataReducer:getPointsPageDataReducer,
  getDailyOfferPageDataReducer:getDailyOfferPageDataReducer,
  getCompanyDataReducer:getCompanyDataReducer,
  getSaltDataReducer :getSaltDataReducer,
  getSearchMedicineReducer:getSearchMedicineReducer,
  cartReducer: cartReducer,
  findUserBySellerReducer:findUserBySellerReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrderReducer: getUserOrderReducer,
  addMedicineReducer: addMedicineReducer,
  getMedicineByIdReducer: getMedicineByIdReducer,
  updateMedicineByIdReducer: updateMedicineByIdReducer,
  updateUserByAdminReducer:updateUserByAdminReducer,
  getUserByIdReducer:getUserByIdReducer,
  allUserOrderReducer: allUserOrderReducer,
  getAllUsersReducer: getAllUsersReducer,
  updateUserReducer: updateUserReducer,
  loginSellerReducer: loginSellerReducer,
  placeSellerOrderReducer: placeSellerOrderReducer,
  getSellerOrderReducer:getSellerOrderReducer,
  getAllSellerReducer:getAllSellerReducer,
  matchOtpReducer:matchOtpReducer,
  getOrderByIdReducer:getOrderByIdReducer,
  updateOrderByIdReducer:updateOrderByIdReducer,
  getSliderImageReducer:getSliderImageReducer
});

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer: {
    currentUser: currentUser,
  },
  loginSellerReducer: {
    currentSeller: currentSeller,
  },

};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
