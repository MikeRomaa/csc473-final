import HomeClient from "./HomeClient";
import { getCurrentUser } from "@/lib/cookies";
import { getMyCourses }     from "@/db/courses";
import { getFeed }          from "@/db/posts";
import { createPostAction, addReplyAction } from "../actions";

import type { CourseRow } from "@/db/courses";
import type { Post }      from "@/db/posts";
import type { ResourceItem }   from "./Resources";
import type { Friend }         from "./MutualFriends";

export default async function HomeServer() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="p-6 text-center">
        <p>Please log in to view your feed.</p>
      </div>
    );
  }

  const [ courses, feed ] = await Promise.all([
    getMyCourses(user.id),
    getFeed(),
  ]);

  const courseOptions = courses.map(c => ({
    id:    String(c.id),
    label: c.code,
  }));

  const resources: ResourceItem[] = [
    { id: "r1", title: "Chemistry Practice questions", resourceType: "document", url: "#" },
    /* …etc… */
  ];

  const friends: Friend[] = [
    { id: "f1", name: "Olu Kukoyi", mutualCourses: 2 },
    /* …etc… */
  ];

  return (
    <HomeClient
      courses={courseOptions}
      feed={feed}
      resources={resources}
      friends={friends}
      createPostAction={createPostAction}
      addReplyAction={addReplyAction}
    />
  );
}
