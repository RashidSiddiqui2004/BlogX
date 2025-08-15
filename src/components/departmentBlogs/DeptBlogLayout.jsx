import React, { useContext } from 'react'
import DepartmentBlogs from './DepartmentBlogs'
import Footer from './../homepage/footer/Footer'
import DepartmentBlogsMobile from './DepartmentBlogsMobile'
import NavbarDept from './NavbarDept'
import { useParams } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import Loader from '../../utilities/loader/Loader'

const DeptBlogLayout = () => {

  const context = useContext(myContext);
  const { loading } = context;
  const params = useParams();
  const departmentName = params.deptName;

  return (
    <div>
      {loading ? <Loader />
        :
        <div>
          <NavbarDept department={departmentName} />
          <div className='hidden md:block'>
            <DepartmentBlogs />
          </div> <div className='block md:hidden'>
            <DepartmentBlogsMobile />
          </div>
          <Footer />
        </div>
      }
    </div>
  )
}

export default DeptBlogLayout