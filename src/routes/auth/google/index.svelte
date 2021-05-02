<script context="module">
    export const router = false;
    export const hydrate = false;
    import { buildUrl } from "$lib/util";

    const authorizationURL = "https://accounts.google.com/o/oauth2/v2/auth";
    const googleOptions = {
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
        scope: "email profile",
        response_type: "code",
    };

    export async function load({ session }) {
        if (session.user) {
            return { redirect: "/", status: 302 };
        } else {
            const redirect_url = buildUrl(authorizationURL, googleOptions);
            return { redirect: redirect_url, status: 302 };
        }
    }
</script>
