"use client"

import { createContext, useContext, useState, useEffect } from "react"
import React from "react"
const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    const userData = localStorage.getItem("userData")

    if (authStatus === "true" && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const login = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userData", JSON.stringify(userData))
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userData")
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
