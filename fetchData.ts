const BASE_URL: string = "https://syncsphere-hiv6.onrender.com"

export async function getJson<T>(path: string): Promise<T> {
    const url = `${BASE_URL}${path}`
    const res = await fetch(url, {
        method: "GET",
    })
    if (!res.ok) {
        throw new Error(`${path} responded with ${res.status}`)
    }
    return await res.json()
}

export async function getWithRetry<T>(path: string, retries = 2): Promise<T> {
    let lastError: unknown

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await getJson<T>(path)
        } catch (err) {
            lastError = err
        }
    }
    throw lastError
}
