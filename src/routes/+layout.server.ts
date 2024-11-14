import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, url }) => {
	const lang = params.lang || 'en';
	const page = url.pathname.split('/')[1];
	console.log('page' + page);
	if (page !== 'es' && page !== 'en' && page !== 'demo') {
		throw redirect(302, '/en/home');
	}
	return {
		lang
	};
};
