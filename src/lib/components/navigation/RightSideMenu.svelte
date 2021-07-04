<script>
    export let user;
    import { scale } from "svelte/transition";
    import { session } from "$app/stores";
    import { goto } from "$app/navigation";

    import { clickOutside } from "$lib/util";
    import { flags } from "$lib/components/flags";
    import { logout, updateLocale, showLang } from "./method";

    import { Bell, Selector } from "$lib/assets/icons";

    import { locales, t } from "svelte-intl-precompile";
</script>

<div
    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
>
    <div
        class="mt-1 relative"
        use:clickOutside
        on:click_outside={() => showLang.set(false)}
    >
        <button
            on:click={() => showLang.update((n) => !n)}
            class="hidden sm:block bg-white relative w-24 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
            <svelte:component this={flags.get($session.locale)} />
            <span
                class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
                <Selector />
            </span>
        </button>
        {#if $showLang}
            <div
                in:scale={{ duration: 100, start: 0.95 }}
                out:scale={{ duration: 75, start: 0.95 }}
                class="origin-top-right absolute right-0 w-48 py-2 mt-1 border-1 bg-white rounded shadow-main"
            >
                {#each $locales as lang}
                    <span
                        class:selected={$session.locale === lang}
                        class="dropdown__item cursor-pointer"
                        role="menuitem"
                        on:click={() => updateLocale(lang, $session)}
                    >
                        {$t("language." + lang)}
                    </span>
                {/each}
            </div>
        {/if}
    </div>

    {#if user}
        <button
            class="p-1 ml-3 border-2 border-transparent text-gray-400 rounded-full
          hover:text-gray-500 focus:outline-none focus:text-gray-500
          focus:bg-gray-100 transition duration-150 ease-in-out"
            aria-label="Notifications"
        >
            <Bell />
        </button>

        <div class="ml-3 relative">
            <!-- <Dropdown triggerElement={dropdownTrigger}>
                <button
                    bind:this={dropdownTrigger}
                    class="dropdown__button"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <img
                        class="h-8 w-8 rounded-full"
                        src={user.picture}
                        alt=""
                    />
                </button>

                <div
                    class="dropdown__menu--inner"
                    role="menu"
                    slot="DropdownMenu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                >
                    <a href="settings" role="menuitem" class="dropdown__item">
                        settings
                    </a>
                    <a
                        href="restaurants"
                        role="menuitem"
                        class="dropdown__item"
                    >
                        restaurants
                    </a>
                    <a
                        rel="external"
                        href="/auth/logout"
                        class="dropdown__item"
                        role="menuitem"
                        >logout
                    </a>
                </div>
            </Dropdown> -->
        </div>
        <button
            on:click={() => logout($session).then(() => goto("/"))}
            class="ml-3 relative inline-flex items-center px-4 py-2 border 
            border-transparent text-sm leading-5 font-medium rounded-md 
            hover:underline hover:text-indigo-500
            transition ease-in-out duration-150 focus-link"
            >logout
        </button>
    {:else}
        <a
            href="/login"
            class="ml-3 relative inline-flex items-center px-4 py-2 border
            border-transparent text-sm leading-5 font-medium rounded-md 
            hover:underline hover:text-indigo-500
            transition ease-in-out duration-150 focus-link "
            >Login
        </a>
    {/if}
</div>

<style lang="postcss">
    .dropdown__button {
        @apply flex;
        @apply text-sm;
        @apply border-2;
        @apply border-transparent;
        @apply transition;
        @apply duration-150;
        @apply ease-in-out;
        &:focus {
            @apply outline-none;
            @apply border-gray-300;
        }
    }

    .dropdown__menu--inner {
        @apply py-1;
        @apply rounded-md;
        @apply bg-white;
        @apply shadow;
        @apply border;
    }

    .dropdown__item {
        @apply block;
        @apply px-4;
        @apply py-2;
        @apply text-sm;
        @apply leading-5;
        @apply text-gray-700;
        @apply transition;
        @apply duration-150;
        @apply ease-in-out;

        &:hover {
            @apply bg-gray-100;
        }
        &:focus {
            @apply outline-none;
            @apply bg-gray-100;
        }
    }

    .dropdown__item.selected {
        @apply bg-indigo-200;
    }

    .focus-link:focus {
        @apply outline-none;
        @apply ring-2;
        @apply ring-indigo-500;
    }
</style>
