import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth, methods } from "../firebase/firebase";
import styles from "../styles/variables.scss"

const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return methods.createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return methods.signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return methods.signOut(auth)
}
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  
  const value = {
    currentUser,
    signup,
    login,
    logout,
    styles
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
