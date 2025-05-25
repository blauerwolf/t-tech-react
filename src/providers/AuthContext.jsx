import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider =  ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userName, setUserName] = useState(null)

    const login = (name) => {
        setIsAuthenticated(true)
        setUserName(name)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUserName(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userName }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)