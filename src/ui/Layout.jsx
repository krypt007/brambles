import React from 'react'
import Transactions from './Transactions'
import MyContext from "../context/MyContext";
import { useContext } from 'react';
import DepositForm from '../ui/_dashboard/DepositForm';


const Layout = () => {
    // const level = useContext(MyContext);
  const {showTransactionsModal} = useContext(MyContext)
  return (
    <div className='flex flex-col w-full h-full p-2'>
        <MyContext.Provider value={showTransactionsModal}>
            {showTransactionsModal && <Transactions />}
            {!showTransactionsModal && <DepositForm />}
        </MyContext.Provider>        
    </div>    
  )
}

export default Layout