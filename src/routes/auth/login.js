import { respond } from './_respond';
import { Oauth2 } from '$lib/oauth2';
import { GoogleStrategy, TwitchStrategy } from '$lib/oauth2/strategies';

export async function post({ body, context }) {
    if (!body.code) {
        return { status: 401 };
    }
    try {
        if (body.provider === 'twitch') {
            const twitchOauth = new Oauth2(new TwitchStrategy());
            const user = await twitchOauth.get_access_token(body.code);
            console.log({ user });
            return respond({ user });
        } else if (body.provider === 'google') {
            const googleOauth = new Oauth2(new GoogleStrategy())
            const user = await googleOauth.get_access_token(body.code);
            return respond({ user });
        } else {
            throw new Error('There is no provider')
        }
    } catch (error) {
        return { errors: error }
    }
}
