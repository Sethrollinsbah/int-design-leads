<script>
	import { page } from '$app/stores';
	export let strokeColor = 'stroke-green-800';
	export let fillColor = 'fill-green-800';

	// Reactive variables for color based on the current route
	$: currentstrokeColor = $page.url.pathname.includes('/home') ? 'stroke-green-50' : strokeColor;
	$: currentfillColor = $page.url.pathname.includes('/home') ? 'fill-green-50' : fillColor;
</script>

<svg
	class="size-9 {currentstrokeColor}"
	width="155"
	height="157"
	viewBox="0 0 155 157"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M63 134.804L66 136.804M89.5 136.304L92.5 134.304M90 136.804L93 134.804"
		stroke-linecap="square"
		stroke-linejoin="bevel"
	/>
	<path
		d="M66 65.3041C55.2 64.5041 41.8333 67.9708 36.5 69.8041C35.7 66.2041 31.8333 61.3041 30 59.3041C34.4 56.9041 36.8333 51.6375 37.5 49.3041C41.1 52.5041 63 56.3041 73.5 57.8041C73.5 41.8041 70.1667 26.8041 68.5 21.3041C75.5 20.3041 78.5 13.8041 79 15.8041C79.4 17.4041 85.5 20.8041 88.5 22.3041C84.5 29.1041 81.8333 48.8041 81 57.8041H86L66 65.3041Z"
		class={currentfillColor}
	/>
	<path
		d="M77.5 86.8041L70 150.304C73.6 151.104 76.5 153.971 77.5 155.304C78.7 153.304 82.6667 151.137 84.5 150.304L77.5 86.8041Z"
		class={currentfillColor}
	/>
	<path
		d="M67 135.804L76 65.7767M89 135.804L88.5 131.914L84.5 100.79L80 64.8041"
		stroke-width="4"
		stroke-linecap="round"
		stroke-linejoin="bevel"
	/>
	<path
		d="M6 22.8041C9.1071 44.5656 23.6091 92.8013 57.3417 124.592M57.3417 124.592C60.401 127.475 63.6185 130.223 67 132.804L57.3417 124.592Z"
		stroke-width="9"
		stroke-linecap="square"
		stroke-linejoin="bevel"
	/>
	<path
		d="M149 22.8041C145.944 44.5656 131.68 92.8013 98.5 124.592M98.5 124.592C95.4908 127.475 92.3261 130.223 89 132.804L98.5 124.592Z"
		stroke-width="9"
		stroke-linecap="square"
		stroke-linejoin="bevel"
	/>
	<path
		d="M7.5 20.8041C35.5 4.30413 98.5 -4.39587 148.5 20.8041"
		stroke-width="9"
		stroke-linecap="square"
		stroke-linejoin="bevel"
	/>
	<path
		d="M123.5 61.3041C120.7 60.5041 118 54.9708 117 52.3041L71 65.3041C81 62.9041 105.833 68.6375 117 71.8041C117 67.8041 121.333 63.1375 123.5 61.3041Z"
		class={currentfillColor}
		stroke-linecap="square"
		stroke-linejoin="bevel"
	/>
</svg>
