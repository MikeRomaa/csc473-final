import React from "react";
import HomeClient from "./HomeClient";

import { getCurrentUser } from "@/lib/cookies";
import { getMyCourses } from "@/db/enrolledCourses";
import { getFeed } from "@/db/posts";
import { getResourcesByCourse } from "@/db/resources";
import { createPostAction, addReplyAction } from "../actions";
import type { Friend } from "@/db/MutualFriends";
import { getMutualFriends } from "@/db/MutualFriends";
import type { CourseRow } from "@/db/enrolledCourses";
import type { Post } from "@/db/posts";
import type { ResourceItem } from "./Resources";

export default async function HomeServer() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="p-6 text-center">
        <p>Please log in to view your feed.</p>
      </div>
    );
  }

  const [coursesRows, feed] = await Promise.all([
    getMyCourses(user.id), 
    getFeed(),             
  ]);

  const courseOptions = coursesRows.map(c => ({
    id:    String(c.id),
    label: c.code,
  }));

  const enrolledCourses = coursesRows.map(c => ({
    id:    String(c.id),
    code:  c.code,
    title: c.title,
  }));
  const initialCourse = enrolledCourses[0] || { id: "", code: "", title: "" };

  const resourceIds = initialCourse.id
    ? await getResourcesByCourse(Number(initialCourse.id))
    : [];
  const resources: ResourceItem[] = resourceIds.map(rid => ({
    id:           String(rid),
    title:        `Resource ${rid}`,  
    resourceType: "document",
    url:          `/resources/${rid}`,
  }));

const friends: Friend[] = await getMutualFriends(user.id);


  return (
    <HomeClient
      courses={courseOptions}
      feed={feed}
      resources={resources}
      friends={friends}
      createPostAction={createPostAction}
      addReplyAction={addReplyAction}

      enrolledCourses={enrolledCourses}
      initialCourse={initialCourse}
    />
  );
}
