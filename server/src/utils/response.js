export function successResponse({ message = 'Request successful', data }) {
    return {
        success: true,
        message,
        data,
    }
}

export function errorResponse({ message = 'Request error!', data = [] }) {
    return {
        success: false,
        message,
        data,
    }
}
