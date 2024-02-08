
import React from 'react';
import Navbar from './homepage/navbar/Navbar'
import Footer from './homepage/footer/Footer'

const Layout = ({ children }) => {

    return (
        <div>
            <Navbar />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
