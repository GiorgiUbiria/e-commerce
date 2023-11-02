<script lang="ts">
	export let data: any;

	const services = data.data;
</script>

<svelte:head>
	<title>All Services</title>
	<meta name="description" content="all available services" />
</svelte:head>

<main class="flex flex-col flex-grow px-4 bg-gray-800">
	<section class="py-12">
		<div class="flex justify-between items-center mb-8">
			<h2 class="text-2xl font-bold text-white">Our Services</h2>
			<div class="flex space-x-4">
				<input
					placeholder="Search"
					class="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
					type="text"
				/>
				<button
					type="button"
					role="combobox"
					aria-controls="radix-:r0:"
					aria-expanded="false"
					aria-autocomplete="none"
					dir="ltr"
					data-state="closed"
					data-placeholder=""
					class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<span style="pointer-events: none;">Filter</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-4 w-4 opacity-50"
						aria-hidden="true"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</button>
			</div>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
			{#each services as service (service.id)}
				<div class="flex flex-col items-center text-center p-4 bg-gray-700 rounded-lg">
					<img
						src="https://via.placeholder.com/200x200"
						width="200"
						height="200"
						alt="Service 1"
						class="rounded-full transform hover:scale-110 transition-transform"
						style="aspect-ratio: 200 / 200; object-fit: cover;"
					/>
					<h3 class="text-lg font-semibold mt-4 mb-2 text-white">{service.serviceName}</h3>
					<p class="text-gray-400">{service.description}</p>
					<p class="text-lg font-semibold mt-4 mb-2 text-white">${service.price}</p>
					<a href="#">
						<a
							class="text-sm font-semibold text-blue-400 hover:underline"
							href="/service/{service.id}"
						>
							Read More
						</a>
					</a>
				</div>
			{/each}
		</div>
	</section>
</main>
