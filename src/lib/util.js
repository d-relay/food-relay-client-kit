export function buildUrl(url, parameters = {}) {
    const qString = parameters && Object.keys(parameters).map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`
    }).join('&')
    if (qString) {
        url += `?${qString}`
    }
    return url
}

export async function post(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data || {}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) return response.json();
        else throw new Error(response.statusText)
    } catch (error) {
        throw new Error(error)
    }
}

export function getCookie(cookie = '', name) {
    let matches = cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
