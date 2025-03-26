
# HarpalJobs API Documentation

## Table of Contents

1. [Authentication](#authentication)
2. [Jobs](#jobs)
3. [Job Categories](#job-categories)
4. [Users](#users)
5. [Applications](#applications)
6. [Saved Jobs](#saved-jobs)
7. [SEO Settings](#seo-settings)

## Authentication

### Register User

Register a new user account.

```
POST /api/auth/register
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "user" // Optional: "user", "employer", default is "user"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login User

Authenticate a user and retrieve an access token.

```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Jobs

### Get All Jobs

Retrieve a list of all jobs with optional filtering, pagination, and sorting.

```
GET /api/jobs
```

**Query Parameters:**
- `query` (string): Search term to match against job titles and descriptions
- `location` (string): Filter by job location
- `category` (string): Filter by job category ID
- `employmentType` (string): Filter by employment type (full-time, part-time, etc.)
- `sortBy` (string): Sort results by 'relevance', 'recent', 'salary-high', 'salary-low', 'popular', 'deadline'
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Results per page (default: 10)
- `featured` (boolean): Filter to show only featured jobs
- `remoteOnly` (boolean): Filter to show only remote jobs

**Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "1",
        "title": "Software Engineer",
        "company": "Tech Company",
        "location": "San Francisco, CA",
        "description": "Job description...",
        "requirements": ["JavaScript", "React", "Node.js"],
        "type": "full-time",
        "category": {
          "id": "1",
          "name": "Development",
          "description": "Development jobs",
          "icon": "code"
        },
        "salary": "$100,000 - $150,000",
        "salaryMin": 100000,
        "salaryMax": 150000,
        "postedDate": "2023-06-01T00:00:00Z",
        "deadline": "2023-07-01T00:00:00Z",
        "logo": "/images/company-logo.png",
        "featured": true,
        "views": 250,
        "applications": 12,
        "status": "active"
      }
    ],
    "trending": {
      "companies": [
        { "company": "Tech Company", "jobCount": 15 }
      ],
      "searches": [
        { "title": "software engineer", "count": 1250 }
      ]
    }
  },
  "pagination": {
    "total": 150,
    "page": 1,
    "pages": 15,
    "hasMore": true
  },
  "filters": {
    "query": "engineer",
    "location": "San Francisco",
    "category": "1",
    "employmentType": "full-time"
  }
}
```

### Get Featured Jobs

Retrieve a list of featured job listings.

```
GET /api/jobs/featured
```

**Query Parameters:**
- `limit` (number): Maximum number of jobs to return (default: 5)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Software Engineer",
      "company": "Tech Company",
      "location": "San Francisco, CA",
      "description": "Job description...",
      "requirements": ["JavaScript", "React", "Node.js"],
      "type": "full-time",
      "category": {
        "id": "1",
        "name": "Development",
        "description": "Development jobs",
        "icon": "code"
      },
      "salary": "$100,000 - $150,000",
      "salaryMin": 100000,
      "salaryMax": 150000,
      "postedDate": "2023-06-01T00:00:00Z",
      "deadline": "2023-07-01T00:00:00Z",
      "logo": "/images/company-logo.png",
      "featured": true,
      "views": 250,
      "applications": 12
    }
  ]
}
```

### Get Latest Jobs

Retrieve the most recently posted jobs.

```
GET /api/jobs/latest
```

**Query Parameters:**
- `limit` (number): Maximum number of jobs to return (default: 5)

**Response:** Same structure as Featured Jobs.

### Get Job by ID

Retrieve detailed information about a specific job.

```
GET /api/jobs/:id
```

**URL Parameters:**
- `id` (string): Job ID

**Response:**
```json
{
  "success": true,
  "data": {
    "job": {
      "id": "1",
      "title": "Software Engineer",
      "company": "Tech Company",
      "location": "San Francisco, CA",
      "description": "Job description...",
      "requirements": ["JavaScript", "React", "Node.js"],
      "type": "full-time",
      "category": {
        "id": "1",
        "name": "Development",
        "description": "Development jobs",
        "icon": "code"
      },
      "salary": "$100,000 - $150,000",
      "salaryMin": 100000,
      "salaryMax": 150000,
      "postedDate": "2023-06-01T00:00:00Z",
      "deadline": "2023-07-01T00:00:00Z",
      "logo": "/images/company-logo.png",
      "featured": true,
      "views": 251,
      "applications": 12,
      "skills": ["JavaScript", "React", "Node.js", "TypeScript"],
      "benefits": ["Health Insurance", "401k", "Remote Work"],
      "responsibilities": ["Develop web applications", "Collaborate with team members"],
      "employerId": "5",
      "companyDescription": "Company description...",
      "companySize": "50-100",
      "companyWebsite": "https://example.com",
      "companyIndustry": "Technology"
    },
    "similarJobs": [
      // Array of similar job objects with the same structure as above
    ]
  }
}
```

### Create Job

Create a new job listing (employer only).

```
POST /api/jobs
```

**Headers:**
- `Authorization`: Bearer token

**Request Body:**
```json
{
  "title": "Software Engineer",
  "company": "Tech Company",
  "location": "San Francisco, CA",
  "description": "Job description...",
  "requirements": ["JavaScript", "React", "Node.js"],
  "type": "full-time",
  "categoryId": "1",
  "salary": "$100,000 - $150,000",
  "salaryMin": 100000,
  "salaryMax": 150000,
  "deadline": "2023-07-01T00:00:00Z",
  "logo": "/images/company-logo.png",
  "featured": false,
  "skills": ["JavaScript", "React", "Node.js", "TypeScript"],
  "benefits": ["Health Insurance", "401k", "Remote Work"],
  "responsibilities": ["Develop web applications", "Collaborate with team members"],
  "companyDescription": "Company description...",
  "companySize": "50-100",
  "companyWebsite": "https://example.com",
  "companyIndustry": "Technology"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Job object with the same structure as Get Job by ID
  }
}
```

### Update Job

Update an existing job listing (employer only).

```
PUT /api/jobs/:id
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `id` (string): Job ID

**Request Body:** Same structure as Create Job (partial updates allowed).

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated job object
  }
}
```

### Delete Job

Delete a job listing (employer only).

```
DELETE /api/jobs/:id
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `id` (string): Job ID

**Response:**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

## Job Categories

### Get All Categories

Retrieve a list of all job categories.

```
GET /api/job-categories
```

**Query Parameters:**
- `search` (string): Search term to filter categories by name
- `sort` (string): Field to sort by (default: 'name')
- `order` (string): Sort order, 'asc' or 'desc' (default: 'asc')
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Results per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Development",
      "description": "Development jobs",
      "icon": "code",
      "jobCount": 120
    },
    {
      "id": "2",
      "name": "Design",
      "description": "Design jobs",
      "icon": "palette",
      "jobCount": 85
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "pages": 3,
    "hasMore": true
  }
}
```

### Get Category by ID

Retrieve details about a specific job category.

```
GET /api/job-categories/:id
```

**URL Parameters:**
- `id` (string): Category ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Development",
    "description": "Development jobs",
    "icon": "code",
    "jobCount": 120,
    "activeJobsCount": 85
  }
}
```

### Create Category

Create a new job category (admin only).

```
POST /api/job-categories
```

**Headers:**
- `Authorization`: Bearer token

**Request Body:**
```json
{
  "name": "Marketing",
  "description": "Marketing jobs",
  "icon": "bullhorn"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "3",
    "name": "Marketing",
    "description": "Marketing jobs",
    "icon": "bullhorn",
    "jobCount": 0
  }
}
```

### Update Category

Update an existing job category (admin only).

```
PUT /api/job-categories/:id
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `id` (string): Category ID

**Request Body:**
```json
{
  "name": "Digital Marketing",
  "description": "Digital marketing jobs",
  "icon": "signal"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "3",
    "name": "Digital Marketing",
    "description": "Digital marketing jobs",
    "icon": "signal",
    "jobCount": 0
  }
}
```

### Delete Category

Delete a job category (admin only).

```
DELETE /api/job-categories/:id
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `id` (string): Category ID

**Response:**
```json
{
  "success": true,
  "data": {}
}
```

## Users

### Get All Users

Retrieve a list of all users (admin only).

```
GET /api/users
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2023-01-15T00:00:00Z",
      "updatedAt": "2023-05-20T00:00:00Z"
    }
  ]
}
```

### Get User Profile

Retrieve the authenticated user's profile.

```
GET /api/users/profile
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "postedJobs": [
      {
        "id": "5",
        "title": "Job Title",
        "createdAt": "2023-05-15T00:00:00Z"
      }
    ],
    "jobApplications": [
      {
        "id": "8",
        "status": "pending",
        "createdAt": "2023-05-20T00:00:00Z"
      }
    ]
  }
}
```

### Update User Profile

Update the authenticated user's profile information.

```
PUT /api/users/profile
```

**Headers:**
- `Authorization`: Bearer token

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "password": "newSecurePassword",
  "currentPassword": "oldSecurePassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "role": "user"
  }
}
```

### Delete User Account

Delete the authenticated user's account.

```
DELETE /api/users/profile
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

### Get User's Posted Jobs

Retrieve a list of jobs posted by the authenticated user (employer only).

```
GET /api/users/posted-jobs
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "5",
      "title": "Software Engineer",
      "company": "Tech Company",
      "location": "San Francisco, CA",
      "description": "Job description...",
      "requirements": ["JavaScript", "React", "Node.js"],
      "type": "full-time",
      "category": {
        "id": "1",
        "name": "Development"
      },
      "salary": "$100,000 - $150,000",
      "salaryMin": 100000,
      "salaryMax": 150000,
      "postedDate": "2023-05-15T00:00:00Z",
      "deadline": "2023-06-15T00:00:00Z",
      "status": "active",
      "applications": 10,
      "views": 250,
      "jobApplications": [
        {
          "id": "8",
          "status": "pending",
          "applicant": {
            "id": "2",
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "jane@example.com"
          }
        }
      ]
    }
  ]
}
```

### Get User's Job Applications

Retrieve a list of job applications made by the authenticated user.

```
GET /api/users/applications
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "8",
      "status": "pending",
      "appliedAt": "2023-05-20T00:00:00Z",
      "job": {
        "id": "5",
        "title": "Software Engineer",
        "company": "Tech Company",
        "location": "San Francisco, CA",
        "employer": {
          "id": "3",
          "firstName": "Jane",
          "lastName": "Smith",
          "email": "jane.smith@example.com"
        }
      }
    }
  ]
}
```

## Applications

### Get All Applications

Retrieve all job applications (admin or employer).

```
GET /api/applications
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "1",
      "status": "pending",
      "appliedAt": "2023-05-20T00:00:00Z",
      "applicant": {
        "id": "2",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane@example.com"
      },
      "job": {
        "id": "5",
        "title": "Software Engineer",
        "company": "Tech Company"
      }
    }
  ]
}
```

### Get User's Applications

Retrieve applications made by the authenticated user.

```
GET /api/applications/my-applications
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "1",
      "status": "pending",
      "appliedAt": "2023-05-20T00:00:00Z",
      "job": {
        "id": "5",
        "title": "Software Engineer",
        "company": "Tech Company",
        "location": "San Francisco, CA"
      }
    }
  ]
}
```

### Get Applications for a Job

Retrieve all applications for a specific job (employer only).

```
GET /api/applications/job/:jobId
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `jobId` (string): Job ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "status": "pending",
      "appliedAt": "2023-05-20T00:00:00Z",
      "applicant": {
        "id": "2",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane@example.com"
      }
    }
  ]
}
```

### Create Application

Apply for a job.

```
POST /api/applications/job/:jobId
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `jobId` (string): Job ID

**Request Body:**
```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "555-123-4567",
  "resumeUrl": "https://example.com/resume.pdf",
  "coverLetter": "I am excited to apply for this position...",
  "portfolioUrl": "https://jane-doe-portfolio.com",
  "availableStartDate": "2023-07-01",
  "yearsOfExperience": 3
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "status": "pending",
    "appliedAt": "2023-05-20T00:00:00Z",
    "job": {
      "id": "5",
      "title": "Software Engineer",
      "company": "Tech Company",
      "employer": {
        "id": "3",
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@example.com"
      }
    },
    "applicant": {
      "id": "2",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com"
    }
  }
}
```

### Get User's Previous CVs

Retrieve the authenticated user's previously uploaded CVs.

```
GET /api/applications/user-cvs
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "url": "https://example.com/resume.pdf",
      "name": "Jane_Doe_Resume.pdf",
      "type": "application/pdf",
      "uploadedAt": "2023-05-20T00:00:00Z"
    }
  ]
}
```

### Update Application Status

Update the status of a job application (employer only).

```
PUT /api/applications/:id/status
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `id` (string): Application ID

**Request Body:**
```json
{
  "status": "accepted" // or "rejected", "pending", "interviewing"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "status": "accepted",
    "appliedAt": "2023-05-20T00:00:00Z",
    "job": {
      "id": "5",
      "title": "Software Engineer",
      "company": "Tech Company",
      "employer": {
        "id": "3",
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@example.com"
      }
    },
    "applicant": {
      "id": "2",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com"
    }
  }
}
```

### Delete Application

Delete a job application.

```
DELETE /api/applications/:id
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `id` (string): Application ID

**Response:**
```json
{
  "success": true,
  "message": "Application deleted successfully"
}
```

## Saved Jobs

### Get Saved Jobs

Retrieve a list of jobs saved by the authenticated user.

```
GET /api/saved-jobs
```

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "5",
      "title": "Software Engineer",
      "company": "Tech Company",
      "location": "San Francisco, CA",
      "description": "Job description...",
      "requirements": ["JavaScript", "React", "Node.js"],
      "type": "full-time",
      "category": {
        "id": "1",
        "name": "Development"
      },
      "salary": "$100,000 - $150,000",
      "salaryMin": 100000,
      "salaryMax": 150000,
      "postedDate": "2023-05-15T00:00:00Z",
      "deadline": "2023-06-15T00:00:00Z",
      "logo": "/images/company-logo.png",
      "featured": true,
      "applications": 10,
      "views": 250
    }
  ]
}
```

### Save Job

Save a job for later viewing.

```
POST /api/saved-jobs/:jobId
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `jobId` (string): Job ID

**Response:**
```json
{
  "success": true,
  "message": "Job saved successfully"
}
```

### Unsave Job

Remove a job from saved jobs.

```
DELETE /api/saved-jobs/:jobId
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `jobId` (string): Job ID

**Response:**
```json
{
  "success": true,
  "message": "Job removed from saved jobs"
}
```

### Check Saved Job

Check if a job is saved by the authenticated user.

```
GET /api/saved-jobs/:jobId/check
```

**Headers:**
- `Authorization`: Bearer token

**URL Parameters:**
- `jobId` (string): Job ID

**Response:**
```json
{
  "success": true,
  "isSaved": true
}
```

## SEO Settings

### Get SEO Settings

Retrieve the current SEO settings.

```
GET /api/seo-settings
```

**Headers:**
- `Authorization`: Bearer token (admin only)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "globalTitle": "HarpalJobs | Find Your Dream Job Today",
    "globalDescription": "HarpalJobs is the leading job board connecting job seekers with top employers.",
    "globalKeywords": "jobs, careers, employment, hiring, job search, job board",
    "ogImage": "/og-image.png",
    "indexingEnabled": true,
    "robotsTxt": "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /private/\nSitemap: https://harpalJobs.com/sitemap.xml",
    "siteVerificationGoogle": "google-verification-code",
    "siteVerificationBing": "bing-verification-code",
    "customHeadCode": "",
    "canonicalUrl": "https://harpalJobs.com",
    "userId": "admin-1",
    "updatedAt": "2023-06-15T00:00:00Z"
  }
}
```

### Update SEO Settings

Update the SEO settings.

```
PUT /api/seo-settings
```

**Headers:**
- `Authorization`: Bearer token (admin only)

**Request Body:**
```json
{
  "globalTitle": "HarpalJobs | Your Career Partner",
  "globalDescription": "HarpalJobs helps connect talented professionals with top companies worldwide.",
  "globalKeywords": "jobs, careers, employment, hiring, job search, job board, professional",
  "ogImage": "/new-og-image.png",
  "indexingEnabled": true,
  "siteVerificationGoogle": "updated-google-verification-code",
  "canonicalUrl": "https://harpalJobs.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "globalTitle": "HarpalJobs | Your Career Partner",
    "globalDescription": "HarpalJobs helps connect talented professionals with top companies worldwide.",
    "globalKeywords": "jobs, careers, employment, hiring, job search, job board, professional",
    "ogImage": "/new-og-image.png",
    "indexingEnabled": true,
    "robotsTxt": "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /private/\nSitemap: https://harpalJobs.com/sitemap.xml",
    "siteVerificationGoogle": "updated-google-verification-code",
    "siteVerificationBing": "bing-verification-code",
    "customHeadCode": "",
    "canonicalUrl": "https://harpalJobs.com",
    "userId": "admin-1",
    "updatedAt": "2023-06-20T00:00:00Z"
  }
}
```

### Analyze Keyword Density

Analyze the keyword density in content.

```
POST /api/seo-tools/keyword-density
```

**Headers:**
- `Authorization`: Bearer token

**Request Body:**
```json
{
  "content": "This is the content to analyze for the target keyword density. The keyword appears multiple times in this keyword-rich text.",
  "keyword": "keyword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "keyword": "keyword",
    "count": 3,
    "density": 5.36,
    "suggestions": [
      "keyword optimization",
      "best keyword",
      "keyword trends",
      "keyword services",
      "keyword solutions"
    ]
  }
}
```

### Generate Robots.txt

Generate a robots.txt file content.

```
POST /api/seo-tools/robots-txt
```

**Headers:**
- `Authorization`: Bearer token (admin only)

**Request Body:**
```json
{
  "domain": "https://harpalJobs.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /dashboard/\nDisallow: /private/\nDisallow: /api/\n\n# Sitemap\nSitemap: https://harpalJobs.com/sitemap.xml\n\n# Crawl delay\nCrawl-delay: 10"
  }
}
```

### Get SEO Performance Data

Retrieve SEO performance analytics.

```
GET /api/seo-tools/performance
```

**Headers:**
- `Authorization`: Bearer token (admin only)

**Response:**
```json
{
  "success": true,
  "data": {
    "rankings": [
      { "keyword": "remote jobs", "position": 3, "change": 1, "volume": 12400 },
      { "keyword": "software developer jobs", "position": 5, "change": -2, "volume": 6800 },
      { "keyword": "work from home", "position": 8, "change": 3, "volume": 8500 },
      { "keyword": "tech jobs", "position": 12, "change": 0, "volume": 4300 },
      { "keyword": "marketing jobs", "position": 15, "change": 5, "volume": 3700 }
    ],
    "clicks": 1243,
    "impressions": 15678,
    "ctr": 7.93,
    "averagePosition": 4.2
  }
}
```
