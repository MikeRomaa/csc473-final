// components/CourseList.tsx
import React, { useState } from 'react';
import { User } from 'lucide-react';
import CourseModal, { EnrolledUser } from './CourseModal';

export type CourseListProps = {
  courseId: string;
  courseTitle: string;
  description: string;
  totalEnrolled: number;
  friendsEnrolled?: number;
  enrolled: boolean;
  enrolledUsers: EnrolledUser[];
};

export default function CourseList({
  courseId,
  courseTitle,
  description,
  totalEnrolled,
  friendsEnrolled = 0,
  enrolled,
  enrolledUsers,
}: CourseListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div
        onClick={openModal}
        className="relative flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm cursor-pointer hover:shadow-md transition"
      >
        <span className="text-lg font-semibold text-black z-10">
          {courseId}
        </span>

        {friendsEnrolled > 0 && (
          <span className="absolute left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-sm">
            {friendsEnrolled} friend{friendsEnrolled > 1 ? 's' : ''} enrolled
          </span>
        )}

        <div className="flex items-center space-x-1 z-10">
          <User className="w-6 h-6 text-gray-800" />
          <span className="text-gray-700">{totalEnrolled}</span>
        </div>
      </div>

      <CourseModal
        isOpen={isOpen}
        onClose={closeModal}
        courseId={courseId}
        courseTitle={courseTitle}
        description={description}
        totalEnrolled={totalEnrolled}
        friendsEnrolled={friendsEnrolled}
        enrolled={enrolled}
        enrolledUsers={enrolledUsers}
      />
    </>
  );
}