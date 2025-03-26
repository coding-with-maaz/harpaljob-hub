# HarpalJobs - Job Search Platform

![HarpalJobs Logo](https://github.com/user-attachments/assets/af88c8ab-53f3-438c-acfe-9a2823064cdf)

## Overview

HarpalJobs is a modern job search platform that connects job seekers with employers. Built with React, TypeScript, and Node.js, it offers a seamless experience for both job seekers and employers.

## Features

### For Job Seekers
- Advanced job search with filters
- Job categories and tags
- Company profiles
- Job application tracking
- Saved jobs functionality
- Job alerts and notifications
- Mobile-responsive design

### For Employers
- Job posting management
- Candidate applications tracking
- Company profile management
- Featured job listings
- Analytics dashboard
- Application management

### Technical Features
- SEO optimization
- Structured data for job listings
- Real-time search
- Pagination and infinite scroll
- Authentication and authorization
- API rate limiting
- Error handling
- Logging system

## Tech Stack

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- React Query
- Tailwind CSS
- Shadcn UI Components
- React Router DOM

### Backend
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT Authentication
- Redis (for caching)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- Redis (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/harpaljob-hub.git
cd harpaljob-hub
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Set up environment variables:
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:5000/api

# Backend (.env)
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=harpaljobs
JWT_SECRET=your_jwt_secret
```

5. Start the development servers:
```bash
# Frontend
npm run dev

# Backend
cd backend
npm run dev
```

## API Documentation

### Authentication
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Forgot Password: `POST /api/auth/forgot-password`
- Reset Password: `POST /api/auth/reset-password`

### Jobs
- Get All Jobs: `GET /api/jobs`
- Get Job by ID: `GET /api/jobs/:id`
- Create Job: `POST /api/jobs`
- Update Job: `PUT /api/jobs/:id`
- Delete Job: `DELETE /api/jobs/:id`
- Get Jobs by Category: `GET /api/jobs/category/:categoryId`

### Categories
- Get All Categories: `GET /api/job-categories`
- Get Category by ID: `GET /api/job-categories/:id`
- Create Category: `POST /api/job-categories`
- Update Category: `PUT /api/job-categories/:id`
- Delete Category: `DELETE /api/job-categories/:id`

### Applications
- Get Applications: `GET /api/applications`
- Create Application: `POST /api/applications`
- Update Application Status: `PUT /api/applications/:id/status`
- Delete Application: `DELETE /api/applications/:id`

## Project Structure

```
harpaljob-hub/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── jobs/
│   │   └── layout/
│   ├── pages/
│   ├── lib/
│   │   ├── store/
│   │   └── types/
│   ├── hooks/
│   └── utils/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── config/
│   └── seeders/
└── public/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@harpaljobs.com or join our Slack channel.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Sequelize](https://sequelize.org/)

# HarpalJobs SEO Documentation

This document provides an overview of the Search Engine Optimization (SEO) features available in the HarpalJobs platform and how to use them effectively.

## Table of Contents

1. [SEO Overview](#seo-overview)
2. [Global SEO Settings](#global-seo-settings)
3. [Page-Specific SEO](#page-specific-seo)
4. [SEO Tools](#seo-tools)
5. [Structured Data](#structured-data)
6. [Analytics Integration](#analytics-integration)
7. [Best Practices](#best-practices)

## SEO Overview

HarpalJobs includes comprehensive SEO features to help improve search engine visibility, drive organic traffic, and enhance user experience. These features include:

- Meta tag management
- Structured data for job listings
- SEO analysis tools
- Sitemap generation
- Robots.txt configuration
- Search performance analytics

## Global SEO Settings

Global SEO settings apply across the entire website and can be configured from the Dashboard > SEO section.

### Basic SEO Settings

- **Default Site Title**: The main title used across the site when a page-specific title is not set.
- **Default Meta Description**: The default description used for pages without a specific description.
- **Default Keywords**: Primary keywords for the site that apply to all pages.

### Social Media

- **OG Image**: The default image displayed when content is shared on social media platforms.
- **Social Media Tags**: Open Graph and Twitter Card meta tags are automatically generated for all pages.

### Indexing Control

- **Search Engine Indexing**: Toggle to enable/disable search engine indexing for your site.
- **Robots.txt**: Configure instructions for search engine crawlers.
- **Sitemap**: Automatically generated at `/sitemap.xml` and includes all job listings and main pages.

### Advanced Settings

- **Site Verification**: Add verification codes for Google Search Console and Bing Webmaster Tools.
- **Custom Head Code**: Add custom code to the `<head>` section of all pages.

## Page-Specific SEO

Each page can have its own SEO settings that override the global defaults:

### Job Listings

Job listings automatically generate SEO-friendly metadata and structured data including:

- Job title
- Company
- Location
- Salary information
- Employment type
- Application deadlines

### Using the SEOHead Component

When creating custom pages, use the `SEOHead` component:

```jsx
import SEOHead from "@/components/SEOHead";

// Inside your component
return (
  <>
    <SEOHead
      title="Page Title | HarpalJobs"
      description="Page description for search engines and social sharing."
      keywords="keyword1, keyword2, keyword3"
      ogImage="/custom-image.jpg"
      canonicalUrl="https://harpalJobs.com/page-url"
    />
    {/* Rest of your page */}
  </>
);
```

## SEO Tools

HarpalJobs includes several SEO analysis tools:

### Keyword Density Analyzer

Analyzes how frequently a keyword appears in your content. Optimal density is generally between 1-3%.

### SEO URL Checker

Verifies if your URLs follow SEO best practices:
- Use of lowercase letters
- Avoidance of special characters
- Use of hyphens instead of underscores
- Consistency in trailing slashes

### Heading Structure Analyzer

Checks if your page has a proper heading structure:
- Single H1 tag per page
- Proper hierarchy (H1 > H2 > H3)
- Keywords in headings

### Full SEO Analyzer

Available at `/seo-analyzer`, this tool provides comprehensive analysis of pages with an overall SEO score.

## Structured Data

Structured data helps search engines understand content and can enable rich results in search listings.

HarpalJobs automatically generates the following schema types:

### Job Posting Schema

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Job Title",
  "description": "Job description...",
  "datePosted": "2023-04-01T00:00:00Z",
  "validThrough": "2023-07-01T00:00:00Z",
  "employmentType": "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Company Name",
    "sameAs": "https://company-website.com"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "City Name",
      "addressCountry": "US"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": {
      "@type": "QuantitativeValue",
      "minValue": 50000,
      "maxValue": 70000,
      "unitText": "YEAR"
    }
  }
}
```

### Organization Schema

Information about your organization, including name, logo, contact information, and social profiles.

### Website Schema

Basic information about the website, including name, description, and search functionality.

## Analytics Integration

HarpalJobs SEO dashboard displays key metrics including:

- Search rankings for target keywords
- Click-through rates
- Impressions
- Average position

Integration with Google Search Console and Google Analytics is recommended for comprehensive analytics.

## Best Practices

Follow these best practices to maximize SEO effectiveness:

1. **Use unique titles and descriptions** for each page
2. **Include primary keywords** in titles, headings, and early in content
3. **Optimize images** with descriptive alt text and appropriate file sizes
4. **Create SEO-friendly URLs** that are descriptive and contain keywords
5. **Regularly publish fresh content** to improve search engine rankings
6. **Build internal links** between related job listings and content
7. **Ensure mobile optimization** as mobile-friendliness is a ranking factor
8. **Improve page load speed** by optimizing images and resources
9. **Use structured data** to enhance search result appearance
10. **Monitor analytics** to identify opportunities for improvement

---

For more information or support, contact the HarpalJobs development team.
