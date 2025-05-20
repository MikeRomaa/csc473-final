"use client";

import React, { useState } from "react";
import { FileText, Code as CodeIcon, Presentation } from "lucide-react";
import ResourcesModal from "./ResourcesModal";

export interface ResourceItem {
  id:           string;
  title:        string;
  resourceType: "document" | "presentation" | "code";
  url:          string;
}

export interface ResourcesProps {
  resources: ResourceItem[];

  enrolledCourses: { id: string; code: string; title: string }[];
  initialCourse:   { id: string; code: string; title: string };
}

export default function Resources({
  resources,
  enrolledCourses,
  initialCourse,
}: ResourcesProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-black">Resources</h2>
        <ul className="space-y-3 mb-4">
          {resources.map((r) => {
            const Icon =
              r.resourceType === "code" ? (
                <CodeIcon className="w-5 h-5 text-gray-800" />
              ) : r.resourceType === "presentation" ? (
                <Presentation className="w-5 h-5 text-gray-800" />
              ) : (
                <FileText className="w-5 h-5 text-gray-800" />
              );
            return (
              <li key={r.id} className="flex items-center space-x-3">
                {Icon}
                <a href={r.url} className="hover:underline text-gray-600">
                  {r.title}
                </a>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-700 hover:bg-green-900 text-white w-full py-2 rounded"
        >
          View All
        </button>
      </div>

      <ResourcesModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        enrolledCourses={enrolledCourses}
        initialCourse={initialCourse}
        resources={resources}
      />
    </>
  );
}
