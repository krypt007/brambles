import { Toaster, toast } from 'sonner'
import Sidebar from "../../ui/Sidebar"
import {WithdrawForm} from "../../ui/_withdraw"
const Withdraw = () => {
  return (
    <div className="flex h-screen w-screen justify-between">
      <div className='hidden md:block'><Sidebar /></div>
      <div className="flex flex-col w-full">        
        <div className="flex flex-col w-full p-2">          
          <div className='flex w-full h-[5vh] p-2 text-red-100 text-md font-bold  bg-gradient-to-br from-[#242424] to bg-[#404040] rounded-md justify-center '>
           Withdraw from E-Wallet to NCBA
          </div>
        </div>
        <div className="flex flex-col p-5 pt-10 justify-between w-full h-full"> 
          <WithdrawForm />
        
          <button onClick={() => toast.success('...feature coming soon')}>
            Send Funds
          </button>
        
        </div>
      </div>
    </div>
  )
}

export default Withdraw