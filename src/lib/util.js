export function buildUrl(url, parameters = {}) {
    const qString = parameters && Object.keys(parameters).map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`
    }).join('&')
    if (qString) {
        url += `?${qString}`
    }
    return url
}

export function post(endpoint, data) {
    return fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((r) => r.json());
}

export function getCookie(cookie = '', name) {
    let matches = cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
