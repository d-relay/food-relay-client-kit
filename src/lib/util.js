export function buildUrl(url, parameters = {}) {
    const qString = parameters && Object.keys(parameters).map((key) => {
        return `${key}=${parameters[key]}`
    }).join('&')
    if (qString) {
        url += `?${qString}`
    }
    return encodeURI(url);
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


/**
 * @param {string} cookie
 */
export function parseUser(cookie) {
    try {
        const cookies = getCookie(cookie, 'jwt');
        const jwt = cookies && Buffer.from(cookies, 'base64').toString('utf-8');
        return JSON.parse(jwt)
    } catch (error) {
        return null;
    }
}

export function parseLocale(headers) {
    try {
        const locale = getCookie(headers.cookie, 'locale');
        const acceptLanguage = headers['accept-language'].split(',')[0].trim().split('-')[0];

        return locale || acceptLanguage;
    } catch (error) {
        return null;
    }
}

export function clickOutside(node) {

    const handleClick = event => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            )
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}