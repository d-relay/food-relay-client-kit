import { providerResponse, getProvideURI } from "./_getProvider";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
    const paths = request.path.split('/').filter(Boolean)
    const providers = ['twitch', 'google'];
    const provider = providers.includes(paths[1]) && paths[1];

    if (!provider) return;

    if (paths[2] === 'callback') {
        const code = request.query.get('code');
        return providerResponse(provider, code);
    } else if (provider === 'twitch' || provider === 'google') {
        return {
            status: 302,
            headers: { location: getProvideURI(provider) }
        }
    } else {
        return {
            status: 404,
            body: {
                error: 'Page not Found'
            }
        };
    }
}
