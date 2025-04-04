import React, { useState } from 'react'
import { HiOutlineX } from "react-icons/hi";
import { HiOutlineMenu } from "react-icons/hi";
import Sidebar from './Sidebar';



const Navbar = ({activeMenu}) => {

    const [openSideMenu, setOpenSideMenu] = useState(false)
    return (
        <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-6 sticky top-0 z-30'>
            <button 
            className='block lg:hidden text-black'
            onClick={() => {
                setOpenSideMenu(!openSideMenu)
            }}
            >
                {openSideMenu ? (
                    <HiOutlineX className='text-2xl' />
                ) : (
                    <HiOutlineMenu  className='text-2xl'/>

                )}

            </button>

            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <Sidebar activeMenu = {activeMenu}/>
                </div>
            )}

        </div>
    )
}

export default Navbar
