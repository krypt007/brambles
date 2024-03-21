import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner';

import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

import { RxSketchLogo, RxDashboard, RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';
import { TbActivityHeartbeat } from "react-icons/tb";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  // useEffect(() => {
  //   console.log(user)
  // },[user]);

  const handleLogout = async() => {
    // await signOut(auth);
    //     navigate("/");
    signOut(auth)
    .then(() => {
      // Sign-out successful.
      navigate("/");
      toast.info("Signed out successfully");
    })
    .catch(error => {
      toast.error(error.message);
    });
  }
  return (
    <div className='hidden md:block text-bold w-[20%] align-top bg-[#242424] p-4'>
        <Link to="/Dashboard" className=' text-white font-bold'>
          <div className='flex flex-col justify-between align-center h-[10%] bg-gray-800  hover:bg-gray-400 hover:text-purple-500 hover:font-bold rounded-md py-3'>
            <div className='flex justify-start gap-3 p-2 rounded-md'>
              <div className='p-2 justify-center align-center text-purple-300 text-bold object-inline'><RxDashboard /></div>
              <div className='p-2 justify-start align-center text-purple-300 text-bold object-inline'>Dashboard</div>
            </div>
          </div>
        </Link>
        <div className='py-2' />
        <div className='flex flex-col justify-between h-[60%]'>
          

          <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
            <div className='p-2 font-bold justify-center align-center text-gray-700 text-bold object-inline'><TbActivityHeartbeat /></div>
            <div className='py-2'>Transactions</div>
          </div>

          <Link to="/Deposit" className=' text-white text-bold'>
            <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
              <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><RxSketchLogo /></div>
              <div className='py-2'>Deposit</div>
            </div>
          </Link>

          <Link to="/Transfer" className=' text-white text-bold'>
            <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
              <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><RxSketchLogo /></div>
              <div className='py-2'>Transfer</div>
            </div>
          </Link>

          <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
            <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><HiOutlineShoppingBag /></div>
            <div className='py-2'>Payment</div>
          </div>

          <Link to="/Withdraw" className=' text-white text-bold'>
            <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
              <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><RxSketchLogo /></div>
              <div className='py-2'> Withdraw</div>
            </div>
          </Link>

          <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
            <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><FiSettings /></div>
            <div className='py-2'>Settings</div>
          </div>

          
        </div>
        <div className='flex flex-col justify-end h-[30%]'>
          <Link to="/">
            <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400' onClick={handleLogout}>
              <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><RxSketchLogo /></div>
              <div className='py-2'>Logout</div>
            </div>
          </Link>
        </div>
    </div>
  )
}

export default Sidebar