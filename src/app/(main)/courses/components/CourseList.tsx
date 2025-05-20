import { User } from "lucide-react";
import React, { useState } from "react";

import type { Course } from "@/db/courses";
import { truncate } from "@/utils";
import CourseModal from "./CourseModal";

export type CourseListProps = {
    course: Course;
};

export default function CourseList({ course }: CourseListProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <div
                onClick={openModal}
                className="bg-white rounded-lg px-4 py-3 shadow-sm cursor-pointer hover:shadow-md transition"
            >
                <div className="flex items-center">
                    <h2 className="text-lg text-black z-10 mr-auto">
                        <b>{course.code}</b> {course.title}
                    </h2>

                    {course.friends_enrolled > 0 && (
                        <span className="absolute left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-sm">
                            {course.friends_enrolled} friend{course.friends_enrolled > 1 ? "s" : ""} enrolled
                        </span>
                    )}

                    <div className="flex items-center space-x-1 z-10">
                        <User className="w-6 h-6 text-gray-800" />
                        <span className="text-gray-700">{course.total_enrolled}</span>
                    </div>
                </div>

                {course.description !== course.title && (
                    <p className="text-slate-500">{truncate(course.description, 200)}</p>
                )}
            </div>

            {isOpen && <CourseModal onClose={closeModal} course={course} />}
        </>
    );
}
