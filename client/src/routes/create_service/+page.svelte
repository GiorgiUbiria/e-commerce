<script lang="ts">
	import { enhance } from '$app/forms';

	let creating = false;
</script>

<svelte:head>
	<title>Create a Service</title>
	<meta name="Create a Service" content="Creating a service for the user" />
</svelte:head>

<main class="flex flex-col flex-grow px-4 bg-gray-800">
	<section class="py-12">
		<div class="flex justify-between items-center mb-8">
			<h2 class="text-2xl font-bold text-white">Create Service</h2>
		</div>
		<form
			method="POST"
			class="bg-gray-700 p-6 rounded-lg max-w-md mx-auto"
			id="1iyec55h1vg"
			use:enhance={() => {
				creating = true;

				return async ({ update }) => {
					await update();
					creating = false;
				};
			}}
		>
			<div class="mb-4">
				<label class="block text-white text-sm font-bold mb-2" for="serviceName">
					Service Name
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					name="serviceName"
					disabled={creating}
					id="serviceName"
					min="3"
					max="30"
					type="text"
					required
				/>
				<p class="text-red-500 text-xs italic">Please enter a service name.</p>
			</div>
			<div class="mb-4">
				<label class="block text-white text-sm font-bold mb-2" for="description">
					Service Description
				</label>
				<textarea
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					name="description"
					disabled={creating}
					minlength="10"
					maxlength="100"
					id="service-description"
					required
				/>
				<p class="text-red-500 text-xs italic">Please enter a service description.</p>
			</div>
			<div class="mb-4">
				<label class="block text-white text-sm font-bold mb-2" for="price"> Service Price </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="price"
					disabled={creating}
					name="price"
					type="text"
					required
				/>
				<p class="text-red-500 text-xs italic">Please enter a service price.</p>
			</div>
			<button
				type="submit"
				disabled={creating}
				class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-10 px-4 py-2 w-full mt-4"
			>
				Create Service
			</button>
		</form>
		{#if creating}
			<span class="text-gray-500 text-center italic">saving...</span>
		{/if}
	</section>
</main>
