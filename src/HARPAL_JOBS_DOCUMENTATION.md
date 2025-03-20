
# HarpalJobs Website Documentation

## Overview

HarpalJobs is a comprehensive job board website that connects job seekers with employers. The platform offers a responsive design that works across all devices and provides features for both job seekers and employers.

## Key Features

### For Job Seekers
- Browse and search job listings
- Filter jobs by category, location, and other criteria
- Save favorite jobs
- Apply to jobs through the platform
- Receive job alerts
- Mobile app access

### For Employers
- Post and manage job listings
- Review applications
- Promote listings with premium options
- Access analytics and reporting
- SEO optimization for job listings

## Technical Architecture

### Frontend
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn/UI component library
- React Router for navigation
- React Query for data fetching and state management

### Dashboard Features
- **Overview Dashboard**: Statistics and recent activity
- **Jobs Management**: Create, edit, delete job listings
- **Applicants Management**: Review and manage job applications
- **Ad Management**: Configure advertising campaigns
- **SEO Settings**: Optimize search engine visibility
- **Mobile App Management**: Configure and monitor the mobile application
- **Analytics & Reports**: View detailed performance metrics

## Ad Management System

HarpalJobs includes a comprehensive ad management system that allows placement and control of advertisements throughout the website.

### Ad Types
- **Internal Ads**: Promotional content for HarpalJobs services
- **Google Ads**: Integration with Google AdSense

### Ad Placements
- Header
- Sidebar
- Inline (within content)
- Footer

### Ad Controls
From the admin dashboard, you can:
- Enable/disable all ads
- Enable/disable mobile ads specifically
- Enable/disable Google Ads
- Configure ad frequency and placement rules
- View ad performance metrics

### Implementation
The ad system uses the `AdBanner` component which accepts the following properties:
- `id`: Unique identifier for the ad
- `size`: Size of the ad (small, medium, large, responsive)
- `position`: Placement position (inline, sidebar, header, footer)
- `type`: Ad type (internal, google)
- `googleAdSlot`: For Google ads, the ad slot ID

## SEO Features

HarpalJobs implements comprehensive SEO features to maximize visibility in search engines.

### On-page SEO
- Customizable page titles and meta descriptions
- Structured data (JSON-LD) for job listings
- OpenGraph and Twitter card meta tags
- Canonical URLs
- XML sitemap generation
- Robots.txt configuration

### SEO Dashboard
The SEO dashboard provides tools to:
- Monitor keyword performance
- Analyze keyword density
- Set meta descriptions and titles for key pages
- Configure structured data
- Generate relevant keywords
- Track search engine visibility

### Implementation
The SEO system uses:
- `SEOHead` component for consistent meta tag implementation
- SEO utility functions for structured data generation
- React Helmet for document head management

## Mobile Responsiveness

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

Responsive features include:
- Fluid layouts
- Adaptive components
- Touch-friendly interfaces
- Optimized images and media

## Getting Started

### Prerequisites
- Node.js 14.x or higher
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: `npm run dev` or `yarn dev`

### Building for Production
Run `npm run build` or `yarn build` to create a production build.

## Configuration

### Environment Variables
Create a `.env` file with the following variables:
- `VITE_API_URL`: API endpoint URL
- `VITE_GOOGLE_ANALYTICS_ID`: Google Analytics tracking ID
- `VITE_GOOGLE_ADSENSE_ID`: Google AdSense publisher ID

## Deployment

The application can be deployed to any static hosting service:
1. Build the application
2. Upload the contents of the `dist` directory to your hosting provider
3. Configure your web server to handle client-side routing

## Best Practices

### Ad Implementation
- Limit the number of ads per page to avoid overwhelming users
- Ensure ads are clearly marked as advertisements
- Test ad placements on different devices to ensure responsiveness
- Consider user experience when placing ads

### SEO Optimization
- Use relevant keywords naturally in content
- Ensure each page has a unique title and description
- Implement proper heading hierarchy (H1, H2, etc.)
- Optimize images with alt text
- Keep URLs clean and descriptive
- Regularly update content to maintain freshness

## Troubleshooting

### Common Issues
- **Ads not displaying**: Check ad settings in the dashboard
- **SEO data not updating**: Clear cache and verify meta tag implementation
- **Responsive layout issues**: Test on multiple devices and browsers

### Support
For technical support, please contact the development team at support@example.com

## Future Enhancements
- Enhanced analytics integration
- AI-powered job matching
- Improved ad targeting capabilities
- Advanced SEO tools and reporting
- Integration with more job boards and platforms

---

© 2023 HarpalJobs. All rights reserved.
