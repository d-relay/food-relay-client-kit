<script>
    export let text;
</script>

<button type="submit">{text}</button>

<style>
    button {
        @apply bg-white;
        @apply text-gray-600;
        @apply py-2;
        @apply px-4;
        @apply shadow;
        @apply border;
        @apply rounded-md;
        @apply border-gray-300;
        @apply transition;
        @apply sm:col-start-2;
        @apply sm:col-end-3;
    }

    button:hover {
        @apply ring-1;
        @apply ring-indigo-300;
        @apply transition-shadow;
    }

    button:focus-visible,
    button:focus-within,
    button:focus {
        @apply ring-4;
        @apply outline-none;
        @apply border-indigo-300;
        @apply ring-indigo-300;
        @apply ring-opacity-40;
    }

    button:active {
        @apply bg-gray-50;
    }
</style>
