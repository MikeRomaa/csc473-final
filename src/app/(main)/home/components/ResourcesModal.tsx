import React, { useState } from 'react';
import {
  FileText,
  Code as CodeIcon,
  Presentation,
  Download,
  X,
  ChevronDown,
} from 'lucide-react';
import { ResourceItem } from './Resources';

export type ResourcesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
  courses: string[];
  resources: ResourceItem[];
};

export default function ResourcesModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  courses,
  resources,
}: ResourcesModalProps) {
  const [selectedCourse, setSelectedCourse] = useState(courseId);
  const [isDropdownOpen, setDropdownOpen] = useState(true);

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
            <h2 className="text-2xl text-black font-bold">{selectedCourse}</h2>
            <h3 className="text-xl text-black">{courseTitle}</h3>
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
                {courses.map((c) => (
                  <li key={c}>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCourse(c);
                        setDropdownOpen(false);
                      }}
                    >
                      {c}
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
              r.resourceType === 'code' ? (
                <CodeIcon className="w-6 h-6 text-gray-800" />
              ) : r.resourceType === 'presentation' ? (
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
                <a href={r.url} className="text-gray-700 hover:text-gray-900">
                  <Download className="w-6 h-6 hover:bg-gray-300" />
                </a>
              </div>
            );
          })}
        </div>

        <button className="bg-purple-700 hover:bg-purple-900 text-white w-full py-2 rounded-full">
          Upload Resources
        </button>
      </div>
    </div>
  );
}