"use client";
import React, { useRef } from "react";
import { User, ChevronLeft, ChevronRight } from "lucide-react";

export interface Friend { id: string; name: string; mutualCourses: number; avatarUrl?: string; }
export interface MutualFriendsProps { friends: Friend[]; onViewProfile: (id: string) => void; }

export default function MutualFriends({ friends, onViewProfile }: MutualFriendsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-black">Mutual Friends</h2>
      <div className="flex items-center">
        <button onClick={() => scroll('left')}><ChevronLeft className="w-6 h-6 text-gray-500" /></button>
        <div ref={scrollRef} className="flex space-x-4 overflow-x-auto px-2">
          {friends.map(f => (
            <div key={f.id} className="flex flex-col items-center min-w-[100px]">
              {f.avatarUrl ? <img src={f.avatarUrl} alt={f.name} className="w-16 h-16 rounded-full" /> : <User className="w-16 h-16 text-gray-800" />}
              <span className="font-medium mt-2 text-center text-sm text-gray-800">{f.name}</span>
              <button onClick={() => onViewProfile(f.id)} className="bg-purple-500 text-white px-2 py-1 rounded text-xs mt-1">View</button>
              <span className="text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full text-xs mt-1 text-center">{f.mutualCourses} mutual courses</span>
            </div>
          ))}
        </div>
        <button onClick={() => scroll('right')}><ChevronRight className="w-6 h-6 text-gray-500" /></button>
      </div>
    </div>
  )
}