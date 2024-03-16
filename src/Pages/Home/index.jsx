import React from 'react'
import { Link } from 'react-router-dom'


import { Footer, Stats, Hero } from "../../ui/_home/components";

const Home = () => {
  return (
    <div className="bg-primary w-screen overflow-hidden">
        <div className={`flex flex-col bg-black flex justify-center items-center`}>
          <div className='flex h-[5%] p-2 bg-gray-800 w-full justify-between '>
            <div>Navbar</div>
            <div className='flex gap-2 text-sm font-bold'>
              <div className='hover:cursor-pointer hover:text-red-300'>
                <Link to="/Deposit" className='text-white hover:text-red-300'> <div className='p-2 rounded-md hover:bg-gray-400'>Donate</div></Link>
              </div>
              <div className='hover:cursor-pointer hover:text-purple-500'>
                <Link to="/Dashboard" className='text-white font-bold hover:text-purple-500'><div className='p-2 rounded-md hover:bg-gray-400'>Dashboard</div></Link>
              </div>
            </div>
          </div>
          <div className={`xl:max-w-[1280px] w-full`}>
            <Hero />
          </div>
        </div>
        
        <div className="bg-black sm:px-16 px-6 flex justify-center items-center">
          <div className={`xl:max-w-[1280px] w-full`}>
            <Stats />
            <Footer /> 
          </div>
        </div>
    </div>
  )
}

export default Home