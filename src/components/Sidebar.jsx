"use client"
import React from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/Button"
import { useAuth } from "../context/AuthContext"
import { LayoutDashboard, Users, FolderOpen, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FolderOpen, label: "Projects", href: "/projects" },
    { icon: Users, label: "Employees", href: "/employees" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleNavigation = (href) => {
    navigate(href)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">ProjectHub</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className={`
                  flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left
                  ${
                    location.pathname === item.href
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
