<script lang="ts">
	import { elasticOut } from 'svelte/easing';
	import { blur, scale } from 'svelte/transition';
	import Modal from '$lib/Modal.svelte';
	import { name, phone, email, code, zip, nav, show_succ_mod } from '$lib/stores';
	import NavMenu from '$lib/NavMenu.svelte';
	import { page } from '$app/stores';
	import toast, { Toaster } from 'svelte-french-toast';
	import Input from '$lib/Input.svelte';
	import Select from '$lib/Select.svelte';
	import Phone from '$lib/Phone.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	import { browser } from '$app/environment';
	import { afterNavigate, onNavigate } from '$app/navigation';
	let page_data = [
		['Home'],
		['About Us'],
		['Investigations'],
		['Home'],
		['About Us'],
		['Investigations']
	];
	let pages_routes = [['about', 'About', 'Acerca']];
	let show = true;
	let interests = [
		'Phising tests',
		'Baiting tests',
		'Penetration Testing',
		'Pre-marital Investigations',
		'Fraud Investigation',
		'Adoption Tracing',
		'Tenant Screening'
	];

	$: show = browser && localStorage.getItem('interests') === null ? true : false;
	let page_name = true;
	onNavigate(() => {
		page_name = false;
		tick();
		setTimeout(() => {
			page_name = true;
		}, 300);
	});
	afterNavigate(() => {
		tick();
		const element = document.getElementById('top_of_page');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	});
	import { cubicOut, cubicIn } from 'svelte/easing';
	import { tick } from 'svelte';
	import MailHref from '$lib/MailHref.svelte';
	import InsureLogo from '$lib/content/InsureLogo.svelte';

	export function scaleup(node, { duration = 200 } = {}) {
		return {
			duration,
			css: (t) => {
				const eased = cubicOut(t);
				return `
          transform: scale(${1.07 - eased * 0.07});
          opacity: ${eased};
        `;
			}
		};
	}
	export function scaledown(node, { duration = 200 } = {}) {
		return {
			duration,
			css: (t) => {
				const eased = cubicIn(t);
				return `
          transform: scale(${0.93 + eased * 0.07});
          opacity: ${eased};
        `;
			}
		};
	}
	let owner_phone = '(321) 443 - 7405';
</script>

<div id="top_of_page" />
<section class="flex bg-gray-100">
	<section class="relative flex h-full w-screen">
		<section class="w-full">
			<section class="relative flex w-full">
				<div
					class:w-full={true}
					class:w-0={false}
					class="sticky top-16 mb-16 hidden h-[90%] w-full max-w-64 flex-col overflow-clip rounded-xl bg-gray-200 transition-all duration-200 md:max-w-80 xl:max-w-96"
				>
					<div class="h-full w-full bg-black"></div>
					<section class="flex w-full flex-col divide-y-[1px] divide-gray-100">
						<a href="/" class=" py-4 text-center text-lg">Call Now</a>
					</section>
				</div>
				{#if page_name === true}
					<div
						in:scaleup
						out:scaledown
						class="flex h-full w-full flex-col items-center justify-center"
					>
						<slot />
					</div>
				{:else}
					<div class="h-screen"></div>
				{/if}
			</section>
		</section>
	</section>
</section>

<div
	class:hidden={$page.url.pathname.split('/')[2] === 'client'}
	class="absolute left-0 top-0 z-20 flex w-full items-center justify-between p-8"
>
	<div class="flex w-full items-center justify-start space-x-4">
		<a class="h-min" href={`/${data.lang}/home`}>
			<InsureLogo></InsureLogo>
		</a>
	</div>

	<div class=" flex w-full items-center justify-end space-x-4">
		<a
			class="w-fit rounded-full bg-gray-200 px-8 py-1 font-medium text-gray-500 shadow hover:opacity-50"
			href={data.lang === 'es' ? '/en/home' : '/es/home'}
			>{data.lang === 'es' ? 'English' : 'Español'}</a
		>
	</div>
</div>

<button
	on:click={() => {
		$nav = false;
	}}
	class:hidden={!$nav}
	class="fixed left-0 top-0 z-40 h-screen w-screen bg-gray-800/10 md:hidden"
></button>
<button
	on:click={() => {
		$nav = false;
	}}
	class:hidden={!$nav}
	class="animate-in absolute right-9 top-[4.5rem] z-50 flex w-40 flex-col items-start justify-start rounded-md bg-gray-100 text-sm font-light text-gray-700 shadow md:hidden"
>
	<div class="absolute right-2 top-0 size-4 -translate-y-2 rotate-45 rounded-sm bg-gray-100"></div>
	{#each pages_routes as pr}
		<a
			class:underline={$page.url.pathname.split('/')[2].toLowerCase() === pr[0].toLowerCase()}
			class="w-full px-2 py-1 text-start hover:bg-gray-200"
			href={`/${data.lang}/${pr[0]}`}>{data.lang === 'es' ? pr[2] : pr[1]}</a
		>
	{/each}

	<a
		href={data.lang === 'es' ? '/en/home' : '/es/home'}
		class="w-full bg-gray-200 px-2 py-1 text-start hover:bg-indigo-200"
		>{data.lang === 'es' ? 'English' : 'Español'}</a
	>
</button>

<Modal bind:showModal={$show_succ_mod}>
	<section class="flex h-full w-full flex-col items-center justify-center text-center">
		<p class="text-2xl font-bold">
			{data.lang === 'es'
				? 'Gracias por solicitar una cotización'
				: 'Thank you for requesting a quote.'}
		</p>
		<p class="text-lg font-light">
			{data.lang === 'es'
				? 'Queremos ofrecer el precio más bajo y la mejor cobertura possible para que una persona con licencia. El agente de seguros se comunicará con usted en breve con diferentes cotizaciones y opciones. en función de su situación personal. Este paso es para ver qué descuentos calificas para ahorrarle dinero y al mismo tiempo asegurarse de tener la cobertura que necesita necesidad.'
				: 'A licensed health advisor will contact you shortly to review all of the available options in your area and see what special offers you can qualify for, if any.'}
		</p>
		<p>
			{data.lang === 'es'
				? 'Si no recibe noticias de alguien en los próximos 5 minutos, comuníquese con nosotros a:'
				: ' If you have not been contacted within 24 hours of submitting your request, please reach out at:'}
		</p>
		<MailHref></MailHref>
	</section>
</Modal>
