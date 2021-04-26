

import fetch from 'node-fetch';
import { buildUrl } from './util'

const TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const TWITCH_OPTIONS = {
    client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
    client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
    redirect_uri: import.meta.env.VITE_TWITCH_REDIRECT_URL,
    grant_type: 'authorization_code',
}

async function twitch_access_token(code) {
    const token_url = buildUrl(TWITCH_TOKEN_URL, { ...TWITCH_OPTIONS, code });
    const response = await fetch(token_url, { method: 'POST' });
    const json = await response.json();

    return json.access_token;
}

async function twitch_user_profile(access_token) {
    const response = await fetch('https://api.twitch.tv/helix/users', {
        method: 'GET',
        headers: {
            'Client-ID': import.meta.env.VITE_TWITCH_CLIENT_ID,
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Authorization': 'Bearer ' + access_token
        }
    })

    const json = await response.json();
    const profile = json.data[0];
    if (profile.display_name) {
        profile.displayName = profile.display_name
        delete profile.display_name;
    }
    profile.provider = 'twitch';
    return profile;
}

async function get_token(profile, accessToken) {
    const resp = await fetch(import.meta.env.VITE_API_BASE_URL + "/login", {
        method: "POST",
        body: JSON.stringify({ ...profile, accessToken }),
        headers: { "Content-Type": "application/json" },
    });

    return resp.json();
}

export async function get_twitch_access_token(code) {
    const access_token = await twitch_access_token(code);
    const profile = await twitch_user_profile(access_token);
    return get_token(profile, access_token);
}
