import fetch from 'node-fetch';
import { buildUrl } from './util'

const GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";

const GOOGLE_OPTIONS = {
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
    grant_type: 'authorization_code',
}

async function google_access_token(code) {
    const token_url = buildUrl(GOOGLE_TOKEN_URL, { ...GOOGLE_OPTIONS, code });
    const response = await fetch(token_url, { method: 'POST' });
    const { access_token } = await response.json();
    return access_token;
}

async function google_user_profile(access_token) {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + access_token, {
        method: 'GET',
        headers: {
            'Content-length': '0',
            'Host': 'www.googleapis.com',
            'User-Agent': 'Node-oauth'
        }
    })
    const profile = await response.json();

    if (profile.name) {
        profile.displayName = profile.name
        delete profile.name;
    }
    profile.provider = 'google';
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

export async function get_google_access_token(code) {
    const access_token = await google_access_token(code);
    const profile = await google_user_profile(access_token);
    return get_token(profile, access_token);
}
