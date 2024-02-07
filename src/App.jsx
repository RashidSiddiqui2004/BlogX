import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

  
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

// import UserDashboard from './components/user-forms/UserDashboard';
// import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
 
          <Route path="/blog" element={<Blog />} />
 
          <Route path='/blog/:blogName/:blogID' element={<Blog/>} />

          <Route path='/add-blog' element={<AddBlogLayout/>} />

          <Route path='/update-blog/:id' element={<UpdateBlogLayout/>} />

          <Route path="/about-us" element={<AboutUs />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/*" element={<NoPage />} />
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


// admin
// const ProtectedRouteForAdmin = ({ children }) => {
//   const admin = JSON.parse(localStorage.getItem('user'))

//   if (admin.user.email === ADMIN_EMAIL) {
//     return children
//   }
//   else {
//     return <Navigate to={'/login'} />
//   }

// }
