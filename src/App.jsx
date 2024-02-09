import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MyState from "./context/data/myState";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/homepage/registration/Login";
import Signup from "./components/homepage/registration/Signup";
import { ToastContainer } from 'react-toastify';
import NoPage from './components/nopage/NoPage';
import Blog from './components/blog/Blog';
import AddBlogLayout from './components/addBlog/AddBlogLayout';


import UpdateBlogLayout from "./components/updateblog/UpdateBlogLayout";
import AboutUs from "./components/aboutus/AboutUs";
import AdminDashboard from "./components/admin/AdminDashboard";
import { ADMIN_EMAIL } from "./utilities/admin/AdminDetails"; 
import Layout from "./components/Layout";
import TrendingPage from "./components/trendingBlogs.jsx/TrendingPage";
import RegisterLayout from "./components/homepage/registration/RegisterLayout";
import FeaturedPage from "./components/homepage/featured/FeaturedPage"; 
import DeptBlogLayout from "./components/departmentBlogs/DeptBlogLayout";

// import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/add-blog" element={<AddBlogLayout />} />

          <Route path='/blog/:blogName/:blogID' element={<Blog />} />

          <Route path='/department/:deptName' element={<DeptBlogLayout />} />

          <Route path='/update-blog/:id' element={<UpdateBlogLayout />} />

          <Route path='/featured-blogs' element={<FeaturedPage />} />

          <Route path="/trending-blogs" element={<div>
            <Layout>
              <TrendingPage />
            </Layout>
          </div>}
          />

          <Route path="/about-us" element={<AboutUs />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={
            <div>
            <RegisterLayout>
              <Signup />
            </RegisterLayout>
          </div>
          } />

          <Route path="/*" element={<NoPage />} />

          <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />

        </Routes>

        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App;

// user
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

// admin verfication 
const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))

  if (admin.user.email === ADMIN_EMAIL) {
    return children
  }
  else {
    return <Navigate to={'/'} />
  }

}
