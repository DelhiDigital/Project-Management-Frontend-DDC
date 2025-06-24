"use client"
import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Input } from "../components/ui/Input"
import { FolderOpen, Clock, CheckCircle, AlertCircle, Pause, Search, Plus } from "lucide-react"
import { Sidebar } from "../components/Sidebar"

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Load mock data
    const mockProjects = [
      {
        id: "1",
        name: "E-commerce Store Redesign",
        clientName: "TechCorp Inc",
        type: "Shopify",
        status: "Ongoing",
        assignedEmployees: ["John Doe", "Jane Smith"],
        createdDate: "2024-01-15",
        dueDate: "2024-02-15",
        pocName: "Mike Johnson",
        pocEmail: "mike@techcorp.com",
        pocContact: "+1-555-0123",
        domain: "techcorp.com",
        previewLink: "https://preview.techcorp.com",
      },
      {
        id: "2",
        name: "Mobile App Backend",
        clientName: "StartupXYZ",
        type: "Node.js",
        status: "Under Testing",
        assignedEmployees: ["Bob Wilson"],
        createdDate: "2024-01-10",
        dueDate: "2024-02-01",
        pocName: "Sarah Davis",
        pocEmail: "sarah@startupxyz.com",
        pocContact: "+1-555-0456",
        domain: "startupxyz.com",
        previewLink: "https://api.startupxyz.com",
      },
      {
        id: "3",
        name: "Corporate Website",
        clientName: "BigBusiness Ltd",
        type: "React",
        status: "Completed",
        assignedEmployees: ["Alice Brown", "Charlie Green"],
        createdDate: "2023-12-01",
        dueDate: "2024-01-01",
        pocName: "Tom Wilson",
        pocEmail: "tom@bigbusiness.com",
        pocContact: "+1-555-0789",
        domain: "bigbusiness.com",
        previewLink: "https://bigbusiness.com",
      },
      {
        id: "4",
        name: "Inventory Management System",
        clientName: "RetailChain",
        type: "MERN Stack",
        status: "On Hold",
        assignedEmployees: ["David Lee"],
        createdDate: "2024-01-20",
        dueDate: "2024-03-01",
        pocName: "Lisa Chen",
        pocEmail: "lisa@retailchain.com",
        pocContact: "+1-555-0321",
        domain: "retailchain.com",
        previewLink: "https://inventory.retailchain.com",
      },
    ]
    setProjects(mockProjects)
    setFilteredProjects(mockProjects)
  }, [])

  useEffect(() => {
    let filtered = projects

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((project) => project.type === typeFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.assignedEmployees.some((emp) => emp.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredProjects(filtered)
  }, [projects, statusFilter, typeFilter, searchTerm])

  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Under Testing":
        return "bg-yellow-100 text-yellow-800"
      case "On Hold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Ongoing":
        return <Clock className="w-4 h-4" />
      case "Completed":
        return <CheckCircle className="w-4 h-4" />
      case "Under Testing":
        return <AlertCircle className="w-4 h-4" />
      case "On Hold":
        return <Pause className="w-4 h-4" />
      default:
        return null
    }
  }

  const stats = {
    total: projects.length,
    ongoing: projects.filter((p) => p.status === "Ongoing").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    testing: projects.filter((p) => p.status === "Under Testing").length,
    onHold: projects.filter((p) => p.status === "On Hold").length,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Project Dashboard</h1>
          <p className="text-gray-600">Manage and monitor all your projects</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ongoing</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.ongoing}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Testing</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.testing}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">On Hold</p>
                  <p className="text-2xl font-bold text-red-600">{stats.onHold}</p>
                </div>
                <Pause className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Projects</span>
              <Button onClick={() => navigate("/projects/new")}>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search projects, clients, or employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Under Testing">Under Testing</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Shopify">Shopify</SelectItem>
                  <SelectItem value="Node.js">Node.js</SelectItem>
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="MERN Stack">MERN Stack</SelectItem>
                  <SelectItem value="Frontend-only">Frontend-only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <Badge className={getStatusColor(project.status)}>
                            {getStatusIcon(project.status)}
                            <span className="ml-1">{project.status}</span>
                          </Badge>
                          <Badge variant="outline">{project.type}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                          <div>
                            <strong>Client:</strong> {project.clientName}
                          </div>
                          <div>
                            <strong>POC:</strong> {project.pocName}
                          </div>
                          <div>
                            <strong>Due:</strong> {new Date(project.dueDate).toLocaleDateString()}
                          </div>
                          <div>
                            <strong>Team:</strong> {project.assignedEmployees.join(", ")}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-8 text-gray-500">No projects found matching your criteria.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
