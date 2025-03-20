Seaching Query

// Basic search
GET /api/jobs?search=developer

// With filters
GET /api/jobs?location=New York&type=full-time&category=Technology

// With salary range
GET /api/jobs?minSalary=50000&maxSalary=150000

// Remote jobs
GET /api/jobs?remote=true

// With sorting
GET /api/jobs?sort=salary-high

// With pagination
GET /api/jobs?page=2&limit=20

