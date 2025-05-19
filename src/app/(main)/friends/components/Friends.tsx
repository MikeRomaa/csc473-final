"use client";
import React, { useState } from "react";
import FriendsList, { Friend } from "../components/FriendsList";
import SearchFriends from "../components/SearchFriends";

export default function Friends() {
  const [searchTerm, setSearchTerm] = useState('');

  // hard-coded test data
  const friendsData: Friend[] = [
    { id: "1", name: "Olu Kukoyi" },
    { id: "2", name: "Michael Romashov" },
    { id: "3", name: "Mansij Mishra" },
  ];

  const filtered = friendsData.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
  };

  return (
    <div className="w-full min-h-screen p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-black mb-4">Friends</h2>
        <FriendsList
          friends={filtered}
          onViewProfile={(id) => console.log("view", id)}
          onMessage={(id) => console.log("message", id)}
          onRemoveFriend={(id) => console.log("remove", id)}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-black">Add Friends</h2>
        <SearchFriends value={searchTerm} onChange={setSearchTerm} onSearch={handleSearch} />
      </div>
    </div>
  );
}
