'use client';
import React, { useState } from 'react';
import SearchCourses from './SearchCourses';
import CourseList from './CourseList';

type Course = {
  id: number;
  title: string;
  totalEnrolled: number;
  friendsEnrolled?: number;
};

const testData: Course[] = [
  { id: 1, title: 'Anth 20000', totalEnrolled: 25, friendsEnrolled: 1 },
  { id: 2, title: 'Anth 20100', totalEnrolled: 30, friendsEnrolled: 3 },
  { id: 3, title: 'Anth 20104', totalEnrolled: 15 },
  { id: 4, title: 'Anth 20200', totalEnrolled: 35 },
  { id: 5, title: 'Anth 20300', totalEnrolled: 12, friendsEnrolled: 1 },
  { id: 6, title: 'Anth 20400', totalEnrolled: 10 },
  { id: 7, title: 'Anth 20500', totalEnrolled: 22 },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = testData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
  };

  return (
    <div className="h-screen bg-blue-50 p-4">
      <SearchCourses value={searchTerm} onChange={setSearchTerm} onSearch={handleSearch} />
      <div className="mt-4 space-y-8">
        {filtered.map(course => (
          <CourseList
            key={course.id}
            title={course.title}
            totalEnrolled={course.totalEnrolled}
            friendsEnrolled={course.friendsEnrolled}
          />
        ))}
      </div>
    </div>
  );
}
