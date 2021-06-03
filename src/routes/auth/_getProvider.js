import { Oauth2 } from '$lib/oauth2';
import { buildUrl } from '$lib/util';
import { respond } from './_respond';
import { GoogleStrategy, TwitchStrategy } from '$lib/oauth2/strategies';

export async function providerResponse(provider, code) {
    if (provider === 'twitch') {
        const twitchOauth = new Oauth2(new TwitchStrategy());
        const user = await twitchOauth.get_access_token(code);
        return respond({ user });
    } else if (provider === 'google') {
        const googleOauth = new Oauth2(new GoogleStrategy())
        const user = await googleOauth.get_access_token(code);
        return respond({ user });
    }
}


export function getProvideURI(provider) {
    return provider === 'twitch'
        ? buildUrl(authorizationTwitchURL, twitchOptions)
        : buildUrl(authorizationGoogleURL, googleOptions)
}

const authorizationTwitchURL = "https://id.twitch.tv/oauth2/authorize";
const twitchOptions = {
    client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_TWITCH_REDIRECT_URL,
    client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
    scope: "user:read:email",
    response_type: "code",
};

const authorizationGoogleURL = "https://accounts.google.com/o/oauth2/v2/auth";
const googleOptions = {
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
    scope: "email profile",
    response_type: "code",
};