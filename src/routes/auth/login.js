import { respond } from './_respond';
import { get_twitch_access_token } from '$lib/oauth2';

export async function post({ body, context }) {
    if (!body.code) {
        return { status: 401 };
    }
    if (body.provider === 'twitch') {
        const user = await get_twitch_access_token(body.code);
        return respond({ user });
    } else if (body.provider === 'google') {

        // TODO: google login 
        const user = await get_twitch_access_token(body.code);
        return respond({ user });
    } else {
        throw new Error('There is no provider')
    }
}