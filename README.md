# VisoftTech - Professional IT Services Platform

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.0-green.svg)](https://www.mongodb.com/)

A modern, full-stack web application for VisoftTech, a professional IT services company. This platform showcases the company's expertise in software development, mobile apps, cybersecurity, cloud infrastructure, and data analytics.

## 🚀 Features

### Core Functionality
- **Professional Service Showcase** - Display comprehensive IT services with detailed descriptions
- **Project Portfolio** - Showcase completed projects with case studies and technologies used
- **Contact Management** - Professional contact forms with email integration
- **User Authentication** - Secure login/registration system with JWT tokens
- **Admin Dashboard** - Content management system for services and projects
- **Responsive Design** - Mobile-first approach with modern UI/UX

### Services Offered
- **Web Development** - React, Node.js, MongoDB, PostgreSQL
- **Mobile App Development** - Cross-platform and native applications
- **Custom Software Development** - Tailored business solutions
- **Cybersecurity Solutions** - Security assessments and protection services
- **Cloud Infrastructure** - AWS, Azure, GCP migration and optimization
- **Data Analytics** - Business intelligence and reporting tools

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - User notifications
- **AOS** - Animate On Scroll library
- **Swiper** - Touch slider component

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB 8.16.0** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage
- **Nodemailer** - Email functionality
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server with auto-restart
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
visofttechproject/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── Components/      # Reusable UI components
│   │   ├── Pages/          # Page components
│   │   ├── Sections/       # Page sections
│   │   ├── Redux/          # State management
│   │   ├── utils/          # Utility functions
│   │   ├── assets/         # Static assets
│   │   └── Admin/          # Admin dashboard
│   ├── public/             # Public assets
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middlewares
│   ├── config/            # Configuration files
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/visofttechproject.git
   cd visofttechproject
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

5. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Contact
- `POST /api/contact` - Submit contact form

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

## 🎨 Key Features

### Modern UI/UX
- Responsive design with Tailwind CSS
- Smooth animations with AOS library
- Professional color scheme and typography

### Security Features
- JWT-based authentication
- Password encryption with bcrypt
- CORS protection

### Performance
- Optimized images with Cloudinary
- Efficient state management with Redux
- Fast development with Vite
- 
---
