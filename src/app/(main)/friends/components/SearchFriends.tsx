import React from "react";

interface SearchFriendsProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchFriends: React.FC<SearchFriendsProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <input
        type="text"
        placeholder="Search friends..."
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-full bg-gray-200 placeholder-gray-500 text-gray-800 focus:outline-none"
      />
    </div>
  );
};

export default SearchFriends;
