import React, {useState} from 'react'
import MyContext  from './MyContext'

const MyContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [showTransactionsModal, setShowTransactionsModal] = useState(true)
  return (
    <MyContext.Provider value={{
        user, setUser,
        showTransactionsModal, setShowTransactionsModal,
    }} >
        {children}
    </MyContext.Provider>
  )
}

export default MyContextProvider