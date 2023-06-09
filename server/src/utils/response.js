export function successResponse({ message = 'Request successful', page, pageSize, data }) {
    const response = {
        success: true,
        message,
        data,
    }

    if (Array.isArray(data) && data.length > 1) response.total = data.length
    if (page) response.page = page
    if (pageSize) response.pageSize = pageSize

    return response
}

export function errorResponse({ message = 'Request error!', data = [] }) {
    return {
        success: false,
        message,
        data,
    }
}
