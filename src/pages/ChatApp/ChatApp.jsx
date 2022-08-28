import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatListTop from '../../components/ChatListTop/ChatListTop'
import InputBar from '../../components/InputBar/InputBar'
import TopBar from '../../components/TopBar/TopBar'
import User from '../../components/User/User'
import { useAuth } from '../../context/AuthContext'
export default function ChatApp() {
    const {currentUser, logout} = useAuth()
    const [error, setError] = useState("")
    const navigate= useNavigate()
    async function handleLogout(e){
        e.preventDefault();
        try {
            setError("")
            await logout()
            navigate("/login")
            
        } catch (error) {
            setError("Failed to log out")
        }
    }
  return (
    <div>
        {currentUser.email}
        <p>{error && error}</p>
        <div>
            <button onClick={handleLogout}>Log out</button>
            <InputBar/>
            <br />
            <TopBar/>
            <br />
            <ChatListTop/>
            <br />
            <User/>
        </div>
    </div>
  )
}
