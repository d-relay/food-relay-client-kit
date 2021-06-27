/** @type {import('@sveltejs/kit').RequestHandler} */
export function post(request) {
    // @ts-ignore
    const lang = request.body.lang;
    return {
        headers: {
            'set-cookie': `locale=${lang}; Path=/; HttpOnly; Secure;`,
            // location: '/'
        },
        body: {}
    }
}