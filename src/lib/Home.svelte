<script lang="ts">
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { show_succ_mod } from '$lib/stores.ts';
	import Input from '$lib/Input.svelte';
	import Phone from '$lib/Phone.svelte';
	import toast from 'svelte-french-toast';
	import { faq, faq_es } from '$lib/content/faq';
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/stores';
	import Calendar from './Calendar.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils.js';
	import InsureLogo from './content/InsureLogo.svelte';
	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	// let value:
	export let data;
	export let company = ['/aetna.png', '/cigna.png', '/blue_cross.png', '/united_healthcare.png'];

	let value: DateValue | undefined = undefined;
	let form_q = {
		name: {
			value: '',
			placeholder: 'Name',
			eg: 'Carl'
		},
		house: ['1', '2', '3', '4+'],
		age: value,
		zip: '',
		phone: '',
		email: ''
	};

	type CustomerData = {
		coverage_type: string;
		name: string | null;
		lastName: string | null;
		phone: string;
		code: string; // Assuming 'US' is a string code
		dob: string | null; // Date of birth as a string (e.g., "YYYY-MM-DD"), or use `Date` if needed
		house: string;
		age: DateValue | undefined; // `undefined` by default
		zip: string | null;
		email: string;
	};

	let customer_data: CustomerData = {
		coverage_type: '',
		name: null,
		lastName: null,
		phone: '',
		code: 'US',
		dob: null,
		house: '',
		age: undefined,
		zip: null,
		email: ''
	};

	let show = 0;
	let show_percent = 1;

	$: show_percent = parseFloat((1 - show / 6).toFixed(2)) * 100;
	export let background = '/bg.jpg';
	export let section_one = {
		background: '/couple.jpg',
		content: [
			[
				'Conozca',
				'Permite a las personas que participan en un plan de salud grupal de su empleador continuar pagando por ese plan cuando de otro modo terminaría.',
				'Learn About',
				' permits individuals who participate in an employer’s group health plan, to continue paying for that plan with no employer discount to retain their coverage when it would otherwise end.'
			],
			[
				'Planes Alternativos Asequibles',
				'Explore planes calificados a nivel federal con subsidios que reducen su prima mensual, cubriendo condiciones preexistentes de manera asequible.',
				'Affordable Alternative Plans',
				'Explore affordable options that offer reduced rates and increased coverage based on having a decent health history.'
			]
		],
		category: {
			en: 'Benefits',
			es: 'Seguro de Entierro'
		},
		header: {
			en: "Why switch from your employer's plan?",
			es: 'Una manera fácil y eficiente de encontrar el plan de seguro de salud perfecto!'
		},
		subheader: {
			en: "Why switch from your employer's plan?",
			es: 'Una manera fácil y eficiente de encontrar el plan de seguro de salud perfecto!'
		}
	};
	export let section_two = {
		content: [
			[
				'Comparte tu Historia',
				'Danos los detalles necesarios para encontrar la mejor opción de seguro para ti',
				'Share Your Story',
				'Give us the details we need to find the best insurance option for you'
			],
			[
				'Descubre tus Opciones',
				'Explora las opciones disponibles junto a uno de nuestros agentes expertos',
				'Discover Your Options',
				'Explore the available options with one of our expert agents'
			],
			[
				'Obtén tu Plan',
				'Consigue el plan de seguro más asequible y adecuado en tu estado',
				'Get Your Plan',
				'Get the most affordable and suitable insurance plan in your state'
			]
		],
		category: {
			en: 'Burial Insurance',
			es: 'Seguro de Entierro'
		},
		subheader: {
			en: "Why switch from your employer's plan?",
			es: 'Una manera fácil y eficiente de encontrar el plan de seguro de salud perfecto!'
		},
		header: {
			en: "Why switch from your employer's plan?",
			es: 'Una manera fácil y eficiente de encontrar el plan de seguro de salud perfecto!'
		}
	};
</script>

<section
	class="relative mb-24 flex h-[80vh] min-h-[30rem] w-full flex-col items-center justify-between bg-gray-300 pt-32"
>
	<div
		class={`absolute left-0 top-0 h-full w-full overflow-clip bg-cover bg-center`}
		style={`background-image: url(${background})`}
	>
		<div
			class="absolute left-0 top-0 size-96 -translate-x-1/2 -translate-y-1/2 scale-125 rounded-full ring-1 ring-gray-600/20"
		></div>
		<div
			class="absolute left-0 top-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-gray-600/30"
		></div>
		<div
			class="absolute bottom-0 right-0 size-96 translate-x-1/2 translate-y-3/4 scale-150 rounded-full ring-1 ring-gray-600/20"
		></div>
		<div
			class="absolute bottom-0 right-0 size-96 translate-x-1/2 translate-y-1/2 rounded-full ring-1 ring-gray-600/30"
		></div>
		<div class="absolute left-0 top-0 h-full w-full bg-black/50"></div>
	</div>
	<div
		class="flex h-full w-[90%] flex-col items-start justify-start md:grid md:grid-cols-2 md:items-center"
	>
		<div
			class="mb-auto flex w-full max-w-sm flex-col items-start justify-start md:max-w-none md:items-start"
		>
			<p
				class="relative z-10 mt-20 w-full bg-gradient-to-br from-gray-100/80 via-gray-100 to-gray-200 bg-clip-text text-start text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl"
			>
				<span
					class="absolute -top-8 rounded-full bg-green-200 px-2 py-1 text-xs font-light text-green-700 ring-1 ring-green-700 sm:text-sm"
					>{data.lang === 'es' ? 'Mejor calificado en Missouri' : 'Top Rated in Missouri'}</span
				>
				<slot name="Title">
					<span class:hidden={data.lang !== 'es'}>Alternativa<br />a burial asequible</span>
					<span class:hidden={data.lang === 'es'}>Affordable<br />burial Alternative</span>
				</slot>
			</p>
			<p
				class="z-10 bg-gradient-to-br from-gray-100/80 via-gray-100 to-gray-200 bg-clip-text text-start text-base font-bold text-transparent md:relative"
			>
				<slot name="Subtitle">
					<span class="text-base font-light" class:hidden={data.lang !== 'es'}
						>Vea la cobertura disponible en su estado, con la flexibilidad de solicitar e
						inscribirse en línea</span
					>
					<span class="text-base font-light" class:hidden={data.lang === 'es'}
						>View the available coverage in your state, with the flexibility to apply & enroll
						online</span
					>
				</slot>
			</p>
		</div>
		<div
			class="absolute top-0 h-full w-full scale-75 object-cover opacity-50 md:relative md:scale-100 md:opacity-100"
		></div>
	</div>
	<div
		class="absolute bottom-0 z-20 h-fit w-[90%] max-w-4xl translate-y-36 overflow-clip rounded-3xl bg-gray-100 shadow-xl sm:translate-y-24"
	>
		<p
			class:hidden={show >= 7}
			class="flex h-fit w-full justify-between bg-green-200 px-4 py-4 text-center font-bold text-green-950"
		>
			<span class="my-auto size-5"
				><button
					aria-label="back"
					class:hidden={show === 0}
					class="size-5"
					on:click={() => {
						show = show - 1;
					}}
				>
					<svg
						viewBox="0 0 24 24"
						class="size-full stroke-red-800 stroke-2"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<path d="M14.5 17L9.5 12L14.5 7" stroke-linecap="round" stroke-linejoin="round"
							></path>
						</g></svg
					></button
				></span
			>

			{show === 0
				? data.lang === 'es'
					? '¿Cuál es tu nombre y apellido?'
					: 'What is your first and last name?'
				: show === 1
					? data.lang === 'es'
						? '¿Cuál es el tamaño de su hogar?'
						: 'What is your household size?'
					: show === 2
						? data.lang === 'es'
							? '¿Cuál es su fecha de nacimiento?'
							: 'What is your DOB?'
						: show === 3
							? data.lang === 'es'
								? '¿Cuál es su código postal?'
								: 'What is your zip code?'
							: show === 4
								? data.lang === 'es'
									? '¿Cuál es tu número de teléfono?'
									: 'What is your phone number?'
								: show === 5
									? data.lang === 'es'
										? '¿Cuál es tu correo electrónico?'
										: 'What is your email?'
									: show === 6
										? data.lang === 'es'
											? '¿Cuál es tu correo electrónico?'
											: 'What is your email?'
										: data.lang === 'es'
											? 'Gracias por tu paciencia.'
											: 'Thank you for your patience.'}
			<span class="size-5"></span>
		</p>

		<div class="w-full p-8">
			<div class="relative h-4 w-full overflow-clip rounded-full ring-1 ring-gray-600">
				<div
					class="absolute left-0 top-0 flex h-4 w-full justify-end rounded-full bg-green-600 transition-all duration-300 ease-in-out"
					style="transform: translateX({-show_percent}%);"
				>
					<p class="z-10 ml-auto pr-2 text-xs text-white">
						{(100 - show_percent).toFixed(0)}%
					</p>
				</div>
			</div>

			<div class="relative flex h-32 w-full items-center justify-between pt-4">
				{#if show < 6}
					{#each Object.entries(form_q) as [key, value], i}
						<div
							class:scale-50={show > i || show < i}
							class:-translate-x-full={show > i}
							class:translate-x-full={show < i}
							class:opacity-0={show !== i}
							class:opacity-100={show === i}
							class="absolute left-0 top-4 grid h-fit w-full grid-cols-2 justify-evenly gap-4 transition-all duration-300 md:flex md:space-x-4"
						>
							{#if show < 7}
								{#if key === 'name'}
									<div class="relative col-span-full flex h-full w-full flex-col">
										<div class="grid h-full min-h-16 w-full grid-cols-2 gap-2">
											<Input
												boolean_disabled={false}
												className=""
												bind:value_place={customer_data.name}
												placeholder={data.lang === 'es' ? 'Nombre de pila' : 'First Name'}
												placeholder_eg={'John'}
											></Input>
											<Input
												boolean_disabled={false}
												className=""
												bind:value_place={customer_data.lastName}
												placeholder={data.lang === 'es' ? 'Apellido' : 'Last Name'}
												placeholder_eg={'Doe'}
											></Input>
										</div>
										<button
											on:click={() => {
												console.log(customer_data.name);
												if (
													customer_data.lastName === null ||
													(customer_data.lastName !== null && customer_data.lastName === '') ||
													customer_data.name === null ||
													(customer_data.name !== null && customer_data.name === '')
												) {
													if (data.lang === 'es') {
														toast.error('Por favor, introduzca su nombre');
													} else {
														toast.error('Please enter your name');
													}
												} else {
													show += 1;
												}
											}}
											class="absolute right-1/2 top-20 mx-auto mt-auto w-fit max-w-xs translate-x-1/2 rounded-md bg-green-600 px-6 py-2 text-lg font-medium text-gray-100"
										>
											{data.lang === 'es' ? 'Continuar' : 'Continue'}
										</button>
									</div>
								{:else if key === 'email'}
									<div class="relative col-span-full flex h-full w-full flex-col">
										<Input
											boolean_disabled={false}
											className="w-full h-full min-h-16"
											bind:value_place={customer_data.email}
											placeholder={'Email Address'}
											placeholder_eg={'info@sethrollins.dev'}
										></Input>
										<button
											on:click={async () => {
												console.log(customer_data.email);
												const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
												if (
													customer_data.email === null ||
													customer_data.email.length === 0 ||
													!emailRegex.test(customer_data.email?.trim())
												) {
													if (data.lang === 'es') {
														toast.error('Por favor, introduzca su correo electrónico');
													} else {
														toast.error('Please enter your email');
													}
												} else {
													show += 1;
													$show_succ_mod = true;
													await fetch('/api/upload_lead', {
														method: 'POST',
														body: JSON.stringify({
															leadName: customer_data.name,
															data: customer_data
														})
													});
												}
											}}
											class="relative mx-auto w-fit max-w-xs rounded-md bg-green-600 px-6 py-2 text-lg font-medium text-gray-100"
										>
											{data.lang === 'es' ? 'Continuar' : 'Continue'}
										</button>
									</div>
								{:else if key === 'age'}
									<div class="relative col-span-full flex h-full w-full flex-col">
										<Popover.Root>
											<Popover.Trigger asChild let:builder>
												<Button
													variant="outline"
													class={cn(
														'mx-auto mb-4 min-h-16 w-[280px] justify-start text-left font-normal',
														!customer_data.age && 'text-muted-foreground'
													)}
													builders={[builder]}
												>
													<CalendarIcon class="mr-2 h-4 w-4" />
													{customer_data.age
														? df.format(customer_data.age.toDate(getLocalTimeZone()))
														: $page.data.lang === 'es'
															? 'Elige una fecha'
															: 'Pick a date'}
												</Button>
											</Popover.Trigger>
											<Popover.Content class="w-auto p-0">
												<Calendar bind:value={customer_data.age} initialFocus />
											</Popover.Content>
										</Popover.Root>
										<button
											on:click={async () => {
												if (customer_data.age === null) {
													if (data.lang === 'es') {
														toast.error('Por favor ingrese su edad');
													} else {
														toast.error('Please enter your age');
													}
												} else {
													customer_data.dob = `${customer_data.age.year}`;
													show += 1;
												}
											}}
											class="relative mx-auto w-fit max-w-xs rounded-md bg-green-600 px-6 py-2 text-lg font-medium text-gray-100"
										>
											{data.lang === 'es' ? 'Continuar' : 'Continue'}
										</button>
									</div>
								{:else if key === 'zip'}
									<div class="relative col-span-full flex h-full w-full flex-col">
										<Input
											boolean_disabled={false}
											className="w-full h-full min-h-16"
											bind:value_place={customer_data.zip}
											placeholder={'Zip Code'}
											placeholder_eg={'12345'}
										></Input>
										<button
											on:click={() => {
												console.log(customer_data.zip);
												const isNumeric = (str) => /^[0-9]+$/.test(str);
												if (
													customer_data.zip === null ||
													customer_data.zip.length === 0 ||
													customer_data.zip.length !== 5 ||
													!isNumeric(customer_data.zip)
												) {
													if (data.lang === 'es') {
														toast.error('Por favor ingrese su código postal');
													} else {
														toast.error('Please enter your zip code');
													}
												} else {
													show += 1;
												}
											}}
											class="relative mx-auto w-fit max-w-xs rounded-md bg-green-600 px-6 py-2 text-lg font-medium text-gray-100"
										>
											{data.lang === 'es' ? 'Continuar' : 'Continue'}
										</button>
									</div>
								{:else if key === 'phone'}
									<div class="relative col-span-full flex h-full w-full flex-col">
										<Phone
											bind:code={customer_data.code}
											valu={data.lang === 'es' ? 'Teléfono' : 'Phone'}
											bind:number={customer_data.phone}
										></Phone>
										<button
											on:click={() => {
												const trimNonNumeric = (str) => str.replace(/[^0-9]/g, '');
												if (
													customer_data.phone === null ||
													trimNonNumeric(customer_data.phone).length !== 10
												) {
													toast.error('Please enter your phone number');
												} else {
													show += 1;
												}
											}}
											class="relative mx-auto w-fit max-w-xs rounded-md bg-green-600 px-6 py-2 text-lg font-medium text-gray-100"
										>
											{data.lang === 'es' ? 'Continuar' : 'Continue'}
										</button>
									</div>
								{:else}
									{#each value as c}
										<button
											class="h-fit w-full rounded-xl bg-gray-50 py-4 capitalize shadow ring-1 ring-gray-200 transition-all duration-300 hover:bg-green-600 hover:text-gray-100 active:scale-95"
											on:click={() => {
												customer_data.house = c;
												show = 1 + i;
											}}>{c}</button
										>
									{/each}
								{/if}
							{/if}
						</div>
					{/each}
					<!-- {/if} -->
				{:else}
					<div class="m-auto flex flex-col">
						<p class="col-span-full mx-auto mb-4 w-full max-w-xs text-gray-600">
							{data.lang === 'es' ? 'Estamos llamando ahora mismo' : 'We are calling right now'}
						</p>
						<div class="m-auto grid h-fit w-full max-w-12 grid-cols-3">
							{#each Array.from({ length: 3 }) as _, i}
								<div
									class="m-auto size-2 grow rounded-full bg-gray-600"
									class:grow={i === 0}
									class:grow1={i === 1}
									class:grow2={i === 2}
								></div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
<div class="grid w-[90%] max-w-xl grid-cols-2 items-center justify-evenly pt-16 sm:flex">
	{#each company as c}
		<img alt="insurance company" src={c} class="mx-auto size-16 object-contain" />
	{/each}
</div>
<div class="mt-4 h-[1px] w-[80%] max-w-sm bg-gray-200"></div>
<p class="font-bold text-gray-500">
	{data.lang === 'es' ? section_one.category.es : section_one.category.en}
</p>
<div class="grid w-[90%] grid-cols-1 gap-6 pt-8 lg:grid-cols-[1fr_400px]">
	<div class="mx-auto max-w-3xl">
		<p class="max-w-2xl text-start text-2xl font-bold text-gray-700 sm:text-3xl lg:text-4xl">
			{data.lang === 'es' ? section_one.header.es : section_one.header.en}
		</p>
		<p class="my-4 max-w-3xl text-start text-base font-light text-gray-500 sm:text-lg lg:text-xl">
			{data.lang === 'es' ? section_one.subheader.es : section_one.subheader.en}
		</p>
		<div class=" w-[90%] max-w-4xl gap-6">
			{#each section_one.content as hiw}
				<div class="mt-4 h-fit w-full rounded-2xl text-start">
					<p class="text-xl font-bold text-gray-500">
						{data.lang === 'es' ? hiw[0] : hiw[2]}
					</p>
					<p class="text-lg font-light text-gray-500">
						{data.lang === 'es' ? hiw[1] : hiw[3]}
					</p>
				</div>
			{/each}
		</div>
	</div>
	<div
		class="group relative mx-auto flex aspect-video h-full w-full max-w-sm flex-col justify-between overflow-clip rounded-lg bg-green-500 bg-cover p-4 text-center font-serif shadow-xl md:max-w-none"
		style={`background-image: url(${section_one.background})`}
	>
		<div
			class="absolute left-0 top-0 h-full w-full bg-black/50 opacity-100 transition-all duration-300 group-hover:opacity-0"
		></div>

		<div class="z-10 opacity-100 transition-all duration-300 group-hover:opacity-0">
			<div class="flex flex-row justify-between">
				<InsureLogo></InsureLogo>
			</div>
		</div>

		<div class="z-10 opacity-100 transition-all duration-300 group-hover:opacity-0">
			<!-- <a -->
			<!-- 	class="mb-2 rounded-md bg-gray-100 px-2 py-1 text-green-800 ring-1 ring-green-200" -->
			<!-- 	href="mailto:info@sethrollins.dev?subject=Inquiry%20About%20Burial%20Alternatives&body=Hello,%0A%0AI'm%20interested%20in%20learning%20more%20about%20your%20services.%20Could%20you%20please%20provide%20more%20information?%0A%0AThank%20you!" -->
			<!-- 	>Email us</a -->
			<!-- > -->
			<p class="mt-auto text-xs text-green-100">
				sethrollins.dev helps connect customers with Burial Insurance plans. Please contact our
				Licenced Insurance Agent.
			</p>
		</div>
	</div>
</div>

<div class="mt-8 h-[1px] w-[80%] max-w-sm bg-gray-200"></div>
<p class="font-bold text-gray-500">
	{data.lang === 'es' ? section_two.category.es : section_two.category.en}
</p>
<div class="w-[90%]">
	<p class="mx-auto max-w-2xl text-center text-2xl font-bold text-gray-700 sm:text-3xl lg:text-4xl">
		{data.lang === 'es' ? section_two.header.es : section_two.header.en}
	</p>
	<p
		class="mx-auto my-4 max-w-3xl text-center text-base font-light text-gray-500 sm:text-lg lg:text-xl"
	>
		{data.lang === 'es' ? section_two.subheader.es : section_two.subheader.en}
	</p>
</div>
<div class="grid w-[90%] max-w-4xl gap-6 md:grid-cols-3">
	{#each section_two.content as hiw}
		<div class="h-fit w-full rounded-2xl bg-gray-50 p-8 text-center shadow">
			<p class="text-2xl font-bold text-gray-800">
				{data.lang === 'es' ? hiw[0] : hiw[2]}
			</p>
			<p class="text-lg font-light text-gray-500">
				{data.lang === 'es' ? hiw[1] : hiw[3]}
			</p>
		</div>
	{/each}
</div>
<section class="relative flex h-full w-full flex-col items-center justify-center py-8 text-center">
	<p
		class="mx-auto w-full max-w-2xl pb-8 text-center text-2xl font-bold text-gray-700 sm:text-3xl lg:text-4xl"
	>
		{data.lang === 'es' ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
	</p>
	{#if data.lang === 'es'}
		{#each Object.entries(faq_es) as [key, value]}
			{#each value[1] as f, i}
				<div
					class:hidden={i === 2}
					class="col-span-3 mx-auto flex h-full w-[90%] flex-col items-center justify-start sm:col-span-1"
				>
					<div class="mx-auto flex w-full flex-col divide-y-[1px] divide-gray-300 text-center">
						<div class="mx-auto my-2 h-fit w-full max-w-xl">
							{#if i === 0}
								<p class="text-xl font-bold text-gray-500">
									{f}
								</p>
							{/if}
							{#if i === 1}
								<p
									class:md:text-base={i === 1}
									class:text-base={i === 1}
									class="overflow-clip text-start text-sm font-light sm:text-base md:text-lg"
								>
									{f}
								</p>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		{/each}
	{:else}
		{#each Object.entries(faq) as [key, value]}
			{#each value[1] as f, i}
				<div
					class:hidden={i === 2}
					class="col-span-3 mx-auto flex h-full w-[90%] flex-col items-center justify-start sm:col-span-1"
				>
					<div class="mx-auto flex w-full flex-col divide-y-[1px] divide-gray-300 text-center">
						<div class="mx-auto my-2 h-fit w-full max-w-xl">
							{#if i === 0}
								<p class="text-xl font-bold text-gray-500">
									{f}
								</p>
							{/if}
							{#if i === 1}
								<p
									class:md:text-base={i === 1}
									class:text-base={i === 1}
									class="overflow-clip text-start text-sm font-light sm:text-base md:text-lg"
								>
									{f}
								</p>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		{/each}
	{/if}
	<p></p>
	<div
		class="absolute bottom-0 flex h-[80%] w-full flex-col items-center justify-end bg-gradient-to-t from-gray-100 via-gray-100/50 to-transparent pb-20"
	>
		<Button href={'/' + $page.data.lang + '/faq'} variant="outline">Load More</Button>
	</div>
</section>

<style>
	@keyframes grow {
		0% {
			transform: scale(1);
		}
		20% {
			transform: scale(1.25);
		}
		40% {
			transform: scale(1);
		}
	}
	.grow {
		animation: grow 2s ease-in-out infinite;
		animation-delay: 3s;
	}
	@keyframes grow1 {
		20% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.25);
		}
		60% {
			transform: scale(1);
		}
	}
	.grow1 {
		animation: grow1 2s ease-in-out infinite;
		animation-delay: 3s;
	}
	@keyframes grow2 {
		40% {
			transform: scale(1);
		}
		60% {
			transform: scale(1.25);
		}
		80% {
			transform: scale(1);
		}
	}
	.grow2 {
		animation: grow2 2s ease-in-out infinite;
		animation-delay: 3s;
	}
</style>
