'use client';
import React, { useState } from 'react';
import SearchCourses from './SearchCourses';
import CourseList from './CourseList';
import { EnrolledUser } from './CourseModal';

type Course = {
  id: string;
  title: string;
  totalEnrolled: number;
  friendsEnrolled?: number;
  description: string;
  enrolled: boolean;
  enrolledUsers: EnrolledUser[];
};

const testData: Course[] = [
  {
    id: 'Anth 20100',
    title: 'Cross-Cultural perspectives',
    totalEnrolled: 30,
    friendsEnrolled: 3
    ,
    description: 'This class provides a general overview of the field of socio-cultural anthropology. As this class is an excursion into the field of socio-cultural anthropology, our main goal will be to understand, complicate, and theorize “culture.” Students are expected to leave with a fuller understanding of socio-cultural anthropology, ethnographic method, and the complexities of cultural life. The main questions in this class will be: What is culture? How do cultural practices vary across social contexts? How can culture be multiple and contradictory? What does ethnographic method look like to study culture? Students will leave this class with a greater grasp of the “culture” concept and ethnographic methodologies. 3 hr./wk.; 3 cr.',
    enrolled: true,
    enrolledUsers: [
      { id: '1', name: 'Olu Kukoyi' },
      { id: '2', name: 'Michael Romashov' },
      { id: '3', name: 'Mansij Mishra' },
    ],
  },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = testData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {};

  return (
    <div className="h-screen p-4">
      <SearchCourses
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
      />

      <div className="mt-4 space-y-8">
        {filtered.map(course => (
          <CourseList
            key={course.id}
            courseId={course.id.toString()}
            courseTitle={course.title}
            description={course.description}
            totalEnrolled={course.totalEnrolled}
            friendsEnrolled={course.friendsEnrolled}
            enrolled={course.enrolled}
            enrolledUsers={course.enrolledUsers}
          />
        ))}
      </div>
    </div>
  );
}