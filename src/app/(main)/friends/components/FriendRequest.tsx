"use client";
import React from "react";

interface FriendRequestProps {
  name: string;
  add: (id: number) => void;
  id: number;
}

export default function FriendRequest({ name, add, id }: FriendRequestProps) {
  return (
    <div className=" bg-white flex items-center border-b-2 border-black p-4 shadow-md space-x-4 w-full max-w-full ">
      <div className="w-14 h-14 bg-gray-300 rounded-full border border-yellow-500"></div>
      <div className="flex flex-col flex-grow">
        <div className="text-lg text-black font-semibold">{name}</div>
      </div>
      <div className="flex space-x-2">
        <button
          className="bg-green-500 text-black px-4 py-2 rounded-md border border-black"
          onClick={() => {
            add(id);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
