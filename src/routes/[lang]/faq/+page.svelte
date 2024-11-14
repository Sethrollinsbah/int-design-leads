<script>
	import { page } from '$app/stores';
	import FAQ from '$lib/FAQ.svelte';
	import MailHref from '$lib/MailHref.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	import { faq, faq_es } from '$lib/content/faq';
</script>

<section
	class="relative mx-auto grid min-h-[100dvh] w-[90%] max-w-6xl grid-cols-5 gap-x-4 space-y-8 pt-24 sm:grid-cols-2"
>
	<div class="col-span-full mx-auto flex w-full flex-col items-start justify-start md:col-span-1">
		<p
			class="bg-gradient-to-br from-neutral-700/90 to-neutral-800 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl"
		>
			{#if $page.data.lang !== 'es'}
				Questions?
			{:else}Pregunta?
			{/if}
		</p>
	</div>
	<div
		class="col-span-full mr-auto flex h-full w-full max-w-md flex-col items-start justify-start font-light text-gray-600 md:col-span-1 md:ml-auto"
	>
		<p>
			{#if $page.data.lang !== 'es'}
				If you have any questions, we have answers for you here. Incase we didn't answer it, feel
				free to email us at
				<MailHref></MailHref>
			{:else}
				Si tienes alguna pregunta, aquí tenemos respuestas para ti. En caso de que no la hayamos
				respondido, no dudes en enviarnos un correo a
				<MailHref></MailHref>
			{/if}
		</p>
		<!-- <Textarea></Textarea> -->
	</div>

	<FAQ
		title="General Questions"
		faq={$page.data.lang === 'es' ? Object.entries(faq_es) : Object.entries(faq)}
	></FAQ>
</section>
