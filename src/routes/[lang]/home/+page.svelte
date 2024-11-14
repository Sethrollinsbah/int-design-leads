<script lang="ts">
	import Home from '$lib/Home.svelte';
	export let data;
	let company = ['/aetna.png', '/cigna.png', '/blue_cross.png', '/united_healthcare.png'];

	let background = '/bg.jpg';

	let section_one = {
		background: '/couple.jpg',
		content: [
			[
				'¿Qué es el Seguro de Entierro?',
				'El seguro de entierro es una póliza que ayuda a cubrir los gastos funerarios y otros costos relacionados con el fallecimiento, asegurando que tus seres queridos no tengan que preocuparse por esos gastos en un momento difícil.',
				'What is Burial Insurance?',
				'Burial insurance is a policy that helps cover funeral expenses and other related costs, ensuring that your loved ones do not have to worry about these expenses during a difficult time.'
			],
			[
				'Beneficios de Obtener un Seguro de Entierro',
				'Con un seguro de entierro, puedes garantizar que tus costos funerarios estén cubiertos, reduciendo la carga financiera que enfrentan tus seres queridos en tu ausencia.',
				'Benefits of Getting Burial Insurance',
				'With burial insurance, you can ensure that your funeral costs are covered, reducing the financial burden on your loved ones after your passing.'
			]
		],
		category: {
			en: 'Benefits',
			es: 'Seguro de Entierro'
		},
		header: {
			en: 'Why is burial insurance important?',
			es: '¿Por qué es importante el seguro de entierro?'
		},
		subheader: {
			en: 'Burial insurance provides peace of mind and financial security for your loved ones.',
			es: 'El seguro de entierro proporciona tranquilidad y seguridad financiera para tus seres queridos.'
		}
	};
	let section_two = {
		content: [
			[
				'Protege a tu familia',
				'El seguro de entierro asegura que tu familia no tenga que cubrir los gastos funerarios, evitando cargas financieras durante un momento difícil.',
				'Protect Your Family',
				'Burial insurance ensures your family won’t bear the funeral expenses, preventing financial burdens during a difficult time.'
			],
			[
				'Evita los costos crecientes',
				'Los gastos funerarios continúan aumentando. Obtener un seguro de entierro ahora te ayuda a cubrir estos costos a precios más bajos.',
				'Avoid Rising Costs',
				'Funeral expenses continue to rise. Getting burial insurance now helps cover these costs at lower rates.'
			],
			[
				'Planificación financiera anticipada',
				'Contar con un seguro de entierro es una forma de planificar tu futuro financiero y garantizar que no se dejen gastos pendientes.',
				'Plan Ahead Financially',
				'Having burial insurance is a way to plan your financial future and ensure no outstanding expenses are left behind.'
			]
		],
		category: {
			en: 'Why Burial Insurance is Important in St. Louis',
			es: 'Por qué el Seguro de Entierro es Importante en St. Louis'
		},
		header: {
			en: 'Why is burial insurance essential for your family in St. Louis?',
			es: '¿Por qué es esencial el seguro de entierro para tu familia en St. Louis?'
		},
		subheader: {
			en: 'Burial insurance provides financial protection and peace of mind for you and your loved ones in St. Louis.',
			es: 'El seguro de entierro proporciona protección financiera y tranquilidad para ti y tus seres queridos en St. Louis.'
		}
	};
</script>

<Home {section_one} {section_two} {data} {company} {background}>
	<svelte:fragment slot="Title">
		<span class:hidden={data.lang === 'es'}>Burial<br />Insurance</span>
		<span class:hidden={data.lang !== 'es'}>Seguro de<br />Entierro</span>
	</svelte:fragment>
	<svelte:fragment slot="Subtitle">
		<span class="text-base font-light">
			{#if data.lang !== 'es'}
				View the available coverage in your Missouri.
			{:else}
				Vea la cobertura disponible en Missouri.
			{/if}</span
		>
	</svelte:fragment>
</Home>
