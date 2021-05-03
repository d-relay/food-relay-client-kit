export class Oauth2 {
    #strategy;
    constructor(strategy) {
        this.#strategy = strategy;
    }

    async get_access_token(code) {
        const access_token = await this.#strategy.access_token(code);
        const profile = await this.#strategy.user_profile(access_token);
        return this.get_token(profile, access_token);
    }

    async get_token(profile, accessToken) {
        return fetch(import.meta.env.VITE_API_BASE_URL + "/login", {
            method: "POST",
            body: JSON.stringify({ ...profile, accessToken }),
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json());
    }
}