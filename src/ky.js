import ky from 'ky'

const baseUrl = import.meta.env.VITE_API_URL

function getCsrfToken() {
    const name = 'XSRF-TOKEN=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            return decodeURIComponent(cookie.substring(name.length, cookie.length));
        }
    }
    return null;
}

export const api = ky.create({
    prefixUrl: baseUrl,
    timeout: 5000,
    credentials: 'include',
    redirect: 'manual',
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    hooks: {
        beforeRequest: [
            request => {
                const csrfToken = getCsrfToken();
                if (csrfToken) {
                    request.headers.set('X-XSRF-TOKEN', csrfToken);
                }
            }
        ],
        afterResponse: [
            async (request, options, response) => {
                if (response.status === 419) {
                    const csrfToken = getCsrfToken();
                    if (csrfToken) {
                        options.headers.set('X-XSRF-TOKEN', csrfToken);
                        return api(request, options);
                    }
                }
                return response;
            }
        ]
    }
})
