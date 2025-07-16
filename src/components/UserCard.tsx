'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserCardProps } from '@/types';
import { getPerformanceBadgeVariant, getPerformanceLabel, cn } from '@/lib/utils';
// import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';
import Modal from '@/components/ui/Modal';
import {
  EyeIcon,
  BookmarkIcon as BookmarkSolidIcon,
  ArrowUpIcon
} from '@heroicons/react/24/solid';
import {
  BookmarkIcon as BookmarkOutlineIcon
} from '@heroicons/react/24/outline';

const UserCard: React.FC<UserCardProps> = ({
  employee,
  onBookmark,
  onPromote,
  isBookmarked
}) => {
  const router = useRouter();
  const [showPromoteModal, setShowPromoteModal] = useState(false);

  const handleView = () => {
    router.push(`/employee/${employee.id}`);
  };

  const handleBookmark = () => {
    onBookmark(employee.id);
  };

  const handlePromote = () => {
    setShowPromoteModal(true);
  };

  const confirmPromote = () => {
    onPromote(employee.id);
    setShowPromoteModal(false);
  };

  return (
    <>
      <motion.div
        className="glass-card p-6 rounded-3xl group relative overflow-hidden"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          y: -8,
          scale: 1.02,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500"></div>

        <div className="flex flex-col h-full relative z-10">
          {/* Bookmark Button */}
          <motion.button
            onClick={handleBookmark}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "absolute top-4 right-4 z-20 p-3 rounded-2xl shadow-lg",
              isBookmarked
                ? "bg-gradient-warning text-white animate-glow"
                : "glass text-gray-300 hover:bg-gradient-warning hover:text-white"
            )}
          >
            {isBookmarked ? (
              <BookmarkSolidIcon className="h-5 w-5" />
            ) : (
              <BookmarkOutlineIcon className="h-5 w-5" />
            )}
          </motion.button>

          {/* Premium Profile Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={employee.image}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-success rounded-full border-4 border-white/20 flex items-center justify-center animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-premium mb-2">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-gray-400 font-medium mb-1 text-sm">
                {employee.email}
              </p>
              <div className="flex items-center justify-center space-x-3 mb-3">
                <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full font-medium">
                  Age: {employee.age}
                </span>
                <Badge variant="secondary" size="sm" className="bg-gradient-primary text-white border-0 font-bold">
                  {employee.department}
                </Badge>
              </div>
            </div>
          </div>

          {/* Premium Performance Metrics */}
          <div className="space-y-4 mb-6">
            <div className="glass p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                  Performance Rating
                </span>
                <Badge
                  variant={getPerformanceBadgeVariant(employee.performanceRating)}
                  size="sm"
                  className="shadow-lg font-bold"
                >
                  {getPerformanceLabel(employee.performanceRating)}
                </Badge>
              </div>
              <div className="bg-gradient-to-r from-white/5 to-white/10 p-4 rounded-xl border border-white/10">
                <StarRating rating={employee.performanceRating} showValue />
              </div>
            </div>
          </div>

          {/* Premium Action Buttons */}
          <div className="flex space-x-3 mt-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleView}
              className="flex-1 glass border-white/20 text-gray-300 hover:text-white hover:bg-white/10 rounded-2xl py-3 font-semibold transition-all duration-300"
            >
              <EyeIcon className="h-4 w-4 mr-2" />
              View Profile
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handlePromote}
              className="flex-1 bg-gradient-success hover:shadow-2xl rounded-2xl py-3 font-semibold transition-all duration-300 hover:scale-105"
            >
              <ArrowUpIcon className="h-4 w-4 mr-2" />
              Promote
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Promote Modal */}
      <Modal
        isOpen={showPromoteModal}
        onClose={() => setShowPromoteModal(false)}
        title="Promote Employee"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to promote{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {employee.firstName} {employee.lastName}
            </span>
            ?
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Current Details:
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li className="flex items-center">
                <span className="font-medium text-blue-600 dark:text-blue-400 w-20">Department:</span>
                <span className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-lg text-blue-800 dark:text-blue-200">{employee.department}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium text-purple-600 dark:text-purple-400 w-20">Rating:</span>
                <span className="bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded-lg text-purple-800 dark:text-purple-200">{employee.performanceRating}/5</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium text-green-600 dark:text-green-400 w-20">Email:</span>
                <span className="bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded-lg text-green-800 dark:text-green-200 text-xs">{employee.email}</span>
              </li>
            </ul>
          </div>
          
          <div className="flex space-x-3 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <Button
              variant="outline"
              onClick={() => setShowPromoteModal(false)}
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={confirmPromote}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              Confirm Promotion
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserCard;
