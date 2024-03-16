import React from 'react'
import { Link } from 'react-router-dom'
import { RxSketchLogo, RxDashboard, RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';
import { TbActivityHeartbeat } from "react-icons/tb";

const Sidebar = () => {
  const handlesubmit = async(e) => {
    try {
      e.preventDefault();
      alert('Button clicked');
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"name": "Jason"})
      };
      let responseData = await fetch('https://brambles-express-gzwsdj55u-marastreams.vercel.app/api/post', options);
      let data = responseData.json();
      console.log(data);
      alert('successful fetch API Call');
      alert(JSON.stringify(data));
      
      alert('Post fetch clicked');
    } catch (error) {
      alert("Catch Error: "+error.message);
    }
  }
  return (
    <div className='text-bold w-[20%] align-top bg-[#242424] p-4'>
        <div className='flex flex-col justify-between align-center h-[10%] bg-gray-600  hover:bg-gray-400 rounded-md py-3'>
          <div className='flex justify-start gap-3 p-2 rounded-md'>
              <div className='p-2 justify-center align-center text-purple-300 text-bold object-inline'><RxDashboard /></div>
              <div className='p-2 justify-start align-center text-purple-300 text-bold object-inline'>
                <Link to="/Dashboard" className=' text-purple-300 text-bold'> Dashboard </Link>
              </div>
            </div>
        </div>
        <div className='p-2' />
        <div className='flex flex-col justify-between h-[60%]'>
          

          <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
            <div className='p-2 font-bold justify-center align-center text-gray-700 text-bold object-inline'><TbActivityHeartbeat /></div>
            <div>Transactions</div>
          </div>

          <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
            <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><RxSketchLogo /></div>
            <div><Link to="/Deposit"> Deposit </Link></div>
          </div>

          <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
            <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><RxSketchLogo /></div>
            <div>
              <Link to="/Transfer" className=' text-white text-bold'> Transfer </Link>
            </div>
          </div>

          <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
            <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><HiOutlineShoppingBag /></div>
            <div>Payment</div>
          </div>

          <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
            <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><RxSketchLogo /></div>
            <div>
              <Link to="/Withdraw" className=' text-white text-bold'> Withdraw </Link>
            </div>
          </div>

          <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
            <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><FiSettings /></div>
            <div>Settings</div>
          </div>

          
        </div>
        <div className='flex flex-col justify-end h-[30%]'>
          <div className='flex justify-start gap-3 p-2 rounded-md hover:bg-gray-400'>
            <div className='p-2 justify-center align-center text-purple-700 text-bold object-inline'><RxSketchLogo /></div>
            <div><Link to="/"> Logout </Link></div>
          </div>
        </div>
    </div>
  )
}

export default Sidebar