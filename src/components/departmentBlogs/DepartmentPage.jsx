import React from 'react';
import Navbar from '../homepage/navbar/Navbar';
import Footer from '../homepage/footer/Footer';
import CategorySection from '../homepage/categories/Categories';

const DepartmentPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <CategorySection />
      <div className='flex-grow'></div> 
      <Footer />
    </div>
  );
};

export default DepartmentPage;
