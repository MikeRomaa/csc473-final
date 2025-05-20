"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import PostCard     from "./PostCard";
import FeedItem     from "./FeedItem";
import Resources, { ResourceItem }    from "./Resources";
import MutualFriends, { Friend }      from "./MutualFriends";

import type { Post }                    from "@/db/posts";
import type { CourseOption }            from "./PostCard";

interface HomeClientProps {
  courses: CourseOption[];
  feed: Post[];
  resources: ResourceItem[];
  friends: Friend[];
  createPostAction: (formData: FormData) => Promise<void>;
  addReplyAction:   (formData: FormData) => Promise<void>;
}

export default function HomeClient({
  courses,
  feed: initialFeed,
  resources,
  friends,
  createPostAction,
  addReplyAction,
}: HomeClientProps) {
  const router = useRouter();
  const [feed, setFeed] = useState<Post[]>(initialFeed);

  const handlePost = async (text: string, courseId: string) => {
    const fd = new FormData();
    fd.set("text", text);
    fd.set("courseId", courseId);
    await createPostAction(fd);

    const updated = await fetch("/api/feed").then(r => r.json());
    setFeed(updated);
  };

  const handleRespond = async (postId: string, content: string) => {
    const fd = new FormData();
    fd.set("postId", postId);
    fd.set("content", content);
    await addReplyAction(fd);

    const updated = await fetch("/api/feed").then(r => r.json());
    setFeed(updated);
  };

  const handleViewProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-black">My Feed</h1>
        <div className="flex items-start gap-8">
          <div className="flex-1">
            <PostCard
              courses={courses}
              action={createPostAction}           
            />
            {feed.map(post => (
              <FeedItem
                key={post.id}
                post={post}
                action={addReplyAction}      
              />
            ))}
          </div>
          <div className="w-80 flex-shrink-0 space-y-6">
            <Resources resources={resources} />
            <MutualFriends
              friends={friends}
              onViewProfile={handleViewProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
