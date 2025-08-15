import React, { useEffect } from 'react';
import Navbar from '../homepage/navbar/Navbar';
import Footer from '../homepage/footer/Footer';
import CategorySection from '../homepage/categories/Categories';

const DepartmentPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <CategorySection /> 
      <div className='flex-grow'></div>
      <Footer />
    </div>
  );
};

export default DepartmentPage;
