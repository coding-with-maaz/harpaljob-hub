
# HarpalJobs API Endpoints Documentation

This document provides a comprehensive overview of all API endpoints available in the HarpalJobs platform. It serves as a quick reference for developers working on both frontend and backend components.

## Base URL

All endpoints are prefixed with: `/api`

For local development: `http://localhost:5000/api`
For production: `https://api.harpalJobs.com/api`

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints Overview

### Authentication

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | /auth/register | Register a new user | No |
| POST | /auth/login | Authenticate a user | No |

### Jobs

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | /jobs | Get all jobs with filtering | No |
| GET | /jobs/featured | Get featured jobs | No |
| GET | /jobs/latest | Get latest jobs | No |
| GET | /jobs/:id | Get job by ID | No |
| POST | /jobs | Create a new job | Yes (employer) |
| PUT | /jobs/:id | Update a job | Yes (employer) |
| DELETE | /jobs/:id | Delete a job | Yes (employer) |
| GET | /jobs/category/:categoryId | Get jobs by category | No |

### Job Categories

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | /job-categories | Get all categories | No |
| GET | /job-categories/:id | Get category by ID | No |
| POST | /job-categories | Create a category | Yes (admin) |
| PUT | /job-categories/:id | Update a category | Yes (admin) |
| DELETE | /job-categories/:id | Delete a category | Yes (admin) |

### Users

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | /users | Get all users | Yes (admin) |
| GET | /users/profile | Get current user profile | Yes |
| PUT | /users/profile | Update current user profile | Yes |
| DELETE | /users/profile | Delete current user account | Yes |
| GET | /users/posted-jobs | Get jobs posted by current user | Yes (employer) |
| GET | /users/applications | Get applications made by current user | Yes |

### Applications

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | /applications | Get all applications | Yes (admin/employer) |
| GET | /applications/my-applications | Get current user's applications | Yes |
| GET | /applications/job/:jobId | Get applications for a job | Yes (employer) |
| POST | /applications/job/:jobId | Apply for a job | Yes |
| GET | /applications/user-cvs | Get user's previous CVs | Yes |
| PUT | /applications/:id/status | Update application status | Yes (employer) |
| DELETE | /applications/:id | Delete an application | Yes |

### Saved Jobs

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | /saved-jobs | Get current user's saved jobs | Yes |
| POST | /saved-jobs/:jobId | Save a job | Yes |
| DELETE | /saved-jobs/:jobId | Unsave a job | Yes |
| GET | /saved-jobs/:jobId/check | Check if a job is saved | Yes |

### SEO Settings

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | /seo-settings | Get SEO settings | Yes (admin) |
| PUT | /seo-settings | Update SEO settings | Yes (admin) |
| POST | /seo-tools/keyword-density | Analyze keyword density | Yes |
| POST | /seo-tools/robots-txt | Generate robots.txt | Yes (admin) |
| GET | /seo-tools/performance | Get SEO performance data | Yes (admin) |

## Detailed Endpoint Specifications

### Authentication

#### Register User

```
POST /api/auth/register
```

Request Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "user" // Optional: "user", "employer", default is "user"
}
```

#### Login User

```
POST /api/auth/login
```

Request Body:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Jobs

#### Get All Jobs

```
GET /api/jobs
```

Query Parameters:
- `query` (string): Search term
- `location` (string): Location filter
- `category` (string): Category ID filter
- `employmentType` (string): Employment type filter
- `sortBy` (string): Sort option (relevance, recent, salary-high, salary-low, popular, deadline)
- `page` (number): Page number
- `limit` (number): Results per page
- `featured` (boolean): Featured jobs only
- `remoteOnly` (boolean): Remote jobs only

#### Get Featured Jobs

```
GET /api/jobs/featured
```

Query Parameters:
- `limit` (number): Maximum results to return

#### Get Latest Jobs

```
GET /api/jobs/latest
```

Query Parameters:
- `limit` (number): Maximum results to return

#### Get Job by ID

```
GET /api/jobs/:id
```

URL Parameters:
- `id` (string): Job ID

#### Create Job

```
POST /api/jobs
```

Request Body: Job object (see API documentation for full schema)

#### Update Job

```
PUT /api/jobs/:id
```

URL Parameters:
- `id` (string): Job ID

Request Body: Partial job object with fields to update

#### Delete Job

```
DELETE /api/jobs/:id
```

URL Parameters:
- `id` (string): Job ID

#### Get Jobs by Category

```
GET /api/jobs/category/:categoryId
```

URL Parameters:
- `categoryId` (string): Category ID

Query Parameters:
- Same as "Get All Jobs"

### Job Categories

#### Get All Categories

```
GET /api/job-categories
```

Query Parameters:
- `search` (string): Search term
- `sort` (string): Field to sort by
- `order` (string): Sort order (asc, desc)
- `page` (number): Page number
- `limit` (number): Results per page

#### Get Category by ID

```
GET /api/job-categories/:id
```

URL Parameters:
- `id` (string): Category ID

#### Create Category

```
POST /api/job-categories
```

Request Body:
```json
{
  "name": "Category Name",
  "description": "Category description",
  "icon": "icon-name"
}
```

#### Update Category

```
PUT /api/job-categories/:id
```

URL Parameters:
- `id` (string): Category ID

Request Body: Partial category object with fields to update

#### Delete Category

```
DELETE /api/job-categories/:id
```

URL Parameters:
- `id` (string): Category ID

### Users

#### Get All Users

```
GET /api/users
```

Admin only endpoint.

#### Get User Profile

```
GET /api/users/profile
```

Returns the authenticated user's profile.

#### Update User Profile

```
PUT /api/users/profile
```

Request Body: User object with fields to update (if changing password, must include currentPassword)

#### Delete User Account

```
DELETE /api/users/profile
```

Deletes the authenticated user's account.

#### Get User's Posted Jobs

```
GET /api/users/posted-jobs
```

Returns jobs posted by the authenticated employer.

#### Get User's Job Applications

```
GET /api/users/applications
```

Returns applications made by the authenticated user.

### Applications

#### Get All Applications

```
GET /api/applications
```

Admin sees all applications, employers see only applications for their jobs.

#### Get User's Applications

```
GET /api/applications/my-applications
```

Returns the authenticated user's job applications.

#### Get Applications for a Job

```
GET /api/applications/job/:jobId
```

URL Parameters:
- `jobId` (string): Job ID

Employer can only view applications for their own jobs.

#### Apply for a Job

```
POST /api/applications/job/:jobId
```

URL Parameters:
- `jobId` (string): Job ID

Request Body: Application object (see API documentation)

#### Get User's Previous CVs

```
GET /api/applications/user-cvs
```

Returns CVs previously uploaded by the authenticated user.

#### Update Application Status

```
PUT /api/applications/:id/status
```

URL Parameters:
- `id` (string): Application ID

Request Body:
```json
{
  "status": "accepted" // Or "rejected", "pending", "interviewing"
}
```

#### Delete Application

```
DELETE /api/applications/:id
```

URL Parameters:
- `id` (string): Application ID

### Saved Jobs

#### Get Saved Jobs

```
GET /api/saved-jobs
```

Returns jobs saved by the authenticated user.

#### Save Job

```
POST /api/saved-jobs/:jobId
```

URL Parameters:
- `jobId` (string): Job ID

#### Unsave Job

```
DELETE /api/saved-jobs/:jobId
```

URL Parameters:
- `jobId` (string): Job ID

#### Check Saved Job

```
GET /api/saved-jobs/:jobId/check
```

URL Parameters:
- `jobId` (string): Job ID

### SEO Settings

#### Get SEO Settings

```
GET /api/seo-settings
```

Returns the current SEO settings.

#### Update SEO Settings

```
PUT /api/seo-settings
```

Request Body: Partial SEO settings object with fields to update

#### Analyze Keyword Density

```
POST /api/seo-tools/keyword-density
```

Request Body:
```json
{
  "content": "Content to analyze",
  "keyword": "target keyword"
}
```

#### Generate Robots.txt

```
POST /api/seo-tools/robots-txt
```

Request Body:
```json
{
  "domain": "https://example.com"
}
```

#### Get SEO Performance Data

```
GET /api/seo-tools/performance
```

Returns SEO performance analytics.

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message description",
  "error": "Detailed error information (development only)"
}
```

## Pagination

Endpoints that return lists of items support pagination with this structure:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10,
    "hasMore": true
  }
}
```

## Filtering

Most list endpoints support filtering through query parameters. The specific filters available are documented with each endpoint.

## Request Examples

### cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get jobs with filter
curl -X GET "http://localhost:5000/api/jobs?category=1&location=Remote&page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### JavaScript (Fetch)

```javascript
// Login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => console.log(data));

// Get jobs with filter
fetch('http://localhost:5000/api/jobs?category=1&location=Remote&page=1&limit=10', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

---

This documentation is maintained by the HarpalJobs development team. For questions or issues, please contact support@harpalJobs.com.

Last updated: June 2023
