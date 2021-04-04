<script lang="ts">
    export let status: number;
    export let error: Error;
</script>

<main class="container mx-auto mt-8">
    <h1>{status}</h1>
    <p>{error.message}</p>
</main>
