<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import Layout from '$lib/Layout.svelte';

	export let data: LayoutData;

	const page_lang = data.lang || 'en';
</script>

<Layout {data} {page_lang}><slot /></Layout>
