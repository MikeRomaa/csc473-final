import React from "react";
import { Search, ArrowRight } from "lucide-react";
import FriendRequest from "./FriendRequest";

type SearchFriendsProps = {
  value: string;
  onChange: (value: string) => void;
  changeStyling: boolean;
};

export default function SearchFriends({
  value,
  onChange,
  changeStyling,
}: SearchFriendsProps) {
  return (
    <div
      className={`w-full bg-white border border-black p-3 ${
        changeStyling ? "border-b-0" : "border-b-2"
      }`}
    >
      <div className="bg-gray-100 rounded-full flex items-center px-4 py-2 shadow-sm">
        <Search className="mr-2 text-gray-800" />
        <input
          type="text"
          className="flex-grow bg-transparent outline-none placeholder-gray-500 text-gray-800"
          placeholder="Search friends.."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {/* <button onClick={onSearch}>
          <ArrowRight className="text-gray-800" />
        </button> */}
      </div>
    </div>
  );
}
