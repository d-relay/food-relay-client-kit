<script context="module">
	import * as locales from "svelte-intl-precompile";
	import en from "$lib/locales/en.json";
	import ru from "$lib/locales/uk.json";
	import uk from "$lib/locales/ru.json";

	locales.addMessages("en", en);
	locales.addMessages("uk", uk);
	locales.addMessages("ru", ru);

	locales.init({
		fallbackLocale: "en",
		initialLocale: locales.getLocaleFromNavigator(),
	});
</script>

<script>
	import Header from "$lib/components/navigation/Header.svelte";
</script>

<Header />
<slot />
