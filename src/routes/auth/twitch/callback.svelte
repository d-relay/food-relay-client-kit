<script context="module">
    export async function load({ session, page }) {
        if (session.user) {
            return { redirect: "/", status: 301 };
        } else {
            const code = page.query.get("code");
            if (!code) {
                return {
                    status: 422,
                    error: new Error(`Missing code params!`),
                };
            }
            return { props: { code } };
        }
    }
</script>

<script>
    export let code;
    import { onMount } from "svelte";
    import { post } from "$lib/util";
    import { session } from "$app/stores";
    import { goto } from "$app/navigation";

    onMount(async () => {
        try {
            const response = await post("/auth/login", {
                code,
                provider: "twitch",
            });
            if (response.user) {
                $session.user = response.user;
                return goto("/settings");
            }
        } catch (error) {
            return goto("/login");
        }
    });
</script>
