
import React, { useContext } from 'react'
import AddBlog from './AddBlog'
import Navbar from '../homepage/navbar/Navbar'
import Footer from '../homepage/footer/Footer'
import myContext from '../../context/data/myContext';

const AddBlogLayout = () => {
    const context = useContext(myContext);
    const { mode } = context;

    const isLightMode = (mode === 'light');

    return (
        <div>
            <Navbar />
            <div className={`${isLightMode ? ' bg-slate-800' : ''}`}>
                <AddBlog />
            </div>
            <Footer/>
        </div>
    )
}

export default AddBlogLayout