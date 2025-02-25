export const CLAIM_STATUSES = {
  DRAFT: "Draft",
  PENDING: "Pending",
  APPROVED: "Approved",
  PAID: "Paid",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
};

export const STATUS_COLORS = {
  [CLAIM_STATUSES.DRAFT]: "#6C757D", // Xám
  [CLAIM_STATUSES.PENDING]: "#FFC107", // Vàng
  [CLAIM_STATUSES.APPROVED]: "#007BFF", // Xanh dương
  [CLAIM_STATUSES.PAID]: "#28A745", // Xanh lá
  [CLAIM_STATUSES.REJECTED]: "#DC3545", // Đỏ
  [CLAIM_STATUSES.CANCELLED]: "#6F42C1", // Tím
  default: "#28A745",
};

export const DEPARTMENTS = [
  { text: "IT", value: "IT" },
  { text: "HR", value: "HR" },
  { text: "Finance", value: "Finance" },
  { text: "Marketing", value: "Marketing" },
  { text: "Sales", value: "Sales" },
  { text: "Operations", value: "Operations" },
  { text: "Sports", value: "Sports" },
  { text: "Security", value: "Security" },
  { text: "Entertainment", value: "Entertainment" },
  { text: "Retail", value: "Retail" },
  { text: "R&D", value: "R&D" },
  { text: "Publishing", value: "Publishing" },
  { text: "Management", value: "Management" },
];

export const JOD_RANKS = [
  { text: "Senior Developer", value: "Senior Developer" },
  { text: "HR Manager", value: "HR Manager" },
  { text: "Accountant", value: "Accountant" },
  { text: "Marketing Specialist", value: "Marketing Specialist" },
  { text: "Software Engineer", value: "Software Engineer" },
  { text: "Sales Manager", value: "Sales Manager" },
  { text: "Frontend Developer", value: "Frontend Developer" },
  { text: "Financial Analyst", value: "Financial Analyst" },
  { text: "SEO Specialist", value: "SEO Specialist" },
  { text: "Operations Manager", value: "Operations Manager" },
  { text: "Recruiter", value: "Recruiter" },
  { text: "Backend Developer", value: "Backend Developer" },
  { text: "Sales Executive", value: "Sales Executive" },
  { text: "Athlete", value: "Athlete" },
  { text: "Security Analyst", value: "Security Analyst" },
  { text: "Chief Security Officer", value: "Chief Security Officer" },
  { text: "UI/UX Designer", value: "UI/UX Designer" },
  { text: "Actor", value: "Actor" },
  { text: "Director", value: "Director" },
  { text: "Store Manager", value: "Store Manager" },
  { text: "Captain", value: "Captain" },
  { text: "Lead Engineer", value: "Lead Engineer" },
  { text: "HR Assistant", value: "HR Assistant" },
  { text: "Writer", value: "Writer" },
  { text: "Quantum Researcher", value: "Quantum Researcher" },
  { text: "Coach", value: "Coach" },
  { text: "Actress", value: "Actress" },
  { text: "Film Director", value: "Film Director" },
  { text: "Fullstack Developer", value: "Fullstack Developer" },
  { text: "CEO", value: "CEO" },
];
