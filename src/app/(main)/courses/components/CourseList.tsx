import React from 'react';
import { User } from 'lucide-react';

type CourseListProps = {
  title: string;
  totalEnrolled: number;
  friendsEnrolled?: number;
};

export default function CourseList({ title, totalEnrolled, friendsEnrolled = 0 }: CourseListProps) {
  return (
    <div className="relative flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm">
      <span className="text-lg font-semibold text-black z-10">{title}</span>

      {friendsEnrolled > 0 && (
        <span className="absolute left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-sm">
          {friendsEnrolled} friend{friendsEnrolled > 1 ? 's' : ''} enrolled
        </span>
      )}

      <div className="flex items-center space-x-1 z-10">
        <User className="w-8 h-8 text-gray-800" />
        <span className="text-gray-700">{totalEnrolled}</span>
      </div>
    </div>
  );
}