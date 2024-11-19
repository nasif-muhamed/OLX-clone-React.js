
// ReverselyProtectedRoute
import React from 'react'
import { useFirebase } from '../../store/FirebaseContext'
import { Navigate } from 'react-router-dom'

const ReverselyProtectedRoute = ({children}) => {
  const {user, loading} = useFirebase()
  console.log('reverse',user)

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  if (!user){
    return children
  }
  return <Navigate to='/' />
}

export default ReverselyProtectedRoute
