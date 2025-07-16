import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Employee, User, Project, Feedback, PerformanceRecord } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Department options for random assignment
const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Sales',
  'Marketing',
  'Finance',
  'Operations',
  'Customer Support',
  'Product Management',
  'Design',
  'Legal'
];

// Generate random department
export function getRandomDepartment(): string {
  return DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
}

// Generate random performance rating (1-5)
export function getRandomRating(): number {
  return Math.floor(Math.random() * 5) + 1;
}

// Generate random bio
export function generateBio(firstName: string, lastName: string, department: string): string {
  const bios = [
    `${firstName} ${lastName} is a dedicated professional in the ${department} department with a passion for excellence and innovation.`,
    `With years of experience in ${department}, ${firstName} brings valuable expertise and leadership to our team.`,
    `${firstName} is known for their collaborative approach and commitment to delivering high-quality results in ${department}.`,
    `A results-driven professional, ${firstName} ${lastName} consistently exceeds expectations in their role within ${department}.`,
    `${firstName} combines technical expertise with strong communication skills, making them a valuable asset to the ${department} team.`
  ];
  return bios[Math.floor(Math.random() * bios.length)];
}

// Generate mock projects
export function generateProjects(): Project[] {
  const projectNames = [
    'Customer Portal Redesign',
    'Mobile App Development',
    'Data Analytics Platform',
    'Security Audit',
    'Performance Optimization',
    'User Experience Research',
    'API Integration',
    'Cloud Migration',
    'Automation Framework',
    'Quality Assurance'
  ];

  const roles = ['Lead Developer', 'Project Manager', 'Designer', 'Analyst', 'Consultant', 'Coordinator'];
  const statuses: ('active' | 'completed' | 'on-hold')[] = ['active', 'completed', 'on-hold'];

  const numProjects = Math.floor(Math.random() * 4) + 1; // 1-4 projects
  const projects: Project[] = [];

  for (let i = 0; i < numProjects; i++) {
    projects.push({
      id: `proj-${Math.random().toString(36).substr(2, 9)}`,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      startDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined
    });
  }

  return projects;
}

// Generate mock feedback
export function generateFeedback(): Feedback[] {
  const feedbackComments = [
    'Excellent work on the recent project. Great attention to detail.',
    'Shows strong leadership skills and helps team members grow.',
    'Consistently delivers high-quality work on time.',
    'Great communication skills and collaborative approach.',
    'Innovative thinking and problem-solving abilities.',
    'Reliable team player who goes above and beyond.',
    'Strong technical skills and willingness to learn.',
    'Positive attitude and great work ethic.'
  ];

  const names = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Brown', 'David Wilson', 'Lisa Garcia'];

  const numFeedback = Math.floor(Math.random() * 3) + 1; // 1-3 feedback items
  const feedback: Feedback[] = [];

  for (let i = 0; i < numFeedback; i++) {
    feedback.push({
      id: `feedback-${Math.random().toString(36).substr(2, 9)}`,
      from: names[Math.floor(Math.random() * names.length)],
      comment: feedbackComments[Math.floor(Math.random() * feedbackComments.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }

  return feedback;
}

// Generate performance history
export function generatePerformanceHistory(): PerformanceRecord[] {
  const quarters = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2023'];
  const goals = [
    'Improve code quality',
    'Enhance team collaboration',
    'Complete certification',
    'Mentor junior developers',
    'Optimize system performance',
    'Implement new features'
  ];
  const achievements = [
    'Reduced bug count by 30%',
    'Led successful project delivery',
    'Improved team productivity',
    'Implemented new process',
    'Received client commendation',
    'Completed training program'
  ];

  return quarters.map(quarter => ({
    quarter,
    rating: Math.floor(Math.random() * 5) + 1,
    goals: goals.slice(0, Math.floor(Math.random() * 3) + 1),
    achievements: achievements.slice(0, Math.floor(Math.random() * 3) + 1)
  }));
}

// Transform User to Employee with additional HR data
export function transformUserToEmployee(user: User): Employee {
  const department = getRandomDepartment();
  const performanceRating = getRandomRating();

  return {
    ...user,
    department,
    performanceRating,
    bio: generateBio(user.firstName, user.lastName, department),
    projects: generateProjects(),
    feedback: generateFeedback(),
    performanceHistory: generatePerformanceHistory()
  };
}

// Get performance badge variant based on rating
export function getPerformanceBadgeVariant(rating: number): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' {
  if (rating >= 5) return 'success';
  if (rating >= 4) return 'primary';
  if (rating >= 3) return 'warning';
  if (rating >= 2) return 'secondary';
  return 'danger';
}

// Get performance label based on rating
export function getPerformanceLabel(rating: number): string {
  if (rating >= 5) return 'Outstanding';
  if (rating >= 4) return 'Excellent';
  if (rating >= 3) return 'Good';
  if (rating >= 2) return 'Fair';
  return 'Needs Improvement';
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Debounce function for search
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Calculate department statistics
export function calculateDepartmentStats(employees: Employee[]) {
  const departmentMap = new Map<string, { totalRating: number; count: number }>();

  employees.forEach(employee => {
    const current = departmentMap.get(employee.department) || { totalRating: 0, count: 0 };
    departmentMap.set(employee.department, {
      totalRating: current.totalRating + employee.performanceRating,
      count: current.count + 1
    });
  });

  return Array.from(departmentMap.entries()).map(([department, stats]) => ({
    department,
    averageRating: stats.totalRating / stats.count,
    employeeCount: stats.count
  }));
}
