"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Code as CodeIcon,
  Presentation,
  Download,
  X,
  ChevronDown,
} from "lucide-react";
import { ResourceItem } from "./Resources";
import { uploadResourceAction } from "../actions_resources";

export type ResourcesModalProps = {
  isOpen:            boolean;
  onClose:           () => void;

  enrolledCourses:   { id: string; code: string; title: string }[];
  initialCourse:     { id: string; code: string; title: string };
  resources:         ResourceItem[];
};

export default function ResourcesModal({
  isOpen,
  onClose,
  enrolledCourses,
  initialCourse,
  resources,
}: ResourcesModalProps) {
  const [selectedCourseId, setSelectedCourseId]           = useState(initialCourse.id);
  const [selectedCourseCode, setSelectedCourseCode]       = useState(initialCourse.code);
  const [selectedCourseTitle, setSelectedCourseTitle]     = useState(initialCourse.title);
  const [isDropdownOpen, setDropdownOpen]                 = useState(true);

  useEffect(() => {
    const sel = enrolledCourses.find(c => c.id === selectedCourseId);
    if (sel) {
      setSelectedCourseCode(sel.code);
      setSelectedCourseTitle(sel.title);
    }
  }, [selectedCourseId, enrolledCourses]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="bg-white rounded-xl w-11/12 max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl text-black font-bold">
              {selectedCourseCode}
            </h2>
            <h3 className="text-xl text-black">
              {selectedCourseTitle}
            </h3>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center bg-purple-700 hover:bg-purple-900 text-white px-4 py-1 rounded-full"
            >
              Course <ChevronDown className="w-4 h-4 ml-2" />
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 text-gray-800 bg-white border rounded shadow-lg">
                {enrolledCourses.map((c) => (
                  <li key={c.id}>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCourseId(c.id);
                        setDropdownOpen(false);
                      }}
                    >
                      {c.code}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-200 mb-6 max-h-80 overflow-y-auto">
          {resources.map((r) => {
            const Icon =
              r.resourceType === "code" ? (
                <CodeIcon className="w-6 h-6 text-gray-800" />
              ) : r.resourceType === "presentation" ? (
                <Presentation className="w-6 h-6 text-gray-800" />
              ) : (
                <FileText className="w-6 h-6 text-gray-800" />
              );
            return (
              <div key={r.id} className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-3">
                  {Icon}
                  <span className="text-gray-900">{r.title}</span>
                </div>
                <a
                  href={r.url}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <Download className="w-6 h-6 hover:bg-gray-300" />
                </a>
              </div>
            );
          })}
        </div>

        <form action={uploadResourceAction}>
          <input type="hidden" name="courseId" value={selectedCourseId} />
          <input type="file" name="file" required className="block w-full mb-2" />
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-900 text-white w-full py-2 rounded-full"
          >
            Upload Resources
          </button>
        </form>
      </div>
    </div>
  );
}
