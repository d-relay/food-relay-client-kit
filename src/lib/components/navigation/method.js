// import {} from 'svelte/store'
import { post } from "$lib/util";
import { locale } from "svelte-intl-precompile";
import { writable } from "svelte/store";

export async function logout($store) {
    await post("/auth/logout");
    $store.user = null;
    return;
}

export function updateLocale(lang, $store) {
    showLang.set(false);
    locale.set(lang);
    $store.locale = lang;
    return post("/lang", { lang });
}

export const showLang = writable(false);