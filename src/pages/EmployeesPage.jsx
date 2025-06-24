"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog"
import { Label } from "../components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Plus, Search, Edit, Trash2, Mail, Phone, User } from "lucide-react"
import { Sidebar } from "../components/Sidebar"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "Active",
  })

  useEffect(() => {
    // Load mock employees data
    const mockEmployees = [
      {
        id: "1",
        name: "John Doe",
        email: "john@company.com",
        phone: "+1-555-0101",
        role: "Full Stack Developer",
        department: "Engineering",
        joinDate: "2023-01-15",
        status: "Active",
        projectsAssigned: 3,
        projectsCompleted: 12,
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@company.com",
        phone: "+1-555-0102",
        role: "Frontend Developer",
        department: "Engineering",
        joinDate: "2023-03-20",
        status: "Active",
        projectsAssigned: 2,
        projectsCompleted: 8,
      },
      {
        id: "3",
        name: "Bob Wilson",
        email: "bob@company.com",
        phone: "+1-555-0103",
        role: "Backend Developer",
        department: "Engineering",
        joinDate: "2023-02-10",
        status: "Active",
        projectsAssigned: 1,
        projectsCompleted: 15,
      },
      {
        id: "4",
        name: "Alice Brown",
        email: "alice@company.com",
        phone: "+1-555-0104",
        role: "UI/UX Designer",
        department: "Design",
        joinDate: "2023-04-05",
        status: "Active",
        projectsAssigned: 4,
        projectsCompleted: 6,
      },
      {
        id: "5",
        name: "Charlie Green",
        email: "charlie@company.com",
        phone: "+1-555-0105",
        role: "DevOps Engineer",
        department: "Engineering",
        joinDate: "2023-01-30",
        status: "Active",
        projectsAssigned: 2,
        projectsCompleted: 10,
      },
      {
        id: "6",
        name: "David Lee",
        email: "david@company.com",
        phone: "+1-555-0106",
        role: "Project Manager",
        department: "Management",
        joinDate: "2022-11-15",
        status: "Inactive",
        projectsAssigned: 0,
        projectsCompleted: 20,
      },
    ]
    setEmployees(mockEmployees)
    setFilteredEmployees(mockEmployees)
  }, [])

  useEffect(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredEmployees(filtered)
  }, [employees, searchTerm])

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      status: "Active",
    })
    setIsDialogOpen(true)
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      department: employee.department,
      status: employee.status,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingEmployee) {
      // Update existing employee
      setEmployees((prev) => prev.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...formData } : emp)))
    } else {
      // Add new employee
      const newEmployee = {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
        projectsAssigned: 0,
        projectsCompleted: 0,
      }
      setEmployees((prev) => [...prev, newEmployee])
    }

    setIsDialogOpen(false)
  }

  const roles = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "DevOps Engineer",
    "Project Manager",
    "QA Engineer",
    "Data Analyst",
    "Marketing Specialist",
  ]

  const departments = ["Engineering", "Design", "Management", "Marketing", "Sales", "HR", "Finance"]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600">Manage your team members and their roles</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold">{employees.length}</p>
                </div>
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {employees.filter((emp) => emp.status === "Active").length}
                  </p>
                </div>
                <User className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {new Set(employees.map((emp) => emp.department)).size}
                  </p>
                </div>
                <User className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Projects</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {employees.length > 0
                      ? Math.round(employees.reduce((sum, emp) => sum + emp.projectsCompleted, 0) / employees.length)
                      : 0}
                  </p>
                </div>
                <User className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Add Employee */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Employees</span>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAddEmployee}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>{editingEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
                      <DialogDescription>
                        {editingEmployee ? "Update employee information" : "Enter the details for the new employee"}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="employee@company.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1-555-0123"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role *</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Department *</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">{editingEmployee ? "Update Employee" : "Add Employee"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search employees by name, email, role, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Employees List */}
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{employee.name}</h3>
                          <Badge
                            className={
                              employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {employee.status}
                          </Badge>
                          <Badge variant="outline">{employee.role}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {employee.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {employee.phone}
                          </div>
                          <div>
                            <strong>Department:</strong> {employee.department}
                          </div>
                          <div>
                            <strong>Joined:</strong> {new Date(employee.joinDate).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-blue-600">
                            <strong>Current Projects:</strong> {employee.projectsAssigned}
                          </span>
                          <span className="text-green-600">
                            <strong>Completed:</strong> {employee.projectsCompleted}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditEmployee(employee)}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-8 text-gray-500">No employees found matching your search criteria.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
