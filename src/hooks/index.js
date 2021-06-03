import { getCookie } from "$lib/util";
// import { appAuth } from "$lib/appAuth";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, render }) {
	const cookies = getCookie(request.headers.cookie, 'jwt');
	const jwt = cookies && Buffer.from(cookies, 'base64').toString('utf-8');
	request.locals.user = jwt && JSON.parse(jwt);

	const response = await render(request);

	return {
		...response,
		headers: {
			...response.headers,
			user: jwt ? JSON.parse(jwt) : null
		}
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
	};
}
