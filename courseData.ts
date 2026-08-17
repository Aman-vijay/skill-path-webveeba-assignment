export interface Course {
    courseName: string
    courseCode: string
    description: string
    mainCategory: string
    shortCourse: string
    courseType: string
    pricePaise: number
    priceUsdCents: number
    mangoId: string
    refundable: boolean
}

export interface CountryResponse {
    country_code: string
}

export type FetchState<T> =
    | { status: "loading" }
    | { status: "error" }
    | { status: "success"; data: T }
