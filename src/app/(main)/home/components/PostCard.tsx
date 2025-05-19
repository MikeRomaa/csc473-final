"use client";
import React, { useState } from "react";
import { User, Send } from "lucide-react";

export interface CourseOption {
  id: string;
  label: string;
}

export interface PostCardProps {
  courses: CourseOption[];
  selectedCourseId?: string;
  onCourseChange?: (courseId: string) => void;
  onSubmit: (text: string, courseId: string) => void;
}

export default function PostCard({
  courses,
  selectedCourseId,
  onCourseChange,
  onSubmit,
}: PostCardProps) {
  const [text, setText] = useState("");
  
  const handlePost = () => {
    if (onSubmit) onSubmit(text, selectedCourseId || "");
    setText("");
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <User className="w-10 h-10 text-black" />
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          type="text"
          placeholder="Post a question to your network…"
          className="flex-grow ml-4 px-4 py-2 border border-gray-700 text-gray-800 rounded-full focus:outline-none"
        />
      </div>

      <div className="flex justify-between items-center">
        <select
          value={selectedCourseId}
          onChange={e => onCourseChange?.(e.target.value)}
          className="px-4 py-2 border border-black bg-purple-500 rounded-full text-white"
        >
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        <button
          onClick={handlePost}
          className="bg-purple-500 text-white px-4 py-2 rounded-full"
        >
          Post
        </button>
      </div>
    </div>
  )
}