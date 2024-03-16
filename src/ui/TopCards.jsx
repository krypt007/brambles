import React from 'react'
import MyContext  from '../context/MyContext';

import { useContext,  } from 'react';
import { RxPerson } from 'react-icons/rx';


const TopCards = () => {
  const {showTransactionsModal, setShowTransactionsModal} = useContext(MyContext);
  const {showTopCards, setShowTopCards} = useContext(MyContext);
  return (
    <div className='flex w-full h-[20vh] bg-[#242424] justify-between rounded-md p-2 items-center hover:text-color-1 gap-1'>
        <div className='flex w-[100%] h-[100%] gap-3 pr-2'>
            <div className='flex flex-col rounded-sm bg-[#363636] p-5 w-[30%] h-full justify-between hover:bg-gray-700'>
                <div className='flex justify-between align-top'>
                    <div className='flex text-white font-bold'>Balance</div>
                    <div className='flex text-blue-500 hover:text-white hover:cursor-pointer hover:border-purple-500'>Withdraw</div>
                </div>
                <div className='flex justify-between align-top'>
                    <div className='flex text-white text-2xl font-bold'>$5232.78</div>
                    <div className='flex text-gray-300'>USD</div>
                </div>
                <div className='flex justify-between align-top'>
                    <div className='flex text-white text-sm'>Wallet ID</div>
                    <div className='flex text-gray-300 text-xs'>24584929 </div><div className='justify-start '><RxPerson/></div>
                </div>
            </div>
            <div className='rounded-sm bg-[#343434] p-5 w-[70%] h-full hover:cursor-pointer hover:bg-gray-700'>
                Quick Transfer
            </div>
        </div>
        <div className='rounded-sm bg-[#323232] p-5 w-[30%] h-full hover:cursor-pointer hover:bg-gray-700'>
            <button className='bg-primary-1' onClick={()=>setShowTransactionsModal(!showTransactionsModal)}>
                {showTransactionsModal?<p>Deposit</p> : <p>Transactions</p>}
            </button>
        </div>
    </div>
  )
}

export default TopCards