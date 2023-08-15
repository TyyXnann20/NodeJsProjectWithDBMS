//import { BrowserRouter as R, Route,  Navigate , } from "react-router-dom";
import { BrowserRouter, Switch, Route , Routes, Navigate} from 'react-router-dom';
import LayoutOne from "./component/layout/LayoutOne";
import LayoutTwo from './component/layout/LayoutTwo';
import HomePage from "./page/home/HomePage";
import CustomerPage from "./page/customer/CustomerPage";
import CategoryPage from "./page/category/CategoryPage";
import ProductPage from "./page/product/ProductPage";
import User from "./page/user/User";
import PaymentMethodPage from "./page/payment_method/PaymentMethodPage";
import OrderStatusPage from "./page/order_status/OrderStatusPage";
import CartPage from "./page/cart/CartPage";
import "./App.css";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage";
import WishList from "./page/wishlist/Wishlist";
import getImp from './page/order/importa';
import CustomerLogin from './page/auth/CustomerLogin';
import CartC from './page/cart/CartPageCustomer';
import Dashboard from './page/home/HomePage';
import Dd from "./page/order/orderbyday"
import ImportProduct from './page/order/importa';
import ProfilePage from './page/profile/profile';
import ReportByMonth from './page/order/ReportMonth';

import PicPage from './page/category/Pic';

// import User
function App() {
  const adminLogin = localStorage.getItem("admin_login") == "1";
  const isLogin = localStorage.getItem("is_login") == "1"; // true
  
  return (
   

    <BrowserRouter>
      {adminLogin && !isLogin && (
        <LayoutOne>
          <Routes>
            <Route path="/Das" element={<HomePage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/order" element={<ImportProduct />} />
            <Route path="/report" element={<ReportByMonth />} />
            <Route path="/payment-method" element={<Dd />} />
           
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<PicPage />} />
            
          </Routes>
        </LayoutOne>
      )}

{!adminLogin && isLogin && (
        <LayoutTwo>
          <Routes>
          
            <Route path="/product" element={<WishList />} />
            <Route path="/user" element={<User />} />
            <Route path="/cartc" element={<CartC />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </LayoutTwo>
      )}


      {(!isLogin || !adminLogin) && (
        <Routes>
          <Route path="/" element={<CustomerLogin />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/customerlogin" element={<CustomerLogin />} />
          <Route path="/register" element={<RegisterPage />} />

        
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default App;
