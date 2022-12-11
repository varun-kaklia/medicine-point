import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductDisplayPage from "./pages/ProductDisplayPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import CheckoutPage from "./pages/CheckoutPage";
import DailyOfferPage from "./pages/DailyOfferPage";
import AdminAccount from "./pages/AdminAccount";
import CartPage from "./pages/cartPage";
import OrderCompleted from "./pages/OrderCompleted";
import OrderScreen from "./pages/OrderScreen";
import UserList from "./components/Admin/UserList";
import MedicineList from "./components/Admin/MedicineList";
import OrderList from "./components/Admin/OrderList";
import EditMedicine from "./components/Admin/EditMedicine";
import AbousUs from "./pages/AbousUs";
import Points from "./pages/Points";
import ContactUs from "./pages/ContactUs";
import DeliveryPolicy from "./pages/DeliveryPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermAndConditions";
import RegistrationCompleted from "./pages/RegistrationCompleted";
import AdminPanel from "./components/Admin/AdminPanel";
import AdminPoints from "./components/Admin/Points";
import PointsDisplayPageProducts from "./components/PointsDisplayPageProducts";
import UserPointsPage from "./pages/userPointsPage";
import BrandPage from "./pages/BrandPage";
import SaltPage from "./pages/SaltPage";
import EditUser from "./components/Admin/EditUser";
import SellerLogin from "./pages/SellerLogin";
import ManageSeller from "./components/Admin/ManageSeller";
import SellerUserSelection from "./pages/SellerUserSelection";
import SellerOrderCreation from "./pages/SellerOrderCreation";
import SellerOrderScreen from "./pages/SellerOrderScreen";
import OrderDeliveryScreen from "./pages/OrderDeliveryScreen";
import DailyOffer from "./components/Admin/DailyOffer";
import EditOrder from "./components/Admin/EditOrder";
import CreateOrder from "./pages/CreateOrder";
import SlideImageEdit from "./components/Admin/SlideImageEdit";

function App() {
  return (
    <Router>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/products/:id" element={<ProductDisplayPage />} />
        <Route path="/pointproducts/:id" element={<PointsDisplayPageProducts />} />
        <Route path="/RegisterPage" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AbousUs />} />
        <Route path="/userpoints" element={<UserPointsPage />} />
        <Route path="/points" element={<Points />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/offer" element={<DailyOfferPage />} />
        <Route path="/admin" element={<AdminAccount />}>
          <Route index element={<AdminPanel />} />
          <Route path="manageaccount" element={<UserList />} />
          <Route path="sliderImageEdit" element={<SlideImageEdit />} />
          <Route path="dailyoffer" element={<DailyOffer />} />
          <Route path="edituser/:rid" element={<EditUser />} />
          <Route path="medicinelist" element={<MedicineList />} />
          <Route path="points" element={<AdminPoints />} />
          <Route path="editmedicine/:id" element={<EditMedicine />} />
          <Route path="orderlist" element={<OrderList />} />
          <Route path="manageSeller" element={<ManageSeller />} />
          <Route path="editorder/:id" element={<EditOrder />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/ordercompleted" element={<OrderCompleted />} />
        <Route path="/myorder" element={<OrderScreen />} />
        <Route path="/deliverypolicy" element={<DeliveryPolicy />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsandcondition" element={<TermsAndConditions />} />
        <Route path="/registrationcompleted" element={<RegistrationCompleted />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/salt" element={<SaltPage />} />
        <Route path="/sellerlogin" element={<SellerLogin />} />
        <Route path="/sellerUserSelection" element={<SellerUserSelection/>} />
        <Route path="/sellerOrderCreation" element={<SellerOrderCreation/>} />
        <Route path="/sellerOrder" element={<SellerOrderScreen/>} />
        <Route path="/deliverOrder" element={<OrderDeliveryScreen/>} />
        <Route path="/createOrder" element={<CreateOrder/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
