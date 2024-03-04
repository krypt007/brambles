import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"
import Rightbar from "./components/Rightbar"
import Sidebar from "./components/Sidebar"
import TopCards from "./components/TopCards"
export default function App() {
  return (
    <div className="flex h-screen w-screen justify-between">
      <Sidebar />
      <div className="flex flex-col w-full">        
        <div className="flex flex-col w-full p-2">
          <Navbar />
          <TopCards />
        </div>
        <div className="flex w-full h-full">          
          <Dashboard />
          <Rightbar />
        </div>
      </div>
    </div>
  )
}