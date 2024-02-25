import React from 'react'
import DepartmentBlogs from './DepartmentBlogs'
import Navbar from './../homepage/navbar/Navbar'
import Footer from './../homepage/footer/Footer'
import DepartmentBlogsMobile from './DepartmentBlogsMobile'

const DeptBlogLayout = () => {
  return (
    <div>

      <Navbar />

      <div className='hidden md:block'>
        <DepartmentBlogs />
      </div>

      <div className='block md:hidden'>
        <DepartmentBlogsMobile />
      </div>

      <Footer />
    </div>
  )
}

export default DeptBlogLayout