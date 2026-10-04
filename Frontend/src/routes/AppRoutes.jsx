import { Route, Routes } from "react-router-dom";

import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import UserLayout from "../layouts/UserLayout/UserLayout";

import DashboardPage from "../pages/admin/Dashboard/DashboardPage";
import UsersPage from "../pages/admin/Users/UsersPage";
import ProductPage from "../pages/admin/Products/ProductPage";
import AddProductPage from "../pages/admin/Products/AddProductPage";
import Inventory from "../pages/admin/Inventory/Inventory";
import OrderPage from "../pages/admin/Orders/OrderPage.jsx";

import Login from "../pages/Login_Signup/Login";
import SignUp from "../pages/Login_Signup/SignUp";

import Home from "../pages/user/Home/Home.jsx";
import Product from "../pages/user/Product/Product.jsx";
import About from "../pages/user/About/About.jsx";
import Contact from "../pages/user/Contact/Contact.jsx";
import Cart from "../pages/user/Cart/Cart.jsx";
import ProductDetails from "../pages/user/Product/ProductDetails.jsx";
import OrdersPage from "../pages/user/Order/OrdersPage.jsx";
import WishlistPage from "../pages/user/Wishlist/WishlistPage.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx"
import AdminProtectedRoute from "./AdminProtectedRoute.jsx"


function AppRoutes() {
  return (
    <Routes>
      
      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      <Route path="/" element={<UserLayout/>}>
          
          {/* PUBLIC ROUTE */}
          <Route index element={<Home/>} />

          <Route path="product" element={<Product/>}/>

          <Route path="product/:productId" element={<ProductDetails/>}/>

          <Route path="about" element={<About/>}/>

          <Route path="contact" element={<Contact/>}/>

          {/* PROTECTED USER ROUTE */}
          <Route path="/cart" element={
              <ProtectedRoute>
                 <Cart/>
              </ProtectedRoute>
             }
          />

          <Route path="/orders" element={
                <ProtectedRoute>
                  <OrdersPage/>
                </ProtectedRoute>
            }
          />
          
          <Route path="/wishlist" element={
              <ProtectedRoute>
                <WishlistPage/>
              </ProtectedRoute>
            }
          />
      </Route>
      
      {/* // ADMIN SIDE */}
      <Route 
         path="/admin"
         element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute> 
        }
      >

        <Route index element={<DashboardPage />} /> 

        <Route path="user" element={<UsersPage />} />

        <Route path="products" element={<ProductPage />} />

        <Route path="product/add" element={<AddProductPage />} />

        <Route path="product/edit/:id" element={<AddProductPage />} />

        <Route path="inventory" element={<Inventory />} />

        <Route path='orders' element={<OrderPage/>}/>

      </Route>

    </Routes>
  )
}

export default AppRoutes