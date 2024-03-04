import React from 'react'
import MyContext  from '../context/MyContext';

import { useContext,  } from 'react';


const TopCards = () => {
  const {showTransactionsModal, setShowTransactionsModal} = useContext(MyContext);
  return (
    <div className='flex w-full h-[10vh] bg-[#111E30]justify-between p-1 items-center hover:text-color-1 gap-1'>
        <div className='rounded-sm bg-[#111E30] p-5 w-full h-full  hover:cursor-pointer hover:bg-[#67B2B4]'>
            Balance
        </div>
        <div className='rounded-sm bg-[#111E30] p-5 w-full h-full hover:cursor-pointer hover:bg-[#67B2B4]'>
            Quick Transfer
        </div>
        <div className='rounded-sm bg-[#111E30] p-5 w-full h-full hover:cursor-pointer hover:bg-[#67B2B4]'>
            <button className='bg-primary-1' onClick={()=>setShowTransactionsModal(!showTransactionsModal)}>
                {showTransactionsModal?<p>Deposit</p> : <p>Transactions</p>}
            </button>
        </div>
    </div>
  )
}

export default TopCards