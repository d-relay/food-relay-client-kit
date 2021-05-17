<script context="module">
    export function load({ error, status }) {
        return {
            props: {
                title: `${status}: ${error.message}`,
                stack: error.stack,
            },
        };
    }
</script>

<script>
    export let title, stack;
    const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<main class="container mx-auto mt-8">
    <h1>{title}</h1>
    {#if dev && stack}
        <pre>{stack}</pre>
    {/if}
</main>
