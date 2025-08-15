
import React from 'react'
import backgroundImage from './WebDev.png'

const RegisterDesign = () => {
    return (
        <div className="flex justify-center items-center py-12 md:py-0 md:min-h-screen overflow-hidden bg-gray-100">
            <div className="md:w-3/4 p-8" style={{ backgroundImage: `url('WebDev.png')` }}>

                <div className="font-bold text-4xl mb-3">
                    Blog
                    <span className="text-[#0096FF]">
                        X
                    </span>
                </div>

                <p className="text-lg text-gray-600 mb-4">Merging Minds, Igniting Ideas: Empowering Tech Enthusiasts with Devcomm.</p>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Why Join Us?</h2>
                <ul className="list-outside list-disc pl-6 text-gray-800">
                    <li className="mb-2">
                        <strong>Community of Tech Enthusiasts </strong>
                    </li>
                    <li className="mb-2">
                        <strong>Learning and Growth Opportunities </strong>
                    </li>
                    <li className="mb-2">
                        <strong>Networking and Connections</strong>
                    </li>
                    <li className="mb-2">
                        <strong>Supportive Environment:</strong>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default RegisterDesign