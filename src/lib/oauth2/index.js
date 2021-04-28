export class Oauth2 {
    #strategy;
    constructor(strategy) {
        this.#strategy = strategy;
    }

    async get_access_token(code) {
        const access_token = await this.#strategy.access_token(code);
        const profile = await this.#strategy.user_profile(access_token);
        return this.#strategy.get_token(profile, access_token);
    }
}