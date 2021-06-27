import { parseLocale, parseUser } from "$lib/util";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	request.locals.user = parseUser(request.headers.cookie);
	request.locals.locale = parseLocale(request.headers);

	const response = await resolve(request);
	return {
		...response,
		headers: {
			...response.headers,
			user: request.locals.user,
			locale: request.locals.locale,
		},
	};
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
	return {
		user: request.locals.user && {
			email: request.locals.user?.email,
			picture: request.locals.user?.picture,
			display_name: request.locals.user?.display_name,
		},
		locale: request.locals.locale,
	};
}
