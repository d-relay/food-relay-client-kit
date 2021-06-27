<script>
    import { t } from "svelte-intl-precompile";

    export let component,
        name,
        type,
        value = "";

    const i18n = component + "." + name;
    const actionType = (node) => (node.type = type);
    const handleInput = (event) => (value = event.target.value);
</script>

<div>
    <label for="{component}[{name}]">{$t(i18n)}</label>
    <input
        use:actionType
        on:input={handleInput}
        {value}
        {...$$restProps}
        class="form-input"
        id="{component}[{name}]"
    />
</div>

<style lang="scss">
    input {
        @apply py-3;
        @apply px-4;
        @apply block;
        @apply w-full;
        @apply transition;
        @apply duration-150;
        @apply ease-in-out;
        @apply border;
        @apply rounded-md;
        &:focus {
            @apply outline-none;
            @apply border-indigo-300;
        }
        &:active {
            @apply bg-gray-50;
        }
    }

    label {
        @apply block;
        @apply uppercase;
        @apply tracking-wide;
        @apply text-gray-600;
        @apply text-xs;
        @apply font-bold;
        @apply mb-2;
    }
</style>
