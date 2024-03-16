import React, {useState} from 'react'
import MyContext  from './MyContext'

const MyContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [showTransactionsModal, setShowTransactionsModal] = useState(true)
  const {showTopCards, setShowTopCards} = useState(true)
  return (
    <MyContext.Provider value={{
        user, setUser,
        showTransactionsModal, setShowTransactionsModal,
        showTopCards, setShowTopCards,
    }} >
        {children}
    </MyContext.Provider>
  )
}

export default MyContextProvider