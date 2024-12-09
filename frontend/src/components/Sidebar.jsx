import React from 'react'
import { AiFillCompass, AiFillHome } from 'react-icons/ai'
import { BiSolidMusic } from 'react-icons/bi'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { IoMusicalNotes, IoSettings } from 'react-icons/io5'
import { MdOutlineLogout } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-[350px] bg-custom-dark text-white p-4 h-screen">
        <div className='pl-10 flex flex-col gap-60'>
            <div>
      <div className="text-2xl flex font-bold mb-4"><IoMusicalNotes className='mr-5 text-second-primay' size={50}/><span className='text-second-primay text-3xl mt-1 font-medium'>Dreame</span><span className='mt-1 text-3xl font-medium'>Music</span></div>
      <p className='text-xs py-2 text-gray-300 font-sans opacity-75'>MENU</p>
      <ul>
        <li className="mb-4">
          <Link to="/" className="hover:text-gray-400 flex"><AiFillHome className='text-second-primay' size={28} /><span className='font-sans font-semibold ml-4 mt-1'>Home</span></Link>
        </li>
        <li className="mb-4">
          <Link to="/trend" className="hover:text-gray-400 flex"><FaArrowTrendUp className='text-second-primay' size={28}/><span className='font-sans font-semibold ml-4 mt-1'>Trend</span></Link>
        </li>
        <li className="mb-4">
          <Link to="/library" className="hover:text-gray-400 flex"><BiSolidMusic className='text-second-primay' size={28}/><span className='font-sans font-semibold ml-4 mt-1'>Library</span></Link>
        </li>
        <li className="mb-4">
          <Link to="/discover" className="hover:text-gray-400 flex"><AiFillCompass className='text-second-primay' size={28}/><span className='font-sans font-semibold ml-4 mt-1'>Discover</span></Link>
        </li>
      </ul>
            </div>
            <div className='justify-end'>
            <p className='text-xs py-2 text-gray-300 font-sans opacity-75'>GENERAL</p>
            <ul>
        <li className="mb-4">
          <Link to="" className="hover:text-gray-400 flex"><IoSettings className='text-second-primay' size={28}/><span className='font-sans font-semibold ml-4 mt-1'>Settings</span></Link>
        </li>
        <li className="mb-4">
          <Link to="" className="hover:text-gray-400 flex"><MdOutlineLogout className='text-second-primay' size={28}/><span className='font-sans font-semibold ml-4 mt-1'>Log Out</span></Link>
        </li>
      </ul> 
            </div>
        </div>
    </div>
  )
}

export default Sidebar
