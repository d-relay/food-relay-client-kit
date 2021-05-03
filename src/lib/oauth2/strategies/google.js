import fetch from 'node-fetch';
import { buildUrl } from '../../util';

export class GoogleStrategy {
    #GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
    #GOOGLE_USERS_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

    #GOOGLE_OPTIONS = {
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
        grant_type: 'authorization_code',
    }

    async access_token(code) {
        const token_url = buildUrl(this.#GOOGLE_TOKEN_URL, { ...this.#GOOGLE_OPTIONS, code });
        const response = await fetch(token_url, { method: 'POST' });
        const { access_token } = await response.json();
        return access_token;
    }

    async user_profile(access_token) {
        const headers = { 'Content-length': '0', 'Host': 'www.googleapis.com', 'User-Agent': 'Node-oauth' }
        const response = await fetch(this.#GOOGLE_USERS_URL + '?access_token=' + access_token, { method: 'GET', headers })
        const profile = await response.json();
        profile.provider = 'google';
        if (profile.name) {
            profile.displayName = profile.name
            delete profile.name;
        }
        if (profile.sub) {
            profile.id = profile.sub
            delete profile.sub;
        }
        return profile;
    }
}
