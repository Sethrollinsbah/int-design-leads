import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ url, params }) => {
  const lang = '/' + 'en' + '/home';
  redirect(300, lang);
};
