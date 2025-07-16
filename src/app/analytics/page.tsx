'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Employee, User, DepartmentStats, BookmarkTrend } from '@/types';
import { transformUserToEmployee, calculateDepartmentStats } from '@/lib/utils';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  // All hooks must be called at the top level - before any early returns
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { bookmarks } = useBookmarks();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/users?limit=20');
        
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        
        const data = await response.json();
        const transformedEmployees = data.users.map((user: User) => 
          transformUserToEmployee(user)
        );
        
        setEmployees(transformedEmployees);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Calculate department statistics
  const departmentStats: DepartmentStats[] = calculateDepartmentStats(employees);

  // Generate mock bookmark trends data
  const bookmarkTrends: BookmarkTrend[] = [
    { month: 'Jan', count: 2 },
    { month: 'Feb', count: 5 },
    { month: 'Mar', count: 8 },
    { month: 'Apr', count: 12 },
    { month: 'May', count: 15 },
    { month: 'Jun', count: bookmarks.length },
  ];

  // Chart configurations
  const departmentRatingChart = {
    labels: departmentStats.map(stat => stat.department),
    datasets: [
      {
        label: 'Average Performance Rating',
        data: departmentStats.map(stat => stat.averageRating),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(14, 165, 233, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const bookmarkTrendChart = {
    labels: bookmarkTrends.map(trend => trend.month),
    datasets: [
      {
        label: 'Bookmarks',
        data: bookmarkTrends.map(trend => trend.count),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const performanceDistribution = {
    labels: ['Outstanding (5)', 'Excellent (4)', 'Good (3)', 'Fair (2)', 'Poor (1)'],
    datasets: [
      {
        data: [
          employees.filter(emp => emp.performanceRating === 5).length,
          employees.filter(emp => emp.performanceRating === 4).length,
          employees.filter(emp => emp.performanceRating === 3).length,
          employees.filter(emp => emp.performanceRating === 2).length,
          employees.filter(emp => emp.performanceRating === 1).length,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-80 bg-secondary-200 dark:bg-secondary-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="text-red-500 text-lg font-medium mb-2">Error Loading Analytics</div>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Card>
    );
  }

  // Calculate summary statistics
  const totalEmployees = employees.length;
  const averageRating = employees.reduce((sum, emp) => sum + emp.performanceRating, 0) / totalEmployees;
  const topPerformers = employees.filter(emp => emp.performanceRating >= 4).length;
  const bookmarkRate = (bookmarks.length / totalEmployees) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Insights and metrics for your HR performance data
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {totalEmployees}
            </p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Total Employees
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {averageRating.toFixed(1)}
            </p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Average Rating
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {topPerformers}
            </p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Top Performers
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {bookmarkRate.toFixed(0)}%
            </p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Bookmark Rate
            </p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <Card>
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Department Performance
          </h3>
          <div className="h-80">
            <Bar data={departmentRatingChart} options={chartOptions} />
          </div>
        </Card>

        {/* Bookmark Trends */}
        <Card>
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Bookmark Trends
          </h3>
          <div className="h-80">
            <Line data={bookmarkTrendChart} options={lineChartOptions} />
          </div>
        </Card>

        {/* Performance Distribution */}
        <Card>
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Performance Distribution
          </h3>
          <div className="h-80">
            <Doughnut data={performanceDistribution} options={doughnutOptions} />
          </div>
        </Card>

        {/* Department Breakdown */}
        <Card>
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Department Breakdown
          </h3>
          <div className="space-y-4">
            {departmentStats.map((stat, index) => (
              <div key={stat.department} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3"
                    style={{ 
                      backgroundColor: departmentRatingChart.datasets[0].backgroundColor[index] 
                    }}
                  ></div>
                  <span className="text-sm font-medium text-secondary-900 dark:text-white">
                    {stat.department}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-secondary-900 dark:text-white">
                    {stat.averageRating.toFixed(1)} ⭐
                  </div>
                  <div className="text-xs text-secondary-500 dark:text-secondary-400">
                    {stat.employeeCount} employees
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
