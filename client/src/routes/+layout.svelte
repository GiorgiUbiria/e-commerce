<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	import '../app.css';

	export let data: any;
</script>

<div class="flex flex-col min-h-screen bg-gray-800">
	<Header user={data} />
	<slot />
	<Footer />
</div>
