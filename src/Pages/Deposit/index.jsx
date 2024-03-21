import Sidebar from "../../ui/Sidebar"
import DepositForm from "../../ui/_deposit/components/DepositForm"
const Deposit = () => {
  return (
    <div className="flex h-screen w-screen justify-between">
      <Sidebar />
      <div className="flex flex-col w-full">        
        <div className="flex flex-col w-full p-2">
        <div className='flex w-full h-[5vh] p-2 text-red-100 text-md font-bold  bg-gradient-to-br from-[#242424] to bg-[#404040] rounded-md '>
          Donate Funds
        </div>
        </div>
        <div className="flex w-full h-full"> 
          <DepositForm />
        </div>
      </div>
    </div>
  )
}

export default Deposit