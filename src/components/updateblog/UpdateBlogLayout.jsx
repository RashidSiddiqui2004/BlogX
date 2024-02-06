
import React, { useContext } from 'react' 
import Navbar from '../homepage/navbar/Navbar'
import myContext from '../../context/data/myContext';
import UpdateBlog from './UpdateBlog';

const UpdateBlogLayout = () => {
  const context = useContext(myContext);
  const { mode } = context;

  const isLightMode = (mode === 'light');

  return (
    <div>
      <Navbar />
      <div className={`${isLightMode ? ' bg-slate-800' : ''}`}>
        <UpdateBlog />
      </div>
    </div>
  )
}

export default UpdateBlogLayout