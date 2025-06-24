# Project Management Frontend

A comprehensive React.js frontend application for project management with admin panel features, employee management, and analytics dashboard.

## Features

### 👤 Admin Panel Features
- **Secure Login**: Admin authentication with demo credentials
- **Employee Management**: Full CRUD operations for employees
- **Project Management**: Create, update, delete, and assign projects
- **Advanced Filtering**: Filter by status, type, employee, and search functionality

### 🧑‍💼 Project Creation Flow
- **Comprehensive Form**: All required fields (POC details, client info, project type, etc.)
- **Team Assignment**: Multi-select employee assignment with visual feedback
- **Automatic Email**: Welcome email sent to clients with Google Form link
- **Status Management**: Track project progress through different stages

### 📊 Analytics Dashboard
- **Real-time Metrics**: Project counts, completion rates, employee performance
- **Visual Charts**: Bar charts, pie charts, line graphs using Recharts
- **Employee Rankings**: Performance-based ranking system
- **Growth Tracking**: Project growth trends over time

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd project-management-frontend
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npm start
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Demo Credentials
- **Email**: admin@company.com
- **Password**: admin123

## Project Structure

\`\`\`
src/
├── components/
│   ├── ui/              # Reusable UI components
│   └── Sidebar.js       # Navigation sidebar
├── context/
│   └── AuthContext.js   # Authentication context
├── pages/
│   ├── LoginPage.js     # Login page
│   ├── Dashboard.js     # Main dashboard
│   ├── ProjectsPage.js  # Projects management
│   ├── NewProjectPage.js # Create new project
│   ├── EmployeesPage.js # Employee management
│   └── AnalyticsPage.js # Analytics dashboard
├── lib/
│   └── utils.js         # Utility functions
└── App.js               # Main app component
\`\`\`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library for analytics
- **Lucide React** - Icon library
- **Axios** - HTTP client (ready for backend integration)

## Backend Integration

This frontend is designed to work with a REST API backend. The following endpoints are expected:

- `POST /api/auth/login` - User authentication
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## Features Overview

### Project Types Supported
- Shopify eCommerce
- Node.js Backend
- React Frontend
- Full-stack MERN
- Frontend-only
- WordPress
- Mobile App
- API Development
- Database Design
- DevOps Setup

### Project Status Tracking
- Ongoing
- Completed
- Under Testing
- On Hold

### Employee Roles
- Full Stack Developer
- Frontend Developer
- Backend Developer
- UI/UX Designer
- DevOps Engineer
- Project Manager
- QA Engineer
- Data Analyst
- Marketing Specialist

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
