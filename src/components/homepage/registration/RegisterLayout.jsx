
import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import RegisterDesign from './RegisterDesign'


const RegisterLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='md:flex md:flex-row'>

                <div className='w-[100%] md:w-[50%]'>
                    <RegisterDesign />
                </div>

                <div className='md:w-[50%]'>
                    {children}
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default RegisterLayout