"use client";

import React from "react";
import { User, Send } from "lucide-react";
import type { Reply, Post } from "@/db/posts";

export interface FeedItemProps {
  post: Post;
  action: (formData: FormData) => Promise<void>;
}

export default function FeedItem({ post, action }: FeedItemProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex items-center mb-2">
        <User className="w-10 h-10 text-black" />
        <span className="ml-4 font-medium text-black">{post.authorName}</span>
        <span className="ml-4 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
          {post.courseCode}
        </span>
      </div>

      <p className="mb-4 text-gray-700">{post.post}</p>

      <form action={action} className="flex items-center">
        <input type="hidden" name="postId" value={post.id} />
        <input
          name="content"
          type="text"
          placeholder={`Respond to ${post.authorName}`}
          className="flex-grow px-4 py-2 border border-gray-800 text-gray-700 rounded-full focus:outline-none"
        />
        <button type="submit" className="ml-2">
          <Send className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>
      </form>

      {post.replies.length > 0 && (
        <div className="mt-4">
          {post.replies.map((r: Reply) => (
            <div key={r.id} className="flex items-start mb-2 ml-12">
              <User className="w-6 h-6 text-black" />
              <div className="ml-2">
                <span className="block font-medium text-black text-sm">
                  {r.name}
                </span>
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
