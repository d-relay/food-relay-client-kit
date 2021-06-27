<script>
	import { session } from "$app/stores";

	import {
		register,
		init,
		locale,
		getLocaleFromNavigator,
	} from "svelte-intl-precompile";

	import Header from "$lib/components/navigation/Header.svelte";

	register("en", () => import("$lib/locales/en.json"));
	register("ru", () => import("$lib/locales/ru.json"));
	register("uk", () => import("$lib/locales/uk.json"));

	init({
		fallbackLocale: "en",
		initialLocale: getLocaleFromNavigator($session.locale),
	});
	
	locale.set($session.locale);
</script>

<Header />

<slot />

<style windi:preflights:global windi:safelist:global></style>
