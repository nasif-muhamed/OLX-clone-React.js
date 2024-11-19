
// ProtectedRoute.jsx
import React from 'react'
import { useFirebase } from '../../store/FirebaseContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const {user, loading} = useFirebase()

  console.log('protect',user)
  
  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  if (!user){
    return <Navigate to='/login' />
  }
  return children
}

export default ProtectedRoute
