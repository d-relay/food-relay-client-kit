import { GoogleApi } from './api/google'
import { TwitchApi } from './api/twitch'

class Oauth {
    #api;
    constructor() {
        if (this instanceof TwitchOauth) {
            this.#api = new TwitchApi();
        } else if (this instanceof GoogleOauth) {
            this.#api = new GoogleApi();
        }
    }

    async get_access_token(code) {
        const access_token = await this.#api.access_token(code);
        const profile = await this.#api.user_profile(access_token);
        return this.#api.get_token(profile, access_token);
    }
}

export class TwitchOauth extends Oauth { }
export class GoogleOauth extends Oauth { }