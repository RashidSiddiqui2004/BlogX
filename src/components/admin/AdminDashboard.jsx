 
import React from 'react';
import Navbar from '../homepage/navbar/Navbar' 
import Footer from '../homepage/footer/Footer';
import DashboardContent from './DashboardData';

const AdminDashboard = () => {
    return (
        <div className="h-screen">
        
            {/* Main content container */}
            <div className="flex flex-col flex-1 overflow-y-auto">
             
                <Navbar />

                {/* Dashboard content */}
                <div className="px-6 py-4">
                    <DashboardContent />
                </div>

                {/* Footer */}
                <footer className="px-6 py-4 bg-gray-200 text-gray-600 text-sm text-center">
                    &copy; 2024 Your Tech Society. All rights reserved.
                </footer>
            </div>

            <Footer/>
        </div>
    );
};

export default AdminDashboard;
