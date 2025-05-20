"use client";
import React from "react";
import { FileText, Code as CodeIcon } from "lucide-react";

export interface ResourceItem {
  id: string;
  title: string;
  type: "file" | "code";
  url: string;
}

export interface ResourcesProps {
  resources: ResourceItem[];
  onViewAll: () => void;
}

export default function Resources({ resources, onViewAll }: ResourcesProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-black">Resources</h2>
      <ul className="space-y-3 mb-4">
        {resources.map(r => (
          <li key={r.id} className="flex items-center space-x-3">
            {r.type === "code" ? (
              <CodeIcon className="w-5 h-5 text-gray-800" />
            ) : (
              <FileText className="w-5 h-5 text-gray-800" />
            )}
            <a href={r.url} className="hover:underline text-gray-600">
              {r.title}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={onViewAll}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        View All
      </button>
    </div>
  )
}