<script context="module">
    export function load({ session: { user } }) {
        return user ? { props: { user } } : { status: 302, redirect: "/login" };
    }
</script>

<script>
    export let user;
    import { t } from "svelte-intl-precompile";

    import Input from "$lib/components/input.svelte";
    import Submit from "$lib/components/submit.svelte";

    function handleSubmit() {
        // await api.location.updateLocation(
        //     { city, street, house, corps, entrance, floor, flat },
        //     token
        // );
        return "";
    }
</script>

<main class="lg:relative container mx-auto">
    <header class="lg:pt-6 md:pt-4 pt-2 px-4 sm:px-0">
        <h1 class="text-xl sm:text-2xl md:text-3xl">
            {$t('tab.hello')} <span class="font-semibold">{user.display_name} 🤗</span>
        </h1>
    </header>
    <section class="rounded overflow-hidden shadow-lg sm:border relative lg:my-6 md:my-4 my-2">
        <header class="border-b bg-gray-50 p-6">
            <h2 class="text-lg leading-6 font-medium text-gray-900">
                {$t('location.title')}
            </h2>
        </header>
        <form on:submit|preventDefault={handleSubmit} class="p-6">
            <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 mb-6">
                <Input
                    type="text"
                    component="location"
                    name="region"
                    autocomplete="shipping "
                    placeholder="Область"
                    required="true"
                />
                <Input
                    type="text"
                    component="location"
                    name="city"
                    autocomplete="shipping address-level2"
                    placeholder="Київ"
                    required="true"
                />
            </div>
            <div class="grid gap-5 grid-cols-1 sm:grid-cols-3 mb-6">
                <Input
                    type="text"
                    component="location"
                    name="street"
                    autocomplete="shipping street-address"
                    placeholder="Шевченка"
                    required="true"
                />
                <Input
                    type="text"
                    component="location"
                    name="house"
                    autocomplete="shipping"
                    required="true"
                />
                <Input type="text" component="location" name="corps" />
            </div>
            <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 mb-6">
                <Input type="text" component="location" name="entrance" />
                <Input type="text" component="location" name="floor" />
            </div>
            <div class="grid gap-5 grid-cols-1 sm:grid-cols-3 mb-6">
                <Submit text={$t("location.verify")} />
            </div>
        </form>
    </section>
</main>
