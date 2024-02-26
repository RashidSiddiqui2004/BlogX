import React from 'react'
import DepartmentBlogs from './DepartmentBlogs'
import Navbar from './../homepage/navbar/Navbar'
import Footer from './../homepage/footer/Footer'
import DepartmentBlogsMobile from './DepartmentBlogsMobile'
import NavbarDept from './NavbarDept'
import { useParams } from 'react-router-dom'

const DeptBlogLayout = () => {

  const params = useParams();
  const departmentName = params.deptName;

  return (
    <div>

      <NavbarDept department={departmentName}/>

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