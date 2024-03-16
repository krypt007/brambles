import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Deposit from './Pages/Deposit';
import Transfer from './Pages/Transfer';
import Withdraw from './Pages/Withdraw';
export default function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Deposit" element={<Deposit />} />
          <Route path="/Transfer" element={<Transfer />} />
          <Route path="/Withdraw" element={<Withdraw />} />
       </Routes>
    </>
  )
}