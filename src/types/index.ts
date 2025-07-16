// User types from DummyJSON API
export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

// Extended types for our HR dashboard
export interface Employee extends User {
  department: string;
  performanceRating: number;
  bio?: string;
  projects?: Project[];
  feedback?: Feedback[];
  performanceHistory?: PerformanceRecord[];
}

export interface Project {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate?: string;
}

export interface Feedback {
  id: string;
  from: string;
  comment: string;
  rating: number;
  date: string;
}

export interface PerformanceRecord {
  quarter: string;
  rating: number;
  goals: string[];
  achievements: string[];
}

// Filter and search types
export interface SearchFilters {
  query: string;
  departments: string[];
  minRating: number;
  maxRating: number;
}

// Chart data types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface DepartmentStats {
  department: string;
  averageRating: number;
  employeeCount: number;
}

export interface BookmarkTrend {
  month: string;
  count: number;
}

// Component prop types
export interface UserCardProps {
  employee: Employee;
  onView: (id: number) => void;
  onBookmark: (id: number) => void;
  onPromote: (id: number) => void;
  isBookmarked: boolean;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface TabsProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
  defaultTab?: string;
  className?: string;
}

// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Bookmark context types
export interface BookmarkContextType {
  bookmarks: number[];
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}
