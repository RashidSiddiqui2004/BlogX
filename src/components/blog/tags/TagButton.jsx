
import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext';

const TagButton = ({ tagName }) => {

    const context = useContext(myContext);
    const { mode } = context;

    const isLightMode = (mode === 'light');
    
    const buttonStyle = {
        backgroundColor: isLightMode ? '#d3d3d3' : '#2c3e50',
        color: isLightMode ? '#000000' : '#ffffff',
    };

    return (
        <div className='py-2 px-2 md:px-4 rounded-lg w-fit' style={buttonStyle}>
            {tagName}
        </div>)
}

export default TagButton