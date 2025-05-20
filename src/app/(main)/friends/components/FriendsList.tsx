import React from "react";
import { User } from "lucide-react";

export interface Friend {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface FriendsListProps {
  friends: Friend[];
  onViewProfile: (id: string) => void;
  onMessage: (id: string) => void;
  onRemoveFriend: (id: string) => void;
}

const FriendsList: React.FC<FriendsListProps> = ({
  friends,
  onViewProfile,
  onMessage,
  onRemoveFriend,
}) => {
  return (
    <div className="space-y-4 w-full">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="bg-white rounded-lg p-4 flex items-center justify-between w-full"
        >
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-gray-800" />
            </div>
            <span className="ml-4 text-lg font-medium text-black">{friend.name}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onViewProfile(friend.id)}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-900 text-white rounded-full"
            >
              View Profile
            </button>
            <button
              onClick={() => onMessage(friend.id)}
              className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded-full"
            >
              Message
            </button>
            <button
              onClick={() => onRemoveFriend(friend.id)}
              className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-full"
            >
              Remove Friend
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
