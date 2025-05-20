"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import PostCard, { CourseOption } from "./PostCard";
import FeedItem                    from "./FeedItem";
import Resources, { ResourceItem } from "./Resources";
import MutualFriends, { Friend }   from "./MutualFriends";

import type { Post } from "@/db/posts";

interface HomeClientProps {
  courses: CourseOption[];
  feed:    Post[];
  resources: ResourceItem[];
  friends:   Friend[];
  createPostAction: (fd: FormData) => Promise<void>;
  addReplyAction:   (fd: FormData) => Promise<void>;

  enrolledCourses: { id: string; code: string; title: string }[];
  initialCourse:   { id: string; code: string; title: string };
}

export default function HomeClient({
  courses,
  feed: initialFeed,
  resources,
  friends,
  createPostAction,
  addReplyAction,
  enrolledCourses,
  initialCourse,
}: HomeClientProps) {
  const router = useRouter();
  const [feed, setFeed] = useState<Post[]>(initialFeed);

  const handlePost = async (text: string, courseId: string) => {
    const fd = new FormData();
    fd.set("text", text);
    fd.set("courseId", courseId);
    await createPostAction(fd);
    router.refresh();
  };

  const handleRespond = async (postId: string, content: string) => {
    const fd = new FormData();
    fd.set("postId", postId);
    fd.set("content", content);
    await addReplyAction(fd);
    router.refresh();
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
            <PostCard courses={courses} action={(fd) => createPostAction(fd)} />
            {feed.map(post => (
              <FeedItem
                key={post.id}
                post={post}
                action={(fd) => addReplyAction(fd)}
              />
            ))}
          </div>
          <div className="w-80 flex-shrink-0 space-y-6">
            <Resources
              resources={resources}
              enrolledCourses={enrolledCourses}
              initialCourse={initialCourse}
            />
            <MutualFriends friends={friends} onViewProfile={handleViewProfile} />
          </div>
        </div>
      </div>
    </div>
  );
}
