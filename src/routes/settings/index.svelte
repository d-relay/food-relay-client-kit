<script context="module">
    export function load({ session }) {
        const { user } = session;
        if (!user) {
            return {
                status: 302,
                redirect: "/login",
            };
        }
        return {
            props: { user },
        };
    }
</script>

<script>
    export let user;
</script>

<h1>hello {user?.display_name}</h1>
