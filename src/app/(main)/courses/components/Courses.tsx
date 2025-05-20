"use client";

import React, { useEffect, useState } from "react";

import type { Course } from "@/db/courses";
import { useDebouncedState } from "@/hooks/useDebounce";
import CourseList from "./CourseList";
import SearchCourses from "./SearchCourses";

export default function Courses() {
    const [query, setQuery] = useDebouncedState<string>("");
    const [results, setResults] = useState<Course[]>([]);

    useEffect(() => {
        fetch(`/api/courses?query=${query}`)
            .then((res) => res.json())
            .then(setResults);
    }, [query]);

    return (
        <div className="min-h-screen py-8 px-6">
            <div className="container mx-auto">
                <SearchCourses onChange={setQuery} />

                <div className="mt-4 grid grid-cols-3 gap-5">
                    {results.map((course) => (
                        <CourseList key={course.code} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}
