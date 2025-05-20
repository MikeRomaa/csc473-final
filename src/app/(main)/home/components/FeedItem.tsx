"use client";
import React, { useState } from "react";
import { User, Send } from "lucide-react";

export interface Reply {
  id: string;
  name: string;
  content: string;
}

export interface FeedItemProps {
  id: string;
  name: string;
  course: string;
  content: string;
  replies?: Reply[];
  onRespond?: (id: string, response: string) => void;
}

export default function FeedItem({ id, name, course, content, replies = [], onRespond }: FeedItemProps) {
  const [reply, setReply] = useState<string>("");

  const sendReply = () => {
    const trimmed = reply.trim();
    if (!trimmed) return;

    onRespond?.(id, trimmed);
    setReply("");
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex items-center mb-2">
        <User className="w-10 h-10 text-black" />
        <span className="ml-4 font-medium text-black">{name}</span>
        <span className="ml-4 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
          {course}
        </span>
      </div>

      <p className="mb-4 text-gray-700">{content}</p>

      <div className="flex items-center">
        <input
          value={reply}
          onChange={e => setReply(e.target.value)}
          type="text"
          placeholder={`Respond to ${name}`}
          className="flex-grow px-4 py-2 border border-gray-800 text-gray-700 rounded-full focus:outline-none"
        />
        <button onClick={sendReply} className="ml-2">
          <Send className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      {replies.length > 0 && (
        <div className="mt-4">
          {replies.map(r => (
            <div key={r.id} className="flex items-start mb-2 ml-12">
              <User className="w-6 h-6 text-black" />
              <div className="ml-2">
                <span className="block font-medium text-black text-sm">{r.name}</span>
                <p className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
                  {r.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}