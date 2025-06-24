"use client"
import React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Badge } from "../components/ui/Badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { TrendingUp, Users, FolderOpen, Clock, CheckCircle, AlertCircle, Target } from "lucide-react"
import { Sidebar } from "../components/Sidebar"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("monthly")

  // Mock data for charts
  const projectTypeData = [
    { name: "Shopify", value: 8, color: "#8884d8" },
    { name: "React", value: 6, color: "#82ca9d" },
    { name: "Node.js", value: 4, color: "#ffc658" },
    { name: "MERN Stack", value: 3, color: "#ff7300" },
    { name: "Frontend-only", value: 2, color: "#00ff88" },
  ]

  const monthlyProgressData = [
    { month: "Jan", target: 10, completed: 8, ongoing: 5 },
    { month: "Feb", target: 12, completed: 10, ongoing: 7 },
    { month: "Mar", target: 15, completed: 12, ongoing: 8 },
    { month: "Apr", target: 18, completed: 15, ongoing: 10 },
    { month: "May", target: 20, completed: 18, ongoing: 12 },
    { month: "Jun", target: 22, completed: 20, ongoing: 15 },
  ]

  const employeePerformanceData = [
    { name: "John Doe", completed: 12, current: 3, rating: 4.8 },
    { name: "Bob Wilson", completed: 15, current: 1, rating: 4.9 },
    { name: "Alice Brown", completed: 6, current: 4, rating: 4.6 },
    { name: "Jane Smith", completed: 8, current: 2, rating: 4.7 },
    { name: "Charlie Green", completed: 10, current: 2, rating: 4.5 },
    { name: "David Lee", completed: 20, current: 0, rating: 4.3 },
  ]

  const projectGrowthData = [
    { month: "Jan", projects: 23 },
    { month: "Feb", projects: 28 },
    { month: "Mar", projects: 35 },
    { month: "Apr", projects: 42 },
    { month: "May", projects: 48 },
    { month: "Jun", projects: 55 },
  ]

  const stats = {
    totalProjects: 55,
    completedProjects: 42,
    ongoingProjects: 8,
    testingProjects: 3,
    onHoldProjects: 2,
    totalEmployees: 6,
    activeEmployees: 5,
    avgProjectsPerEmployee: 9.2,
    completionRate: 76.4,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track performance and project insights</p>
            </div>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly View</SelectItem>
                <SelectItem value="quarterly">Quarterly View</SelectItem>
                <SelectItem value="yearly">Yearly View</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold">{stats.totalProjects}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <FolderOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold">{stats.completionRate}%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5% from last month
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Employees</p>
                  <p className="text-2xl font-bold">{stats.activeEmployees}</p>
                  <p className="text-xs text-gray-500 mt-1">{stats.avgProjectsPerEmployee} avg projects/employee</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ongoing Projects</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.ongoingProjects}</p>
                  <p className="text-xs text-blue-600 mt-1">{stats.testingProjects} in testing</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Project Types Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Project Types Distribution</CardTitle>
              <CardDescription>Breakdown of projects by technology stack</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress vs Targets</CardTitle>
              <CardDescription>Track project completion against monthly targets</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="ongoing" fill="#3b82f6" name="Ongoing" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Project Growth Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Project Growth Trend</CardTitle>
              <CardDescription>Total projects accumulated over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projectGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="projects"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ fill: "#8884d8", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Employee Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Performance</CardTitle>
              <CardDescription>Projects completed vs current workload</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={employeePerformanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="current" fill="#f59e0b" name="Current" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Employee Rankings */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Rankings</CardTitle>
            <CardDescription>Performance ranking based on projects completed and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeePerformanceData
                .sort((a, b) => b.completed - a.completed)
                .map((employee, index) => (
                  <div key={employee.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{employee.name}</h3>
                        <p className="text-sm text-gray-600">
                          {employee.completed} completed • {employee.current} current
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">Rating: {employee.rating}/5</p>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < Math.floor(employee.rating) ? "bg-yellow-400" : "bg-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <Badge
                        className={
                          index === 0
                            ? "bg-yellow-100 text-yellow-800"
                            : index === 1
                              ? "bg-gray-100 text-gray-800"
                              : index === 2
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                        }
                      >
                        {index === 0
                          ? "🥇 Top Performer"
                          : index === 1
                            ? "🥈 Second"
                            : index === 2
                              ? "🥉 Third"
                              : `#${index + 1}`}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Ongoing Projects</p>
                  <p className="text-2xl font-bold text-blue-800">{stats.ongoingProjects}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Completed</p>
                  <p className="text-2xl font-bold text-green-800">{stats.completedProjects}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700">Under Testing</p>
                  <p className="text-2xl font-bold text-yellow-800">{stats.testingProjects}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700">On Hold</p>
                  <p className="text-2xl font-bold text-red-800">{stats.onHoldProjects}</p>
                </div>
                <Target className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
