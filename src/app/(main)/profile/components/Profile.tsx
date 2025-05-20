"use client";

import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

import type { EnrolledCourse } from "@/db/courses";
import type { TutoringCourse } from "@/db/tutoring";
import type { User } from "@/db/user";
import { BookPlus, X } from "lucide-react";

type ProfileProps = {
    user: User;
    enrolled: EnrolledCourse[];
    tutoring: TutoringCourse[];
};

export default function Profile({ user, enrolled, tutoring: _tutoring }: ProfileProps) {
    const [tutoring, setTutoring] = useState<EnrolledCourse[]>(_tutoring);

    const tutor = useCallback(
        (course: EnrolledCourse) => {
            if (tutoring.some(({ code }) => code === course.code)) {
                toast.error("Already tutoring course", { duration: 3500 });
                return;
            }

            fetch(`/api/tutoring/${course.code}`, { method: "POST" })
                .then((res) => {
                    if (!res.ok) {
                        toast.error(`Failed to save tutoring option: ${res.status} ${res.statusText}`, {
                            duration: 3500,
                        });
                        return;
                    }

                    toast.success("Sucessfully tutoring course", { duration: 3500 });
                    setTutoring((t) => [...t, course]);
                })
                .catch(() => toast.error("Failed to save tutoring option: Unable to send request", { duration: 3500 }));
        },
        [tutoring],
    );

    const untutor = useCallback((course: TutoringCourse) => {
        fetch(`/api/tutoring/${course.code}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) {
                    toast.error(`Failed to save tutoring option: ${res.status} ${res.statusText}`, { duration: 3500 });
                    return;
                }

                toast.success("Sucessfully stopped tutoring course", { duration: 3500 });
                setTutoring((t) => t.filter(({ code }) => code !== course.code));
            })
            .catch(() => toast.error("Failed to save tutoring option: Unable to send request", { duration: 3500 }));
    }, []);

    return (
        <div className="min-h-screen py-8 px-6">
            <div className="container mx-auto">
                <div className="bg-white rounded-lg px-4 py-3 shadow-sm text-black">
                    <div className="mb-5">
                        <p>
                            <b>
                                {user.first_name} {user.last_name}
                            </b>
                        </p>
                        <p>{user.email}</p>
                    </div>

                    <h2 className="mb-2 text-lg font-bold">Enrolled Courses:</h2>
                    <div className="mb-5 flex flex-wrap gap-5">
                        {enrolled.map((course) => (
                            <button
                                type="button"
                                onClick={() => tutor(course)}
                                key={course.code}
                                className="cursor-pointer bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-sm"
                            >
                                <BookPlus className="inline mr-2" />
                                <b>{course.code}</b> {course.title}
                            </button>
                        ))}
                    </div>

                    <h2 className="mb-2 text-lg font-bold">Courses I can help in:</h2>
                    <div className="mb-5 flex flex-wrap gap-5">
                        {tutoring.map((course) => (
                            <button
                                onClick={() => untutor(course)}
                                type="button"
                                key={course.code}
                                className="cursor-pointer bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm"
                            >
                                <X className="inline mr-2" />
                                <b>{course.code}</b> {course.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
