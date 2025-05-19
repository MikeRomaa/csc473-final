import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

type SearchCoursesProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export default function SearchCourses({ value, onChange, onSearch }: SearchCoursesProps) {
  return (
    <div className="w-full bg-white rounded-lg p-3">
      <div className="bg-gray-100 rounded-full flex items-center px-4 py-2 shadow-sm">
        <Search className="mr-2 text-gray-800" />
        <input
          type="text"
          className="flex-grow bg-transparent outline-none placeholder-gray-500 text-gray-800"
          placeholder="Search courses"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button onClick={onSearch}>
          <ArrowRight className="text-gray-800" />
        </button>
      </div>
    </div>
  );
}