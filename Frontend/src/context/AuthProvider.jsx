import React from 'react'
import { createContext, useState, useContext } from 'react'
import jsCookies from 'js-cookie'


const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const initialState = jsCookies.get("jwt") || localStorage.getItem("userInfo");

    const [authuser, setAuthuser] = useState(initialState ? JSON.parse(initialState) : undefined)

  return (
    <AuthContext.Provider value ={{authuser, setAuthuser}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

