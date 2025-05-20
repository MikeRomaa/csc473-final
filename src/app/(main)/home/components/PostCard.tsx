// components/PostCard.tsx
"use client";

import React from "react";
import { User } from "lucide-react";

export interface CourseOption { id: string; label: string; }

export interface PostCardProps {
  courses: CourseOption[];
  action: (formData: FormData) => Promise<void>;
}

export default function PostCard({ courses, action }: PostCardProps) {
  return (
    <form action={action} method="post" className="bg-white rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <User className="w-10 h-10 text-black" />
        <input
          name="text"
          type="text"
          placeholder="Post a question to your network…"
          className="flex-grow ml-4 px-4 py-2 border border-gray-700 text-gray-800 rounded-full focus:outline-none"
        />
      </div>
      <div className="flex justify-between items-center">
        <select name="courseId" className="px-4 py-2 border border-black bg-purple-700 hover:bg-purple-900 rounded-full text-white">
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-900 text-white px-4 py-2 rounded-full"
        >
          Post
        </button>
      </div>
    </form>
  );
}
