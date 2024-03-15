import React from 'react'

const Rightbar = () => {
  return (
    <div className='h-full text-bold w-[32%] align-top  bg-[#202020] rounded-md'>
        <div className='flex p-4'>
          <div className=' text-xl font-bold'>Payment Analytics</div>
          <div className='text-xs text-white'>{new Date().toLocaleString() + ''}</div>
        </div>
        <div className='justify-center align-center p-5'>
          <div className='w-[24vh] h-[24vh] rounded-full bg-gradient-to-br from-red-500 to-blue-100 justify-center align-center ' />
        </div>
        <div className='flex justify-between text-white text-xs py-1'>
          <div>Payment $514</div><div>Receive $2,124</div><div>Send $1,547</div>
        </div>
        <div className='flex justify-between text-white text-xs py-2'>
          <div>Deposit $1,250</div><div>Withdraw $200</div><div></div>
        </div>
        <div className="py-2" />
        <div className='flex flex-col justify-between w-[35vh] h-[24vh] bg-black rounded-md p-5'>
          <div>Want to Help</div>
          <div><button className="bg-blue-700 rounded-md h-[48px]">Donate</button></div>
        </div>
    </div>
  )
}

export default Rightbar