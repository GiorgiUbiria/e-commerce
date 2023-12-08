<script lang="ts">
	export let data: any;

	const services = data.data;

	let searchTerm = '';
	let sortOption = 'date';
	let sortedAndFilteredServices: any = services;

	$: {
		sortedAndFilteredServices = services
			.filter((service: any) =>
				service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
			)
			.sort((a: any, b: any) => {
				switch (sortOption) {
					case 'date':
						return new Date(b.createdAt) - new Date(a.createdAt);
					case 'price':
						return b.price - a.price;
					case 'popularity':
						return b.userCount - a.userCount;
					default:
						return 0;
				}
			});
	}
</script>

<svelte:head>
	<title>All Services</title>
	<meta name="description" content="all available services" />
</svelte:head>

<main class="flex flex-col flex-grow px-4 bg-gray-800">
	<section class="py-12">
		<div class="flex flex-col md:flex-row justify-between items-center mb-8">
			<h2 class="text-2xl font-bold text-white mb-4 md:mb-0">Our Services</h2>
			<div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
				<input
					placeholder="Search"
					class="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
					type="text"
					bind:value={searchTerm}
				/>
				<select
					bind:value={sortOption}
					class="px-2 py-2 bg-white text-black rounded-md focus:outline-none"
				>
					<optgroup label="Filter by">
						<option value="date">Date</option>
						<option value="price">Price</option>
						<option value="popularity">Popularity</option>
					</optgroup>
				</select>
			</div>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
			{#each sortedAndFilteredServices as service (service.id)}
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
					<a
						class="text-sm font-semibold text-blue-400 hover:underline"
						href="/service/{service.id}"
					>
						Read More
					</a>
				</div>
			{/each}
		</div>
	</section>
</main>
