import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if(!isAuthenticated) {
        return <Navigate to="/" state={{ showAuthModal: true }} replace />
    }

    if(!!isAuthenticated && !user?.isAdmin) {
        return <Navigate to="/" state={{ unauthorizedAcceess: true }} replace />
    } 

    if(!!isAuthenticated && user?.isAdmin) {
        return children
    }
}

export default ProtectedRoute
