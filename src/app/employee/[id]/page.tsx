'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Employee, User, Feedback } from '@/types';
import { transformUserToEmployee, getPerformanceBadgeVariant, getPerformanceLabel, formatDate } from '@/lib/utils';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import StarRating from '@/components/ui/StarRating';
import {
  ArrowLeftIcon,
  BookmarkIcon as BookmarkSolidIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/solid';
import {
  BookmarkIcon as BookmarkOutlineIcon
} from '@heroicons/react/24/outline';

export default function EmployeeDetails() {
  const params = useParams();
  const router = useRouter();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);
  
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newFeedback, setNewFeedback] = useState({
    from: '',
    comment: '',
    rating: 5
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/users/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Employee not found');
        }
        
        const userData: User = await response.json();
        const transformedEmployee = transformUserToEmployee(userData);
        
        setEmployee(transformedEmployee);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEmployee();
    }
  }, [params.id]);

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

  const handleBookmark = () => {
    if (employee) {
      if (isBookmarked(employee.id)) {
        removeBookmark(employee.id);
      } else {
        addBookmark(employee.id);
      }
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee || !newFeedback.from.trim() || !newFeedback.comment.trim()) return;

    const feedback: Feedback = {
      id: `feedback-${Date.now()}`,
      from: newFeedback.from,
      comment: newFeedback.comment,
      rating: newFeedback.rating,
      date: new Date().toISOString().split('T')[0]
    };

    setEmployee(prev => prev ? {
      ...prev,
      feedback: [...(prev.feedback || []), feedback]
    } : null);

    setNewFeedback({ from: '', comment: '', rating: 5 });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded mb-6"></div>
          <div className="h-96 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="text-red-500 text-lg font-medium mb-2">
            {error || 'Employee not found'}
          </div>
          <Button onClick={() => router.push('/')} variant="primary">
            Back to Dashboard
          </Button>
        </div>
      </Card>
    );
  }

  const overviewTab = (
    <div className="space-y-6">
      {/* Bio */}
      <Card>
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
          About
        </h3>
        <p className="text-secondary-600 dark:text-secondary-400">
          {employee.bio}
        </p>
      </Card>

      {/* Performance History */}
      <Card>
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
          Performance History
        </h3>
        <div className="space-y-4">
          {employee.performanceHistory?.map((record, index) => (
            <div key={index} className="border-l-4 border-primary-500 pl-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-secondary-900 dark:text-white">
                  {record.quarter}
                </h4>
                <StarRating rating={record.rating} size="sm" />
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400 space-y-1">
                <div>
                  <span className="font-medium">Goals:</span> {record.goals.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Achievements:</span> {record.achievements.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const projectsTab = (
    <div className="space-y-4">
      {employee.projects?.map((project) => (
        <Card key={project.id}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                {project.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                <span>Role: {project.role}</span>
                <span>•</span>
                <span>Started: {formatDate(project.startDate)}</span>
                {project.endDate && (
                  <>
                    <span>•</span>
                    <span>End: {formatDate(project.endDate)}</span>
                  </>
                )}
              </div>
            </div>
            <Badge
              variant={
                project.status === 'active' ? 'success' :
                project.status === 'completed' ? 'primary' : 'warning'
              }
            >
              {project.status}
            </Badge>
          </div>
        </Card>
      ))}
      
      {(!employee.projects || employee.projects.length === 0) && (
        <Card>
          <div className="text-center py-8 text-secondary-500 dark:text-secondary-400">
            No projects assigned
          </div>
        </Card>
      )}
    </div>
  );

  const feedbackTab = (
    <div className="space-y-6">
      {/* Add Feedback Form */}
      <Card>
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
          Add Feedback
        </h3>
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={newFeedback.from}
              onChange={(e) => setNewFeedback(prev => ({ ...prev, from: e.target.value }))}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Rating
            </label>
            <StarRating
              rating={newFeedback.rating}
              interactive
              onRatingChange={(rating) => setNewFeedback(prev => ({ ...prev, rating }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Comment
            </label>
            <textarea
              value={newFeedback.comment}
              onChange={(e) => setNewFeedback(prev => ({ ...prev, comment: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          <Button type="submit" variant="primary">
            Submit Feedback
          </Button>
        </form>
      </Card>

      {/* Existing Feedback */}
      <div className="space-y-4">
        {employee.feedback?.map((feedback) => (
          <Card key={feedback.id}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-secondary-900 dark:text-white">
                  {feedback.from}
                </h4>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                  {formatDate(feedback.date)}
                </p>
              </div>
              <StarRating rating={feedback.rating} size="sm" />
            </div>
            <p className="text-secondary-600 dark:text-secondary-400">
              {feedback.comment}
            </p>
          </Card>
        ))}
        
        {(!employee.feedback || employee.feedback.length === 0) && (
          <Card>
            <div className="text-center py-8 text-secondary-500 dark:text-secondary-400">
              No feedback yet
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="flex items-center"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <Button
          variant="ghost"
          onClick={handleBookmark}
          className={isBookmarked(employee.id) ? 'text-yellow-600 hover:text-yellow-700' : ''}
        >
          {isBookmarked(employee.id) ? (
            <BookmarkSolidIcon className="h-5 w-5" />
          ) : (
            <BookmarkOutlineIcon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Employee Profile */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <div className="relative h-32 w-32 rounded-full overflow-hidden bg-secondary-200 dark:bg-secondary-700 flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          
          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
              {employee.firstName} {employee.lastName}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 mb-4">
              <div className="flex items-center justify-center md:justify-start">
                <EnvelopeIcon className="h-4 w-4 mr-2 text-secondary-500" />
                <span className="text-secondary-600 dark:text-secondary-400">{employee.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <PhoneIcon className="h-4 w-4 mr-2 text-secondary-500" />
                <span className="text-secondary-600 dark:text-secondary-400">{employee.phone}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <MapPinIcon className="h-4 w-4 mr-2 text-secondary-500" />
                <span className="text-secondary-600 dark:text-secondary-400">
                  {employee.address.city}, {employee.address.state}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="text-sm text-secondary-500 dark:text-secondary-400">Department:</span>
                <Badge variant="secondary">{employee.department}</Badge>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="text-sm text-secondary-500 dark:text-secondary-400">Performance:</span>
                <Badge variant={getPerformanceBadgeVariant(employee.performanceRating)}>
                  {getPerformanceLabel(employee.performanceRating)}
                </Badge>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <StarRating rating={employee.performanceRating} showValue />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabbed Content */}
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview', content: overviewTab },
          { id: 'projects', label: 'Projects', content: projectsTab },
          { id: 'feedback', label: 'Feedback', content: feedbackTab }
        ]}
        defaultTab="overview"
      />
    </div>
  );
}
