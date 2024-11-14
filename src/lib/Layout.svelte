<script lang="ts">
	import { fade } from 'svelte/transition';
	import toast, { Toaster } from 'svelte-french-toast';
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;

	export const page_lang = data.lang || 'en';

	// Get the current URL dynamically
	$: currentUrl = $page.url.href;
	const burialInsuranceKeywords: string[] = [
		// General Keywords
		'Burial insurance',
		'Funeral insurance',
		'Final expense insurance',
		'Life insurance for burial',
		'Affordable burial insurance',
		'Pre-need funeral insurance',
		'Guaranteed issue life insurance',
		'Funeral cost insurance',
		'Burial coverage',
		'Cemetery insurance',

		// Related Search Terms
		'Affordable funeral plans',
		'Prepaid funeral plans',
		'Funeral expenses',
		'End-of-life insurance',
		'Last expense insurance',
		'Final expense plans',
		'Funeral services coverage',
		'Prepaid burial plans',
		'Life insurance for seniors',
		'Life insurance for end of life',

		// Location-Specific Keywords
		'Burial insurance in [City/State]',
		'Funeral insurance in [City/State]',
		'Final expense insurance [City/State]',
		'Prepaid burial plans [City/State]',
		'[City/State] funeral coverage',

		// Insurance-related Keywords
		'No medical exam burial insurance',
		'Instant approval burial insurance',
		'Whole life burial insurance',
		'Guaranteed acceptance life insurance',
		'Senior burial insurance plans',
		'Simple burial insurance',
		'Best burial insurance plans',
		'Funeral insurance for seniors',

		// Long-Tail Keywords
		'How to pay for funeral costs with burial insurance',
		'Best burial insurance plans for seniors',
		'What is final expense insurance and how does it work?',
		'Low-cost burial insurance'
	];
	export const meta = {
		twitterHandle: null,
		keywords: burialInsuranceKeywords,
		author: 'Seth Ryan Rollins',

		title: 'Donna Marie Reese Insurance.',
		description: 'Donna Marie Reese gets you amazing deals on health insurance',
		image: '/businesscard.webp',
		image_alt: 'Famile'
	};
</script>

<svelte:head>
	<!-- Google tag (gtag.js) -->
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta http-equiv="x-ua-compatible" content="IE=edge" />
	<meta name="robots" content="index, follow" />

	<!-- Primary Meta Tags -->
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />
	<meta name="keywords" content={meta.keywords.join(', ')} />
	<meta name="author" content={meta.author} />

	<!-- Open Graph / Facebook Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.image} />
	<meta property="og:image:alt" content={meta.image_alt} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:site_name" content="Your Website Name" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.image} />
	<meta name="twitter:image:alt" content={meta.image_alt} />
	{#if meta.twitterHandle}
		<meta name="twitter:site" content={meta.twitterHandle} />
		<meta name="twitter:creator" content={meta.twitterHandle} />
	{/if}

	<!-- Additional SEO Meta Tags -->
	<link rel="canonical" href={currentUrl} />
	<meta name="theme-color" content="#000000" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="format-detection" content="telephone=no" />

	<!-- Favicon and App Icons -->
	<link rel="icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />

	<!-- Schema.org for Google -->
	<script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": meta.title,
      "description": meta.description,
      "url": currentUrl,
      "image": meta.image,
      "author": {
        "@type": "Organization",
        "name": meta.author,
      },
    })}
	</script>
</svelte:head>

<section class="flex h-screen w-screen overflow-x-clip overflow-y-scroll bg-gray-100">
	<section class="relative flex h-full w-screen">
		<section class="w-full">
			<slot />
			<section class="h-full w-fit max-w-sm sm:max-w-none md:mx-auto">
				<div class="flex h-full w-full flex-col items-center justify-center">
					<div
						class="group absolute right-1/2 mx-auto mb-4 flex aspect-[3/4] h-[30rem] min-h-80 w-fit translate-x-1/2 flex-col justify-between rounded-lg bg-green-600 p-8 font-serif text-gray-50 shadow-2xl ring-1 ring-black/10 sm:hidden md:hidden lg:hidden xl:hidden"
					>
						<div>
							<p class="text-3xl">
								{#if $page.data.lang === 'es'}
									Ojalá que el año termine<br /> y tu trabajo lo haga
								{:else}
									Hope This Year Ends<br /> Before You Do
								{/if}
							</p>
							<p class="mt-auto text-lg text-green-100">
								Let us cover your funeral. Get Burial Insurance Today
							</p>
						</div>
						<div class="flex flex-row-reverse items-end justify-between text-end">
							<div class="flex flex-col justify-end">
								<p class="font-bold">
									Donna Marie Baker<br /><span class="font-light text-gray-200">
										Life Insurance Agent</span
									>
								</p>
							</div>
							<div>
								<button
									on:click={() => {
										tick();
										goto('/');
										tick();
										const element = document.getElementById('top_of_page');
										if (element) {
											element.scrollIntoView({ behavior: 'smooth' });
										}
									}}
									class="mx-auto mt-4 rounded-full border-t-[1px] border-green-600 bg-green-100 px-3 py-2 text-base font-semibold text-green-600 shadow ring-1 ring-red-100"
									>{data.lang === 'es' ? 'Rodar ahora' : 'Enroll now!'}
								</button>
							</div>
						</div>
					</div>
					<div
						class:hidden={$page.url.pathname !== '/backoffice'}
						class="group absolute right-1/2 mx-auto mb-4 hidden h-full max-h-96 min-h-80 w-full translate-x-1/2 flex-col justify-between rounded-lg bg-green-600 p-8 font-serif text-gray-50 shadow-2xl ring-1 ring-black/10 sm:flex sm:w-[48rem] sm:scale-[70%] md:relative md:right-0 md:translate-x-0 md:scale-[90%] lg:scale-100"
					>
						<div class="">
							<p class="text-4xl">
								{#if $page.data.lang === 'es'}
									Ojalá que el año termine<br /> y tu trabajo lo haga
								{:else}
									Hope This Year Ends<br /> Before You Do
								{/if}
							</p>
							{#if $page.data.lang === 'es'}
								<p class="mt-auto text-lg">Protéjase de su empleador</p>
							{:else}
								<p class="mt-auto text-lg">Let us cover your funeral. Get Burial Insurance Today</p>
							{/if}
						</div>
						<div class="flex items-end justify-between">
							<div>
								<button
									on:click={() => {
										tick();
										goto('/');
										tick();
										const element = document.getElementById('top_of_page');
										if (element) {
											element.scrollIntoView({ behavior: 'smooth' });
										}
									}}
									class="mx-auto mt-4 rounded-full border-t-[1px] border-green-600 bg-green-100 px-8 py-2 text-lg font-semibold text-green-600 shadow ring-1 ring-red-100"
									>{data.lang === 'es' ? 'Rodar ahora' : 'Enroll now!'}
								</button>
							</div>
							<p class="font-bold">
								Donna Marie Baker<span class="ml-2 font-light text-gray-200">
									Life Insurance Agent</span
								>
							</p>
						</div>
					</div>
				</div>
			</section>

			<footer
				class="flex h-fit min-h-16 w-full flex-col items-center justify-between space-y-2 bg-gray-200 px-4 py-4 text-center text-xs font-light text-gray-600 md:flex-row md:space-y-0 md:text-end"
			>
				<div class="flex divide-x-[1px] divide-gray-400/50">
					<button>Enroll Now</button>
				</div>
				{#if data.lang === 'es'}
					<p class="">
						Copyright © 2024 Donna Marie Reese. Todos los derechos reservados.
						<br />
						<!-- <i>Número de licencia: G1341031 </i> -->
					</p>
				{:else}
					<p>
						Copyright © 2024 Donna Marie Reese. All rights reserved.
						<br />
						<!-- <i class="mx-auto"> License number: G1341031 </i> -->
					</p>
				{/if}
			</footer>
		</section>
	</section>
</section>

<Toaster />
