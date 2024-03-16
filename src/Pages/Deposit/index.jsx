import Navbar from "../../ui/Navbar"
import Sidebar from "../../ui/Sidebar"
import DepositForm from "../../ui/_deposit/components/DepositForm"
const Deposit = () => {
  return (
    <div className="flex h-screen w-screen justify-between">
      <Sidebar />
      <div className="flex flex-col w-full">        
        <div className="flex flex-col w-full p-2">
          <Navbar />
        </div>
        <div className="flex w-full h-full"> 
          <DepositForm />
        </div>
      </div>
    </div>
  )
}

export default Deposit