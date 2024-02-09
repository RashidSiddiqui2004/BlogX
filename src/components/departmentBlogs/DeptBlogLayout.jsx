
import React from 'react'
import DepartmentBlogs from './DepartmentBlogs'
import Navbar from './../homepage/navbar/Navbar'
import Footer from './../homepage/footer/Footer'

const DeptBlogLayout = () => {
  return (
    <div>
        <Navbar/>
        <DepartmentBlogs/>
        <Footer/>
    </div>
  )
}

export default DeptBlogLayout