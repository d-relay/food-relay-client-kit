<script context="module">
    export const router = false;
    export const hydrate = false;
    import { buildUrl } from "$lib/util";
    const twitchOptions = {
        client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_TWITCH_REDIRECT_URL,
        client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
        scope: "user:read:email",
        response_type: "code"
    }

	export async function load({session }) {
		if (session.user) {
			return { redirect: '/', status: 302 };
		} else {
            const redirect_url = buildUrl('https://id.twitch.tv/oauth2/authorize', twitchOptions);
            return { redirect: redirect_url, status: 302 };
        }
	}
</script>

