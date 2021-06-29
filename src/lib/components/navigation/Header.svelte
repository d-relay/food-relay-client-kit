<script>
  import { session } from "$app/stores";
  import Hamburger from "../../assets/icons/Hamburger.svelte";

  import LeftSideMenu from "./LeftSideMenu.svelte";
  import RightSideMenu from "./RightSideMenu.svelte";
  import MobileSidebar from "./MobileSidebar.svelte";

  // export let segment;

  let mobileMenuOpen = false;
  $: user = $session.user;

  function handle_keydown(e) {
    if (e.key === "Escape") {
      return (mobileMenuOpen = false);
    }
  }
</script>

<svelte:window on:keydown={handle_keydown} on:click={handle_keydown} />

<nav class="nav shadow-main">
  <div class="lg:relative container mx-auto">
    <div class="menu">
      <div class="hamburger_menu">
        <button
          on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
          class="hamburger__button"
          aria-label="Main menu"
          aria-expanded="false"
        >
          <Hamburger open={mobileMenuOpen} />
        </button>
      </div>
      <LeftSideMenu />
      <RightSideMenu {user} />
    </div>
  </div>

  {#if mobileMenuOpen}
    <MobileSidebar />
  {/if}
</nav>

<style lang="scss">
  .nav {
    @apply bg-white;
    @apply shadow;
    @apply relative;
    @apply z-10;
  }

  .menu {
    @apply relative;
    @apply flex;
    @apply justify-between;
    @apply h-16;
  }

  .hamburger_menu {
    @apply absolute;
    @apply inset-y-0;
    @apply left-0;
    @apply flex;
    @apply items-center;
  }

  .hamburger__button {
    @apply inline-flex;
    @apply items-center;
    @apply justify-center;
    @apply p-2;
    @apply rounded-md;
    @apply text-gray-400;
    @apply transition;
    @apply duration-150;
    @apply ease-in-out;
    &:hover {
      @apply text-gray-500;
      @apply bg-gray-100;
    }
    &:focus {
      @apply outline-none;
      @apply bg-gray-100;
      @apply text-gray-500;
    }
  }
  @media (min-width: 640px) {
    .hamburger_menu {
      display: none;
    }
  }
</style>
