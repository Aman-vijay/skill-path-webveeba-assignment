import type { Course } from "./courseData.ts"

export function formatPrice(course: Course, countryCode: string): string {
    if (countryCode === "IN") {
        const rupees = course.pricePaise / 100
        return `₹${rupees.toLocaleString("en-IN")}`
    } else if (countryCode === "US") {
        const dollar = course.priceUsdCents / 100
        return dollar.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        })
    } else return "Price unavailable"
}
