import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase/firebase'

export default function Home() {
    const [users, setUsers] = useState([])
    const {currentUser} = useAuth()
    //get all users
    useEffect(()=> {
        const usersRef = collection(db, "users")
        // get query of all users except the current logged in user
        const getAllUsers = query(usersRef, where('uid', 'not-in', [currentUser.uid]))
        const unsubscribe = onSnapshot(getAllUsers, snapshot => {
            let users = []
            snapshot.forEach(doc => {
                users.push(doc.data())
            })
            setUsers([users])
        })
        return () => unsubscribe()
    }, [currentUser.uid])
    console.log(users);
  return (
    <div>Home</div>
  )
}
