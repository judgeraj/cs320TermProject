import React from 'react'
import * as FaIcons from 'react-icons/fa'
import { link } from 'react-router-dom'

function Sidebar() {
  return (
    <>
        <div className='Sidebar'>
            <link to="#" className='menu-bars'>
                <FaIcons.FaBars/> 
            </link>
        </div>
    </>
  );
}

export default Sidebar