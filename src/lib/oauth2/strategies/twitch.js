import fetch from 'node-fetch';
import { buildUrl } from '../../util';

export class TwitchStrategy {
    #TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
    #TWITCH_USERS_URL = 'https://api.twitch.tv/helix/users';

    #TWITCH_OPTIONS = {
        client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
        client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_TWITCH_REDIRECT_URL,
        grant_type: 'authorization_code',
    }

    async access_token(code) {
        const token_url = buildUrl(this.#TWITCH_TOKEN_URL, { ...this.#TWITCH_OPTIONS, code });
        const response = await fetch(token_url, { method: 'POST' });
        const json = await response.json();

        return json.access_token;
    }

    async user_profile(access_token) {
        const headers = {
            'Client-ID': import.meta.env.VITE_TWITCH_CLIENT_ID + '',
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Authorization': 'Bearer ' + access_token
        }
        const response = await fetch(this.#TWITCH_USERS_URL, { method: 'GET', headers })
        const json = await response.json();
        const profile = json.data[0];
        profile.provider = 'twitch';

        if (profile.display_name) {
            profile.displayName = profile.display_name
            delete profile.display_name;
        }

        return profile;
    }
}