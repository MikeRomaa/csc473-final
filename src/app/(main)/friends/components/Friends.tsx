"use client";
import React, { useEffect, useRef, useState } from "react";
import FriendsList from "../components/FriendsList";
import SearchFriends from "../components/SearchFriends";
import {
  addFriend,
  FriendType,
  getFriends,
  removeFriend,
  searchForUser,
} from "../action";
import FriendRequest from "./FriendRequest";
import { User } from "@/db/user";
import toast from "react-hot-toast";

export default function Friends({ user }: { user: User | null }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [changeStyling, setChangeStyling] = useState<boolean>(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [friends, setFriends] = useState<FriendType[]>();
  const [friendsId, setFriendsId] = useState<number[]>([]);

  const fetchFriends = async () => {
    if (user) {
      const friendResponse = await getFriends(user.id);
      setFriends(friendResponse);
      setFriendsId(friendResponse.map((friend) => friend.id));
    }
  };

  const handleChange = (value: string) => {
    if (value.trim() === "") {
      setSuggestions([]);
      setSearchTerm("");
      setChangeStyling(false);
      return;
    }
    setSearchTerm(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      setSearchTerm(value);
      const response = await searchForUser(value);
      const filteredResponse = response.filter(
        (itm) => !friendsId.includes(itm.id)
      );

      if (filteredResponse.length > 0) {
        setChangeStyling(true);
      } else {
        setChangeStyling(false);
      }
      setSuggestions(filteredResponse);
    }, 200);
  };

  const add = async (id: number) => {
    if (!user) {
      return;
    }
    const res = await addFriend(user?.id, id);
    if (res) {
      toast.success("Successfully added user.");
      fetchFriends();
    }
  };

  const remove = async (id: number) => {
    if (!user) {
      return;
    }
    const res = await removeFriend(user?.id, id);
    fetchFriends();
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="w-full min-h-screen p-6 space-y-8">
      <div className="relative">
        <h2 className="text-2xl font-semibold mb-4 text-black">Add Friends</h2>
        <SearchFriends
          changeStyling={changeStyling}
          value={searchTerm}
          onChange={handleChange}
        />
        <div className="absolute w-full  border border-black border-b-0 border-t-0  ">
          {suggestions.map((sug) => (
            <FriendRequest
              name={sug.first_name + " " + sug.last_name}
              add={add}
              id={sug.id}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-black mb-4">Friends</h2>
        <FriendsList
          friends={friends}
          onViewProfile={(id) => console.log("view", id)}
          onMessage={(id) => console.log("message", id)}
          onRemoveFriend={remove}
        />
      </div>
    </div>
  );
}
