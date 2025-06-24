"use client"
import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import { Sidebar } from "../components/Sidebar"

export default function ProjectsPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    // Load mock projects data
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
        description: "Complete redesign of the e-commerce platform with modern UI/UX",
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
        description: "RESTful API development for mobile application",
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
        description: "Modern corporate website with CMS integration",
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
        description: "Full-stack inventory management system with real-time tracking",
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

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((project) => project.id !== projectId))
    }
  }

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
              <p className="text-gray-600">Manage all your projects and track their progress</p>
            </div>
            <Button onClick={() => navigate("/projects/new")}>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>All Projects ({filteredProjects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
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

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                          <Badge variant="outline">{project.type}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Client:</span>
                        <span>{project.clientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">POC:</span>
                        <span>{project.pocName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Due Date:</span>
                        <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Team:</span>
                        <span className="text-right">{project.assignedEmployees.join(", ")}</span>
                      </div>
                      {project.domain && (
                        <div className="flex justify-between">
                          <span className="font-medium">Domain:</span>
                          <span>{project.domain}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Plus className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by creating your first project."}
                </p>
                {!searchTerm && statusFilter === "all" && typeFilter === "all" && (
                  <Button onClick={() => navigate("/projects/new")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Project
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
