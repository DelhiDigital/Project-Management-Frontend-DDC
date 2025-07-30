"use client"
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import { Textarea } from "../components/ui/Textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Checkbox } from "../components/ui/Checkbox"
import { ArrowLeft, Plus } from "lucide-react"
import { Sidebar } from "../components/Sidebar"

export default function NewProjectPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    
    name: "",
    clientName: "",
    pocName: "",
    pocEmail: "",
    pocContact: "",
    domain: "",
    previewLink: "",
    type: "",
    status: "Ongoing",
    description: "",
    dueDate: "",
    assignedEmployees: [],
  })

  const [isLoading, setIsLoading] = useState(false)

  // Mock employees data
  const employees = [
    { id: "1", name: "John Doe", email: "john@company.com", role: "Full Stack Developer" },
    { id: "2", name: "Jane Smith", email: "jane@company.com", role: "Frontend Developer" },
    { id: "3", name: "Bob Wilson", email: "bob@company.com", role: "Backend Developer" },
    { id: "4", name: "Alice Brown", email: "alice@company.com", role: "UI/UX Designer" },
    { id: "5", name: "Charlie Green", email: "charlie@company.com", role: "DevOps Engineer" },
    { id: "6", name: "David Lee", email: "david@company.com", role: "Project Manager" },
  ]

  const projectTypes = [
    "Shopify eCommerce",
    "Node.js Backend",
    "React Frontend",
    "Full-stack MERN",
    "Frontend-only",
    "WordPress",
    "Mobile App",
    "API Development",
    "Database Design",
    "DevOps Setup",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEmployeeToggle = (employeeId, employeeName) => {
    setFormData((prev) => ({
      ...prev,
      assignedEmployees: prev.assignedEmployees.includes(employeeName)
        ? prev.assignedEmployees.filter((id) => id !== employeeName)
        : [...prev.assignedEmployees, employeeName],
    }))
  }

  const sendWelcomeEmail = async () => {
    // Simulate sending welcome email
    const emailContent = `
      Dear ${formData.pocName},

      Welcome to our project management system! We're excited to work with ${formData.clientName} on the ${formData.name} project.

      To get started, please fill out our project requirements form and upload all related files and documentation:
      
      📋 Project Requirements Form: https://docs.google.com/forms/d/e/1FAIpQLScMKOUa_NL66wQZK_-bjE6yphqJmK6DOCFPyELyUO2xX97Lhg/viewform

      Please upload:
      - Project specifications and requirements
      - Design files (if any)
      - Brand guidelines and assets
      - Any existing codebase or documentation
      - Reference materials or inspiration

      Our team assigned to your project:
      ${formData.assignedEmployees.join(", ")}

      Project Details:
      - Project Type: ${formData.type}
      - Expected Completion: ${formData.dueDate}
      - Project Domain: ${formData.domain}

      If you have any questions, please don't hesitate to reach out.

      Best regards,
      Project Management Team
    `

    console.log("Welcome email sent:", emailContent)
    alert("Welcome email sent successfully!")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to create project
    setTimeout(async () => {
      console.log("Project created:", formData)

      // Send welcome email automatically
      await sendWelcomeEmail()

      alert("Project created successfully! Welcome email sent to client.")
      navigate("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
            <p className="text-gray-600">Fill in the project details and assign team members</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Information */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>Basic details about the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter project name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client/Brand Name *</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange("clientName", e.target.value)}
                      placeholder="Enter client name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Project Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Project Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                        <SelectItem value="Under Testing">Under Testing</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="domain">Project Domain</Label>
                    <Input
                      id="domain"
                      value={formData.domain}
                      onChange={(e) => handleInputChange("domain", e.target.value)}
                      placeholder="example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previewLink">Preview Link</Label>
                    <Input
                      id="previewLink"
                      value={formData.previewLink}
                      onChange={(e) => handleInputChange("previewLink", e.target.value)}
                      placeholder="https://preview.example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the project requirements and objectives"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* POC Information */}
            <Card>
              <CardHeader>
                <CardTitle>Point of Contact (POC) Information</CardTitle>
                <CardDescription>Client contact details for communication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pocName">POC Name *</Label>
                    <Input
                      id="pocName"
                      value={formData.pocName}
                      onChange={(e) => handleInputChange("pocName", e.target.value)}
                      placeholder="Enter POC name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pocEmail">POC Email *</Label>
                    <Input
                      id="pocEmail"
                      type="email"
                      value={formData.pocEmail}
                      onChange={(e) => handleInputChange("pocEmail", e.target.value)}
                      placeholder="poc@client.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pocContact">POC Contact Number</Label>
                    <Input
                      id="pocContact"
                      value={formData.pocContact}
                      onChange={(e) => handleInputChange("pocContact", e.target.value)}
                      placeholder="+1-555-0123"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Assignment */}
            <Card>
              <CardHeader>
                <CardTitle>Team Assignment</CardTitle>
                <CardDescription>Select employees to assign to this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={employee.id}
                        checked={formData.assignedEmployees.includes(employee.name)}
                        onCheckedChange={() => handleEmployeeToggle(employee.id, employee.name)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={employee.id} className="font-medium cursor-pointer">
                          {employee.name}
                        </Label>
                        <p className="text-sm text-gray-500">{employee.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {formData.assignedEmployees.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      Selected Team Members: {formData.assignedEmployees.join(", ")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Creating Project..."
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project & Send Welcome Email
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
