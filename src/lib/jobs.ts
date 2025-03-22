import { Job } from "./types";

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechVision Inc.",
    location: "San Francisco",
    country: "United States",
    type: "full-time",
    salary: "$120,000 - $150,000",
    salaryMin: 120000,
    salaryMax: 150000,
    description: "TechVision is looking for a Senior Frontend Developer to join our growing team. You'll be responsible for building beautiful, responsive web applications using React and TypeScript. The ideal candidate has 5+ years of experience with modern frontend frameworks and a passion for clean, maintainable code.",
    requirements: [
      "5+ years of experience with React, TypeScript, and modern frontend tools",
      "Strong understanding of web performance optimization",
      "Experience with state management libraries (Redux, Zustand, etc.)",
      "Knowledge of responsive design and accessibility standards",
      "Bachelor's degree in Computer Science or related field (or equivalent experience)"
    ],
    responsibilities: [
      "Develop new user-facing features using React and TypeScript",
      "Build reusable components and libraries for future use",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with backend developers and designers",
      "Participate in code reviews and mentor junior developers"
    ],
    postedDate: "2023-06-15",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=100&auto=format&fit=crop",
    category: "Technology",
    experience: "5+ years",
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote-first culture",
      "Annual professional development budget"
    ],
    tags: ["React", "TypeScript", "Redux", "Tailwind CSS"],
    companyDescription: "TechVision is a leading technology company specializing in innovative software solutions for businesses of all sizes. With a focus on user experience and cutting-edge technology, we're changing how companies interact with their customers.",
    companySize: "50-200 employees",
    status: "active",
    featured: true,
    views: 0,
    applications: 0,
    deadline: "2023-08-15",
    slug: "senior-frontend-developer-techvision",
    skills: ["React", "TypeScript", "Redux"],
    categoryId: "1",
    employerId: "1",
    companyId: "1",
    userId: "1"
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "New York",
    country: "United States",
    type: "full-time",
    salary: "$90,000 - $120,000",
    salaryMin: 90000,
    salaryMax: 120000,
    description: "DesignHub is seeking a talented UX/UI Designer to create amazing user experiences. You'll work closely with product managers and developers to design intuitive, engaging products that users love.",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency with design tools like Figma and Adobe Creative Suite",
      "Portfolio demonstrating strong visual design skills",
      "Experience with user research and usability testing",
      "Excellent communication and collaboration skills"
    ],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Develop user personas and journey maps",
      "Collaborate with developers to ensure designs are implemented correctly",
      "Stay up-to-date with design trends and best practices"
    ],
    postedDate: "2023-06-20",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=100&auto=format&fit=crop",
    category: "Design",
    experience: "3+ years",
    benefits: [
      "Competitive salary",
      "Healthcare coverage",
      "Flexible work hours",
      "Annual design conference allowance",
      "Creative workspace"
    ],
    tags: ["Figma", "UI/UX", "User Research", "Prototyping"],
    companyDescription: "DesignHub is a creative agency that specializes in building beautiful digital experiences. We work with clients across various industries to create meaningful, user-centered designs that drive business growth.",
    companySize: "10-50 employees",
    status: "active",
    featured: false,
    views: 0,
    applications: 0,
    deadline: "2023-07-20",
    slug: "ux-ui-designer-designhub",
    skills: ["Figma", "UI/UX", "User Research"],
    categoryId: "2",
    employerId: "2",
    companyId: "2",
    userId: "2"
  },
  {
    id: "3",
    title: "Full Stack Engineer",
    company: "InnovateTech",
    location: "Austin",
    country: "United States",
    type: "full-time",
    salary: "$100,000 - $130,000",
    salaryMin: 100000,
    salaryMax: 130000,
    description: "InnovateTech is looking for a Full Stack Engineer to help build our next generation of products. You'll work on both frontend and backend development, using a variety of technologies to create scalable, efficient applications.",
    requirements: [
      "4+ years of full stack development experience",
      "Proficiency with React, Node.js, and SQL/NoSQL databases",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Knowledge of DevOps practices and CI/CD pipelines",
      "Strong problem-solving skills and attention to detail"
    ],
    responsibilities: [
      "Develop features across the full technology stack",
      "Design and implement database schemas",
      "Write clean, maintainable, and efficient code",
      "Troubleshoot and debug applications",
      "Collaborate with cross-functional teams to define and implement new features"
    ],
    postedDate: "2023-06-18",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&auto=format&fit=crop",
    category: "Technology",
    experience: "4+ years",
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health benefits",
      "Flexible work arrangements",
      "Weekly team lunches",
      "Home office stipend"
    ],
    tags: ["React", "Node.js", "AWS", "MongoDB"],
    companyDescription: "InnovateTech is a fast-growing startup that's revolutionizing the way businesses manage their operations. Our cloud-based platform helps companies streamline their workflows and increase productivity.",
    companySize: "200-500 employees",
    status: "active",
    featured: true,
    views: 0,
    applications: 0,
    deadline: "2023-07-18",
    slug: "full-stack-engineer-innovatetech",
    skills: ["React", "Node.js", "AWS"],
    categoryId: "1",
    employerId: "3",
    companyId: "3",
    userId: "3"
  },
  {
    id: "4",
    title: "Product Marketing Manager",
    company: "GrowthLabs",
    location: "Chicago",
    country: "United States",
    type: "full-time",
    salary: "$85,000 - $110,000",
    salaryMin: 85000,
    salaryMax: 110000,
    description: "GrowthLabs is seeking a Product Marketing Manager to develop and execute marketing strategies for our products. You'll work closely with product, sales, and design teams to create compelling messaging and drive product adoption.",
    requirements: [
      "3+ years of experience in product marketing",
      "Strong understanding of B2B SaaS marketing",
      "Excellent writing and communication skills",
      "Experience with market research and competitive analysis",
      "Data-driven approach to marketing strategy"
    ],
    responsibilities: [
      "Develop product positioning and messaging",
      "Create marketing materials (website content, case studies, etc.)",
      "Plan and execute product launches",
      "Analyze marketing metrics and adjust strategies accordingly",
      "Train sales team on product features and benefits"
    ],
    postedDate: "2023-06-22",
    logo: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=100&auto=format&fit=crop",
    category: "Marketing",
    experience: "3+ years",
    benefits: [
      "Competitive salary",
      "Health and dental insurance",
      "401(k) matching",
      "Professional development budget",
      "Flexible work hours"
    ],
    tags: ["B2B Marketing", "SaaS", "Product Launches", "Content Strategy"],
    companyDescription: "GrowthLabs is a marketing technology company that helps businesses attract, engage, and retain customers. Our platform provides tools for email marketing, social media management, and analytics.",
    companySize: "100-500 employees",
    status: "active",
    featured: false,
    views: 0,
    applications: 0,
    deadline: "2023-07-22",
    slug: "product-marketing-manager-growthlabs",
    skills: ["B2B Marketing", "SaaS", "Product Launches"],
    categoryId: "3",
    employerId: "4",
    companyId: "4",
    userId: "4"
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudSecure",
    location: "Seattle",
    country: "United States",
    type: "full-time",
    salary: "$115,000 - $140,000",
    salaryMin: 115000,
    salaryMax: 140000,
    description: "CloudSecure is looking for a DevOps Engineer to help us build and maintain our infrastructure. You'll be responsible for improving deployment processes, ensuring system reliability, and implementing security best practices.",
    requirements: [
      "4+ years of experience in DevOps or SRE roles",
      "Strong knowledge of cloud platforms (AWS, GCP)",
      "Experience with containerization (Docker, Kubernetes)",
      "Proficiency with infrastructure as code (Terraform, CloudFormation)",
      "Understanding of networking and security principles"
    ],
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure and optimize for cost and performance",
      "Implement monitoring and alerting systems",
      "Troubleshoot and resolve infrastructure issues",
      "Collaborate with development teams to improve deployment processes"
    ],
    postedDate: "2023-06-17",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=100&auto=format&fit=crop",
    category: "Technology",
    experience: "4+ years",
    benefits: [
      "Competitive salary",
      "Comprehensive benefits package",
      "Remote work options",
      "Continuous learning opportunities",
      "Team bonding events"
    ],
    tags: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    companyDescription: "CloudSecure provides cloud security solutions for enterprises. Our platform helps companies protect their cloud infrastructure and comply with industry regulations.",
    companySize: "500-1000 employees",
    status: "active",
    featured: false,
    views: 0,
    applications: 0,
    deadline: "2023-07-17",
    slug: "devops-engineer-cloudsecure",
    skills: ["AWS", "Kubernetes", "Terraform"],
    categoryId: "1",
    employerId: "5",
    companyId: "5",
    userId: "5"
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Boston",
    country: "United States",
    type: "full-time",
    salary: "$110,000 - $135,000",
    salaryMin: 110000,
    salaryMax: 135000,
    description: "AnalyticsPro is seeking a Data Scientist to join our team. You'll analyze complex data sets, build predictive models, and extract actionable insights to help our clients make data-driven decisions.",
    requirements: [
      "Master's or PhD in a quantitative field (Statistics, Computer Science, etc.)",
      "3+ years of experience in data science or related field",
      "Proficiency with Python and data science libraries (pandas, scikit-learn, etc.)",
      "Experience with machine learning algorithms and statistical modeling",
      "Strong problem-solving and communication skills"
    ],
    responsibilities: [
      "Analyze large datasets to identify patterns and trends",
      "Build and optimize machine learning models",
      "Communicate findings to technical and non-technical stakeholders",
      "Collaborate with engineering teams to implement data solutions",
      "Stay current with latest developments in data science"
    ],
    postedDate: "2023-06-19",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=100&auto=format&fit=crop",
    category: "Technology",
    experience: "3+ years",
    benefits: [
      "Competitive salary",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Continuing education stipend",
      "Regular team events"
    ],
    tags: ["Python", "Machine Learning", "Statistics", "Data Analysis"],
    companyDescription: "AnalyticsPro is a data analytics company that helps businesses make better decisions through data. We provide advanced analytics solutions across various industries, including finance, healthcare, and retail.",
    companySize: "1000+ employees",
    status: "active",
    featured: true,
    views: 0,
    applications: 0,
    deadline: "2023-07-19",
    slug: "data-scientist-analyticspro",
    skills: ["Python", "Machine Learning", "Statistics"],
    categoryId: "1",
    employerId: "6",
    companyId: "6",
    userId: "6"
  }
];

export const getJobById = (id: string): Job | undefined => {
  return jobs.find(job => job.id === id);
};

export const getFeaturedJobs = (): Job[] => {
  return jobs.filter(job => job.featured);
};

export const getLatestJobs = (limit: number = 4): Job[] => {
  return [...jobs]
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, limit);
};

export const getAllJobs = (): Job[] => {
  return [...jobs];
};

export const getJobsByCategory = (category: Job['category']): Job[] => {
  return jobs.filter(job => job.category === category);
};

export const searchJobs = (query: string): Job[] => {
  const lowercaseQuery = query.toLowerCase();
  return jobs.filter(
    job => 
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.company.toLowerCase().includes(lowercaseQuery) ||
      job.description.toLowerCase().includes(lowercaseQuery) ||
      job.location.toLowerCase().includes(lowercaseQuery) ||
      job.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
