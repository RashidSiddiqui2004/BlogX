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
import DepartmentPage from "./components/departmentBlogs/DepartmentPage";
import Code_Editor from "./components/code-editor/Editor";
import { useUser } from "./hooks/useUser";


function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/add-blog" element={
            <ProtectedRouteForAuthors>
              <AddBlogLayout />
            </ProtectedRouteForAuthors>} />

          <Route path='/blog/:blogName/:blogID' element={
            <Blog />
          } />

          <Route path='/department/:deptName' element={<DeptBlogLayout />} />

          <Route path='/update-blog/:id' element={<UpdateBlogLayout />} />

          <Route path='/featured-blogs' element={<FeaturedPage />} />

          <Route path='/departments' element={<DepartmentPage />} />

          <Route path="/trending-blogs" element={<div>
            <Layout>
              <TrendingPage />
            </Layout>
          </div>}
          />

          <Route path="/about-us" element={<AboutUs />} />

          <Route path="/login"
            element={
              <div>
                <RegisterLayout>
                  <Login />
                </RegisterLayout>
              </div>
            } />

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

          <Route path="/Editor" element={<Code_Editor />} />

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


// author verfication 
const ProtectedRouteForAuthors = ({ children }) => {

  const { userId, isAuthor } = useUser(); 

  // console.log(isAuthor);

  // if (isAuthor === true) {
    return children
  // }

  // else {
    return <Navigate to={'/'} />
  // }

}