import React from 'react'
import Left from './layout/Left'
import Right from './layout/Right'
import Logout from './layout/Logout'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

import toast, { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthProvider'

const App = () => {

  const {authuser, setAuthuser} = useAuth()
  console.log("Auth User = " , authuser)

  return (
  <>
    <Routes>
      {console.log("Rendering Main Layout")}

      <Route path="/" element=
      
      { 
          authuser ? (
          <div className='flex h-screen text-white scrollbar-none'>
              <Logout/>
              <Left/>
              <Right/>
              {/* <h1>This Is Main Layout</h1> */}

              
          </div>
        ) : (
          <Navigate to="/login" />
          // <Login />
        )} 
        
        />

        <Route
          path="/login"
          element={
            authuser ? (
              <Navigate to={"/"} />
            ) : (
              <Login />
            )
          }
        />

        <Route 
          path="/signup" 
          element={
            authuser ? (
                  <Navigate to={"/login"} />
                ) : (
                  <Signup />
                )} 
          />

    </Routes>

    <Toaster />
   

  </>
     
    
  )
}

export default App
