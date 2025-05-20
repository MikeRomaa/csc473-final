import { Search } from "lucide-react";
import React from "react";

type SearchCoursesProps = {
    onChange: (value: string) => void;
};

export default function SearchCourses({ onChange }: SearchCoursesProps) {
    return (
        <div className="w-full bg-white rounded-lg p-3">
            <div className="bg-gray-100 rounded-full flex items-center px-4 py-2 shadow-sm">
                <Search className="mr-2 text-gray-800" />
                <input
                    type="text"
                    className="flex-grow bg-transparent outline-none placeholder-gray-500 text-gray-800"
                    placeholder="Search courses"
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
}
