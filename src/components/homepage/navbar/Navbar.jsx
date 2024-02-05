
import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext'

const Navbar = () => {

  const context = useContext(myContext);
  const {mode,toggleMode} = context;

  return (
    <div>
      <h1>Navbar</h1>
      <button onClick={toggleMode}>Switch Theme</button>
    </div>
  )
}

export default Navbar