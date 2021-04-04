<script context="module">
    export async function load({ session, page }) {
      if (session.user) {
        return { redirect: "/", status: 302 };
      } else {
        const code = page.query.get("code");
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
      const response = await post("/auth/login", { code, provider: "twitch" });
      if (response.user) {
        $session.user = response.user;
      }
      return goto("/");
    });
  </script>
