import { User, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

import type { Course } from "@/db/courses";

export type EnrolledUser = {
    id: string;
    name: string;
};

type CourseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    course: Course;
};

export default function CourseModal({ isOpen, onClose, course }: CourseModalProps) {
    const [enrolled, setEnrolled] = useState<boolean>(course.enrolled);

    const enroll = useCallback(() => {
        fetch(`/api/courses/${course.code}`, { method: "POST" })
            .then((res) => {
                if (!res.ok) {
                    toast.error(`Failed to enroll: ${res.status} ${res.statusText}`, { duration: 3500 });
                    return;
                }

                toast.success("Sucessfully enrolled", { duration: 3500 });
                setEnrolled(true);
            })
            .catch(() => toast.error("Failed to enroll: Unable to send request", { duration: 3500 }));
    }, [course]);

    const unenroll = useCallback(() => {
        fetch(`/api/courses/${course.code}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) {
                    toast.error(`Failed to unenroll: ${res.status} ${res.statusText}`, { duration: 3500 });
                    return;
                }

                toast.success("Sucessfully unenrolled", { duration: 3500 });
                setEnrolled(false);
            })
            .catch(() => toast.error("Failed to enroll: Unable to send request", { duration: 3500 }));
    }, [course]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 bg-opacity-50">
            <div className="bg-white rounded-xl w-11/12 max-w-3xl p-6 relative">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl text-black">
                        <b>{course.code}</b>
                    </h2>

                    <div className="flex items-center space-x-1">
                        <User className="text-gray-800" size={24} />
                        <span className="text-gray-800">{course.total_enrolled}</span>
                    </div>

                    {course.friends_enrolled > 0 && (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                            {course.friends_enrolled} friend{course.friends_enrolled > 1 ? "s" : ""} enrolled
                        </span>
                    )}
                </div>

                <h3 className="text-xl text-black font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-700 mb-6">{course.description}</p>

                <button
                    type="button"
                    onClick={enrolled ? unenroll : enroll}
                    className={`mb-6 px-4 py-2 rounded ${
                        enrolled
                            ? "bg-red-700 hover:bg-red-900 text-white "
                            : "bg-green-700 hover:bg-green-900 text-white"
                    }`}
                >
                    {enrolled ? "I'm not enrolled" : "I'm enrolled"}
                </button>

                <div>
                    <h4 className="font-bold text-black mb-2">Enrolled</h4>
                    <ul className="space-y-4 max-h-64 overflow-y-auto">
                        {/* {course.enrolledUsers.map((user) => (
                            <li key={user.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                    <span className="text-gray-900">{user.name}</span>
                                </div>
                                <button className="px-4 py-2 bg-purple-700 hover:bg-purple-900 text-white rounded">
                                    View Profile
                                </button>
                            </li>
                        ))} */}
                    </ul>
                </div>
            </div>
        </div>
    );
}
