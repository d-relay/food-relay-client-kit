<script context="module">
	import { dev } from "$app/env";
	import { session } from "$app/stores";
	export const hydrate = dev;
</script>

<script>
	import {
		addMessages,
		init,
		getLocaleFromNavigator,
	} from "svelte-intl-precompile";
	import en from "$lib/locales/en.json";
	import ru from "$lib/locales/uk.json";
	import uk from "$lib/locales/ru.json";

	import Header from "$lib/components/navigation/Header.svelte";

	addMessages("en", en);
	addMessages("uk", uk);
	addMessages("ru", ru);

	init({ fallbackLocale: "en", initialLocale: getLocaleFromNavigator() });

	console.log($session.user)
</script>

<Header />

<slot />
