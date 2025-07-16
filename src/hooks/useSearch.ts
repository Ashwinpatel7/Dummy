import { useState, useMemo } from 'react';
import { Employee, SearchFilters } from '@/types';

export const useSearch = (employees: Employee[]) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    departments: [],
    minRating: 0,
    maxRating: 5
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // Text search
      const matchesQuery = filters.query === '' || 
        employee.firstName.toLowerCase().includes(filters.query.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(filters.query.toLowerCase()) ||
        employee.email.toLowerCase().includes(filters.query.toLowerCase()) ||
        employee.department.toLowerCase().includes(filters.query.toLowerCase());

      // Department filter
      const matchesDepartment = filters.departments.length === 0 || 
        filters.departments.includes(employee.department);

      // Rating filter
      const matchesRating = employee.performanceRating >= filters.minRating && 
        employee.performanceRating <= filters.maxRating;

      return matchesQuery && matchesDepartment && matchesRating;
    });
  }, [employees, filters]);

  const updateQuery = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
  };

  const updateDepartments = (departments: string[]) => {
    setFilters(prev => ({ ...prev, departments }));
  };

  const updateRatingRange = (minRating: number, maxRating: number) => {
    setFilters(prev => ({ ...prev, minRating, maxRating }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      departments: [],
      minRating: 0,
      maxRating: 5
    });
  };

  const availableDepartments = useMemo(() => {
    const departments = new Set(employees.map(emp => emp.department));
    return Array.from(departments).sort();
  }, [employees]);

  return {
    filters,
    filteredEmployees,
    updateQuery,
    updateDepartments,
    updateRatingRange,
    clearFilters,
    availableDepartments
  };
};
