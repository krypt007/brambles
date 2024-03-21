import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner'

import { auth } from "../src/lib/firebase";

import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Deposit from './Pages/Deposit';
import Transfer from './Pages/Transfer';
import Withdraw from './Pages/Withdraw';


export default function App() {

  const user = auth.currentUser;

  return (
    <>
      <Toaster richColors  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="*" element={<p className='p-3 items-center justify-center'>404! Page not Found!</p>} />
      </Routes>
    </>
  )
}