import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { db } from '../firebase/firebase'

const MessageContext = React.createContext()
export default function MessageProvider({children}) {
    const [message, setMessage] = useState('')
    async function chatRoom(){
        const texts = query(collection(db, 'message'), orderBy('createdAt'), limit(25))
        const querySnapshot = await getDocs(texts)
    }
    const value = {
        message,
        setMessage
    }
  return (
    <MessageContext.Provider value={value}>
        {children}
    </MessageContext.Provider>
  )
}
export function useMessages(){
    return useContext(MessageContext)
}
