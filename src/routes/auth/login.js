import { respond } from './_respond';
import { TwitchOauth, GoogleOauth } from '$lib/oauth2';

export async function post({ body, context }) {
    if (!body.code) {
        return { status: 401 };
    }
    try {
        if (body.provider === 'twitch') {
            const twitchOauth = new TwitchOauth();
            const user = await twitchOauth.get_access_token(body.code);
            return respond({ user });
        } else if (body.provider === 'google') {
            const googleOauth = new GoogleOauth()
            const user = await googleOauth.get_access_token(body.code);
            return respond({ user });
        } else {
            throw new Error('There is no provider')
        }
    } catch (error) {
        return { errors: error }
    }
}
