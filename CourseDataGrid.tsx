import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import type { Course, CountryResponse, FetchState } from "./courseData.ts"

import { getWithRetry } from "./fetchData.ts"
import { formatPrice } from "./pricing.ts"

interface CourseDataGridProps {
    accentColor: string
    highlightField: "mainCategory" | "shortCourse" | "courseType"
}
export default function CourseDataGrid(props: CourseDataGridProps) {
    const [courses, setCourses] = React.useState<FetchState<Course[]>>({
        status: "loading",
    })

    const [country, setCountry] = React.useState<FetchState<CountryResponse>>({
        status: "loading",
    })

    //search k liye
    const [searchQuery, setSearchQuery] = React.useState("")

    const countryCode =
        country.status === "success" ? country.data.country_code : "US"
    const { accentColor, highlightField } = props
    const loadData = React.useCallback(() => {
        setCourses({ status: "loading" })
        setCountry({ status: "loading" })

        getWithRetry<Course[]>("/assignment/course-data")
            .then((data) => setCourses({ status: "success", data }))
            .catch(() => setCourses({ status: "error" }))

        getWithRetry<CountryResponse>("/assignment/country-code")
            .then((data) => setCountry({ status: "success", data }))
            .catch(() => setCountry({ status: "error" }))
    }, [])

    React.useEffect(() => {
        loadData()
    }, [loadData])

    const styleSheet = (
        <style>{`
        .course-grid-root {
            width: 100%;
            box-sizing: border-box;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: #111827;
        }

        .course-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 20px;
            width: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
        }

        .course-card {
            min-width: 0;
            min-height: 230px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 20px;
            box-sizing: border-box;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .course-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    margin-bottom: 20px;
}

.course-search {
    width: 100%;
    max-width: 420px;
    height: 46px;
    padding: 0 16px;
    box-sizing: border-box;

    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: #ffffff;

    color: #111827;
    font-family: inherit;
    font-size: 14px;

    outline: none;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
}

.course-search::placeholder {
    color: #9ca3af;
}

.course-search:focus {
    border-color: #9ca3af;
    box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.06);
}

@media (max-width: 599px) {
    .course-toolbar {
        margin-bottom: 16px;
    }

    .course-search {
        max-width: none;
        height: 44px;
    }
}

        @media (hover: hover) and (pointer: fine) {
            .course-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 14px 32px rgba(15, 23, 42, 0.1);
            }
        }

        .course-refund-badge {
            align-self: flex-start;
            padding: 5px 10px;
            border: 1px solid #dbeafe;
            border-radius: 999px;
            background: #eff6ff;
            color: #1d4ed8;
            font-size: 12px;
            font-weight: 600;
            line-height: 1;
        }

        .course-title {
            margin: 0;
            color: #111827;
            font-size: 21px;
            line-height: 1.2;
            font-weight: 700;
            letter-spacing: -0.02em;
        }

        .course-description {
            margin: 0;
            min-height: calc(1.5em * 2);
            color: #4b5563;
            font-size: 14px;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .course-price {
            margin-top: auto;
            color: #111827;
            font-size: 20px;
            line-height: 1.2;
            font-weight: 700;
        }

        .course-category {
            color: #6b7280;
            font-size: 13px;
            line-height: 1.35;
        }

        .country-notice {
            width: 100%;
            margin: 0 0 20px;
            padding: 11px 14px;
            box-sizing: border-box;
            border: 1px solid #fde68a;
            border-radius: 12px;
            background: #fffbeb;
            color: #92400e;
            font-size: 13px;
            line-height: 1.4;
        }

        .course-state {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 180px;
            width: 100%;
            box-sizing: border-box;
        }

        .course-state-panel {
            width: 100%;
            max-width: 640px;
            padding: 24px;
            box-sizing: border-box;
            text-align: center;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
            color: #374151;
        }

        .course-retry-button {
            margin-top: 12px;
            padding: 10px 16px;
            border: 1px solid #d1d5db;
            border-radius: 10px;
            background: #111827;
            color: #ffffff;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
        }

        .course-retry-button:hover {
            background: #374151;
        }
        .course-skeleton-card {
    pointer-events: none;
    overflow: hidden;
}
.skeleton-line {
    position: relative;
    overflow: hidden;
    border-radius: 999px;
    background: #e5e7eb;
}
.skeleton-line::after {
    position: absolute;
    inset: 0;
    content: "";
    transform: translateX(-100%);
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.7) 50%,
        transparent 100%
    );
    animation: course-skeleton-shimmer 1.5s ease-in-out infinite;
}
.skeleton-badge {
    width: 82px;
    height: 24px;
}
.skeleton-title {
    width: 72%;
    height: 28px;
    border-radius: 8px;
}
.skeleton-description {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.skeleton-description-line {
    width: 100%;
    height: 14px;
}
.skeleton-description-line.short {
    width: 68%;
}
.skeleton-footer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
}
.skeleton-price {
    width: 96px;
    height: 22px;
    border-radius: 7px;
}
.skeleton-category {
    width: 120px;
    height: 14px;
}


        .course-retry-button:focus-visible {
            outline: 3px solid #93c5fd;
            outline-offset: 3px;
        }

        @media (min-width: 600px) {
            .course-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 22px;
            }
        }

        @media (min-width: 1000px) {
            .course-grid {
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 24px;
            }
        }

        @keyframes course-skeleton-shimmer {
    100% {
        transform: translateX(100%);
    }
}
@media (prefers-reduced-motion: reduce) {
    .skeleton-line::after {
        animation: none;
    }
}
    `}</style>
    )
    //this is for rendering based on status like loading,error,empty and on success
    // o

    //case1 - loading
    if (courses.status === "loading") {
        return (
            <div className="course-grid-root">
                {styleSheet}
                <div
                    className="course-grid course-skeleton-grid"
                    aria-busy="true"
                >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            className="course-card course-skeleton-card"
                            key={index}
                        >
                            <div className="skeleton-line skeleton-badge" />
                            <div className="skeleton-line skeleton-title" />
                            <div className="skeleton-description">
                                <div className="skeleton-line skeleton-description-line" />
                                <div className="skeleton-line skeleton-description-line short" />
                            </div>
                            <div className="skeleton-footer">
                                <div className="skeleton-line skeleton-price" />
                                <div className="skeleton-line skeleton-category" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    //case 2- error

    if (courses.status === "error") {
        return (
            <div className="course-grid-root">
                {styleSheet}

                <div className="course-state">
                    <div className="course-state-panel">
                        <p>Couldn't load courses right now.</p>

                        <button
                            className="course-retry-button"
                            onClick={loadData}
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    //case 3- on empty
    if (courses.status === "success" && courses.data.length === 0) {
        return (
            <div className="course-grid-root">
                {styleSheet}

                <div className="course-state">
                    <div className="course-state-panel">
                        No courses available right now.
                    </div>
                </div>
            </div>
        )
    }

    const filteredCourses = courses.data.filter((course) =>
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    //case4- sucess

    return (
        <div className="course-grid-root">
            {styleSheet}
            <div className="course-toolbar">
                <input
                    className="course-search"
                    type="search"
                    placeholder="Search courses..."
                    aria-label="Search courses"
                    value={searchQuery}
                    onChange={(event) => {
                        setSearchQuery(event.target.value)
                    }}
                />
            </div>

            {country.status === "error" && (
                <p className="country-notice">
                    Couldn't detect your region — showing prices in USD.
                </p>
            )}

            <div className="course-grid">
                {filteredCourses.map((course) => (
                    <div
                        className="course-card"
                        style={{ borderTop: `4px solid ${accentColor}` }}
                        key={course.mangoId}
                    >
                        {course.refundable && (
                            <span className="course-refund-badge">
                                Refundable
                            </span>
                        )}

                        <h3 className="course-title">{course.courseName}</h3>

                        <p className="course-description">
                            {course.description}
                        </p>

                        <span className="course-price">
                            {formatPrice(course, countryCode)}
                        </span>

                        <span className="course-category">
                            {course[highlightField]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

addPropertyControls(CourseDataGrid, {
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: "#4F46E5",
    },

    highlightField: {
        type: ControlType.Enum,
        title: "Extra Field",
        options: ["mainCategory", "shortCourse", "courseType"],
        optionTitles: ["Category", "Short Name", "Course Type"],
        defaultValue: "mainCategory",
    },
})
