import Layout from "../../ui/Layout"
import Navbar from "../../ui/Navbar"
import Rightbar from "../../ui/Rightbar"
import Sidebar from "../../ui/Sidebar"
import TopCards from "../../ui/TopCards"
export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen justify-between">
      <Sidebar />
      <div className="flex flex-col w-full">        
        <div className="flex flex-col w-full p-2">
          <Navbar />
          <TopCards />
        </div>
        <div className="flex w-full h-full">          
          <Layout />
          <Rightbar />
        </div>
      </div>
    </div>
  )
}