import {useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function PrivateRoute() {
    const {currentUser} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if(!currentUser){
            navigate("/login", {replace: true})
        }
        
    }, [currentUser, navigate]);
  return (
    <>
         <Outlet/>
    </>
  )
}
