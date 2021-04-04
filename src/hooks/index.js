import { getCookie } from "$lib/util";

export function getContext({ headers }) {
	const cookies = getCookie(headers.cookie, 'jwt');
	const jwt = cookies && Buffer.from(cookies, 'base64').toString('utf-8');
	return { user: jwt ? JSON.parse(jwt) : null }
}

export function getSession({ context }) {
	return {
		user: context.user && {
			email: context.user?.email,
			picture: context.user?.picture,
			display_name: context.user?.display_name,
		},
	};
}

