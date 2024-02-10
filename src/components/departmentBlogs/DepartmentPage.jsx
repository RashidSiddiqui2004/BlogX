
import React from 'react'
import Navbar from '../homepage/navbar/Navbar'
import Footer from '../homepage/footer/Footer'
import CategorySection from '../homepage/categories/Categories'

const DepartmentPage = () => {
  return (
    <div>
      <Navbar />

      <CategorySection />
      <div className='flex-grow'></div>

      <Footer />
    </div>
  )
}

export default DepartmentPage