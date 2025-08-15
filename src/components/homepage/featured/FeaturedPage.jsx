
import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import FeaturedSection from './FeaturedSection'

const FeaturedPage = () => {
    return (
        <div>
            <Navbar />
            <div className='mx-8'>
                <FeaturedSection />
            </div>
            <Footer />
        </div>
    )
}

export default FeaturedPage