"use client";
import React from "react";
import PostCard, { CourseOption } from "./PostCard";
import FeedItem from "./FeedItem";
import Resources, { ResourceItem } from "./Resources";
import MutualFriends, { Friend } from "./MutualFriends";

export default function Home() {
  const courses: CourseOption[] = [
    { id: "csc33500", label: "CSC 33500" },
    { id: "chem10401", label: "CHEM 10401" },
    { id: "phys20700", label: "PHYS 20700" },
  ];

const feed = [
  {
    id: "1",
    name: "Mansij Mishra",
    course: "CSC 33500",
    content: "Does anyone have last semester’s practice questions for 335?",
    replies: [
      { id: "1-1", name: "Alice Chen", content: "I can send them your way!" },
      { id: "1-2", name: "Bob Lee", content: "Also check the shared Google Drive folder." },
    ],
  },
  {
    id: "2",
    name: "Michael Romashov",
    course: "CHEM 10401",
    content: "Uploaded Chemistry Practice questions",
    replies: [
      { id: "2-1", name: "Sara Patel", content: "Thanks for uploading!" },
    ],
  },
  {
    id: "3",
    name: "Mansij Mishra",
    course: "PHYS 20700",
    content: "I’m lost on the answer from problem 3 in Physics Practice set answer key, anyone understand it?",
    replies: [
      { id: "3-1", name: "Liam Wong", content: "I think it uses energy conservation." },
      { id: "3-2", name: "Emma Davis", content: "Let’s discuss this in our study group chat." },
    ],
  },
];

  const resources: ResourceItem[] = [
    { id: "r1", title: "Chemistry Practice questions", resourceType: "document", url: "#" },
    { id: "r2", title: "Final lab presentation", resourceType: "presentation", url: "#" },
    { id: "r3", title: "mergesort.py", resourceType: "code", url: "#" },
    { id: "r4", title: "Physics Practice set answer key", resourceType: "document", url: "#" },
    { id: "r5", title: "English rubric", resourceType: "document", url: "#" },
  ];

  const friends: Friend[] = [
    { id: "f1", name: "Olu Kukoyi", mutualCourses: 2 },
    { id: "f2", name: "Jane Doe", mutualCourses: 1 },
    { id: "f3", name: "John Smith", mutualCourses: 3 },
  ];

  const handlePost = (t: string, c: string) => console.log(t, c);
  const handleRespond = (i: string, r: string) => console.log(i, r);
  const handleViewProfile = (i: string) => console.log(i);

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-black">My Feed</h1>
        <div className="flex items-start gap-8">
          <div className="flex-1">
            <PostCard
              courses={courses}
              selectedCourseId={courses[0].id}
              onCourseChange={c => console.log(c)}
              onSubmit={handlePost}
            />
            {feed.map(item => (
              <FeedItem
                key={item.id}
                id={item.id}
                name={item.name}
                course={item.course}
                content={item.content}
                replies={item.replies}
                onRespond={handleRespond}
              />
            ))}
          </div>
          <div className="w-80 flex-shrink-0 space-y-6">
            <Resources resources={resources} />
            <MutualFriends friends={friends} onViewProfile={handleViewProfile} />
          </div>
        </div>
      </div>
    </div>
  );
}
