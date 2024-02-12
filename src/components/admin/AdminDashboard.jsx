
import React from 'react';
import Navbar from '../homepage/navbar/Navbar'
import Footer from '../homepage/footer/Footer';
import DashboardContent from './DashboardData';

const AdminDashboard = () => {
    return (

        < div className="flex flex-col flex-1 overflow-y-auto" >

            <Navbar />

            <div className="px-6 py-4">
                <DashboardContent />
            </div>

            <Footer />

        </div >
    );
};

export default AdminDashboard;
