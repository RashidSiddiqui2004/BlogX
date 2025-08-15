import React from 'react';
import Navbar from '../homepage/navbar/Navbar';
import Footer from '../homepage/footer/Footer';
import Team from './blogx.jpeg';

const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <div className='py-10 min-h-screen'>
                <h1 className='text-4xl font-serif text-center mb-8'>DevComm - International Developers Community</h1>
                <div className='flex justify-center items-center mb-8'>
                    <img src={Team} alt="Devcomm" className='w-[50%] md:w-[40%] rounded-md hover:scale-[103%] transition-all' />
                </div>
                <p className='text-sm font-medium text-left max-w-prose mx-auto 
                 border-slate-700 border-2 rounded-lg py-3 px-3'>
                    Welcome to DevComm, a vibrant and diverse community of developers from around the world.
                    Our mission is to foster collaboration, learning, and innovation in the field of technology.
                    Whether you're a seasoned developer or just starting your journey,
                    we provide resources, support, and opportunities for growth.
                    Join us and be a part of the global community shaping the future of technology.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
