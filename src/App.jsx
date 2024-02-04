 
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import MyState from './context/data/myState';
import { ToastContainer } from 'react-toastify';
// import Login from './components/registration/Login';
// import Signup from './components/registration/Signup';
// import Home from './components/Home';
import NoPage from './components/nopage/NoPage'; 
// import NewFormGeneration from './components/NewFormGeneration';
// import UserDashboard from './components/user-forms/UserDashboard';
// import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <MyState>
      <Router>

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}

          {/* <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} /> */}

          <Route path="/*" element={<NoPage />} />

        </Routes>

        <ToastContainer />

      </Router>
    </MyState>

  )
}

export default App

// user 
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}

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
