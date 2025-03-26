
# HarpalJobs - Project Documentation

## Overview

HarpalJobs is a comprehensive job board platform that connects job seekers with employers. The platform offers a modern, responsive interface with features designed to enhance the job search and recruitment process.

## Table of Contents

1. [Architecture](#architecture)
2. [Features](#features)
3. [Technical Stack](#technical-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Configuration](#configuration)
7. [API Documentation](#api-documentation)
8. [Component Library](#component-library)
9. [SEO Implementation](#seo-implementation)
10. [Ad Management](#ad-management)
11. [Mobile App Integration](#mobile-app-integration)
12. [Development Guidelines](#development-guidelines)
13. [Deployment](#deployment)
14. [Troubleshooting](#troubleshooting)
15. [Future Enhancements](#future-enhancements)

## Architecture

HarpalJobs follows a client-server architecture:

- **Frontend**: React-based single-page application with TypeScript
- **Backend**: Node.js with Express serving a RESTful API
- **Database**: SQL database (PostgreSQL) accessed through Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens) for secure access control

### System Architecture Diagram

```
┌─────────────────┐       ┌──────────────┐       ┌───────────┐
│                 │       │              │       │           │
│  React Frontend │◄─────►│  Express API │◄─────►│ Database  │
│                 │       │              │       │           │
└─────────────────┘       └──────────────┘       └───────────┘
         ▲                       ▲                     ▲
         │                       │                     │
         ▼                       ▼                     ▼
┌─────────────────┐       ┌──────────────┐       ┌───────────┐
│ User Interface  │       │  Middleware  │       │ Sequelize │
│  Components     │       │    Layer     │       │    ORM    │
└─────────────────┘       └──────────────┘       └───────────┘
```

## Features

### For Job Seekers

- **Job Search**: Advanced filtering by category, location, salary, job type, etc.
- **Job Applications**: Apply directly through the platform
- **Saved Jobs**: Bookmark interesting positions for later
- **User Profiles**: Create and manage professional profiles
- **Job Alerts**: Receive notifications about new relevant positions
- **Application Tracking**: Monitor application status

### For Employers

- **Job Postings**: Create and manage job listings
- **Applicant Management**: Review and manage applications
- **Analytics Dashboard**: Track listing performance
- **Company Profiles**: Showcase company culture and benefits
- **Featured Listings**: Promote positions for better visibility
- **Candidate Search**: Find qualified candidates

### For Administrators

- **User Management**: Manage all platform users
- **Content Management**: Control job categories and fields
- **SEO Tools**: Optimize platform for search engines
- **Ad Management**: Configure advertising across the platform
- **Analytics**: View comprehensive platform statistics
- **Mobile App Integration**: Configure mobile application settings

## Technical Stack

### Frontend

- **React**: UI library for building component-based interfaces
- **TypeScript**: Type-safe JavaScript for improved development experience
- **Redux Toolkit**: State management with RTK Query for data fetching
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Component library for consistent UI elements
- **React Hook Form**: Form validation and management
- **Recharts**: Data visualization
- **Lucide Icons**: SVG icon library

### Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **Sequelize**: ORM for database interactions
- **PostgreSQL**: Relational database
- **JSON Web Tokens**: Authentication mechanism
- **bcrypt**: Password hashing
- **express-validator**: Request validation
- **Morgan**: HTTP request logger

## Project Structure

The project follows a modular structure:

### Frontend Structure

```
src/
├── components/         # UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── ui/             # Shadcn UI components
│   └── ads/            # Advertisement components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
│   ├── store/          # Redux store configuration
│   │   ├── api.ts      # API configuration
│   │   ├── slices/     # Redux slices
│   │   └── types.ts    # TypeScript types for store
│   └── types.ts        # Shared TypeScript types
├── pages/              # Page components
├── services/           # Service layer for backend communication
├── utils/              # Utility functions
│   ├── seo.ts          # SEO utility functions
│   └── validation.ts   # Form validation functions
└── docs/               # Documentation files
```

### Backend Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Express middlewares
│   ├── models/         # Sequelize models
│   ├── routes/         # API routes
│   ├── seeders/        # Database seeders
│   └── index.js        # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/harpal-jobs.git
   cd harpal-jobs
   ```

2. Install dependencies:
   ```
   npm install
   cd backend && npm install
   ```

3. Set up environment variables:
   - Create `.env` file in the root directory
   - Create `.env` file in the `backend` directory

4. Start the development servers:
   ```
   # In one terminal (frontend)
   npm run dev
   
   # In another terminal (backend)
   cd backend && npm run dev
   ```

5. Open your browser to `http://localhost:5173`

## Configuration

### Environment Variables

#### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_SITE_URL=http://localhost:5173
VITE_GOOGLE_ANALYTICS_ID=
VITE_GOOGLE_ADSENSE_ID=
```

#### Backend (.env)

```
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d
DATABASE_URL=postgresql://username:password@localhost:5432/harpal_jobs
NODE_ENV=development
```

### Build Configuration

The project includes several build scripts:

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run build:dev`: Build with development settings
- `npm run preview`: Preview production build locally

## API Documentation

The comprehensive API documentation is available in the `src/docs/API_DOCUMENTATION.md` file. It covers all endpoints with request/response examples.

Key API sections:
- Authentication (register, login)
- Jobs (search, create, update, delete)
- Job Categories (list, details)
- Applications (apply, track, manage)
- Users (profiles, settings)
- Saved Jobs (save, unsave, list)
- SEO Settings (configure, analyze)

## Component Library

HarpalJobs uses Shadcn/UI, a collection of reusable components built with Radix UI and Tailwind CSS. These components provide consistent, accessible UI elements across the application.

Key components include:
- Button, Input, Select
- Card, Dialog, Dropdown
- Form components
- Navigation elements
- Table, Tabs
- Toast notifications

Custom components extend this library for specific functionality:
- JobCard: Displays job information in a card format
- CompanyProfile: Showcases employer information
- JobApplicationForm: Handles job applications
- SEOHead: Manages meta tags for SEO

## SEO Implementation

HarpalJobs includes comprehensive SEO features to maximize visibility in search engines:

### On-page SEO

- **Meta Tags**: Dynamic title, description, and keywords
- **Structured Data**: JSON-LD for job listings and organization
- **Canonical URLs**: Prevents duplicate content issues
- **Sitemap Generation**: XML sitemap for search engines
- **Robots.txt Configuration**: Controls crawler access

### SEO Dashboard

The admin SEO dashboard provides tools for:
- Keyword analysis and monitoring
- Content optimization
- SEO performance tracking
- Meta tag management
- Structured data configuration

### Implementation Components

- `SEOHead`: Manages meta tags for each page
- `SEODashboardController`: Controls SEO settings
- `SEOKeywordAnalyzer`: Analyzes content for keyword density
- `seoService.ts`: Manages SEO API interactions

## Ad Management

HarpalJobs includes a flexible advertising system:

### Ad Types

- **Internal Ads**: Platform's own promotional content
- **Google AdSense**: Integration with Google's ad network
- **Sponsored Jobs**: Featured job listings with priority placement

### Ad Placements

- Header banners
- Sidebar placements
- In-feed insertions between job listings
- Footer banners

### Ad Management Features

- Enable/disable ads globally or by section
- Configure ad frequency and density
- Mobile-specific ad settings
- Performance analytics

## Mobile App Integration

HarpalJobs offers a companion mobile application with integration points for:

### Integration Features

- **Push Notifications**: For job alerts and application updates
- **Deep Linking**: Direct navigation to specific content
- **Shared Authentication**: Single sign-on between web and mobile
- **Synchronized Data**: Consistent experience across platforms

### Mobile App Management

The Mobile App Dashboard allows administrators to:
- Configure app settings
- Manage notification templates
- View app analytics
- Control feature flags

## Development Guidelines

### Coding Standards

- **TypeScript**: Use strong typing for all code
- **ESLint/Prettier**: Maintain consistent code style
- **Component Structure**: One component per file
- **State Management**: Use Redux for global state, React hooks for local state
- **API Calls**: Use RTK Query for data fetching with caching

### Git Workflow

- **Feature Branches**: Create branches for new features
- **Pull Requests**: Code review before merging
- **Semantic Versioning**: Follow semver for releases
- **Conventional Commits**: Clear commit messages

## Deployment

### Production Build

1. Build the frontend:
   ```
   npm run build
   ```

2. Prepare the backend:
   ```
   cd backend
   npm run build
   ```

3. Deploy the frontend build directory to a static hosting service

4. Deploy the backend to a Node.js host

### Continuous Integration

The project includes GitHub Actions workflows for:
- Running tests on pull requests
- Building and deploying to staging on merge to develop
- Building and deploying to production on merge to main

## Troubleshooting

### Common Issues

- **API Connectivity**: Check backend server is running and CORS is properly configured
- **Build Errors**: Ensure all dependencies are installed and TypeScript types are correct
- **Authentication Issues**: Verify JWT token configuration and expiration settings
- **Database Connection**: Check database credentials and connection string

### Logging

- Frontend console logs
- Backend logs (stdout/stderr)
- Database query logs

## Future Enhancements

Planned features for future releases:

- **AI Job Matching**: Intelligent job recommendations
- **Video Interviews**: In-platform video interview capability
- **Resume Builder**: Interactive tool for creating professional resumes
- **Career Resources**: Educational content for job seekers
- **Enhanced Analytics**: More detailed performance metrics
- **Multi-language Support**: Internationalization for global reach

---

## License

HarpalJobs is proprietary software. All rights reserved.

## Contributors

- Development Team
- Product Management
- Design Team

## Version History

- v1.0.0: Initial release with core functionality
- v1.1.0: Added SEO tools and enhanced mobile responsiveness
- v1.2.0: Added ad management system
- v1.3.0: Mobile app integration

---

Last updated: June 2023
