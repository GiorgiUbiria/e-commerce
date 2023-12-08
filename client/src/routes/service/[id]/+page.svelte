<script lang="ts">
	export let data: any;

	const service = data.data;
	const message = data.message;
</script>

<main class="flex flex-col flex-grow px-4 bg-gray-800">
	<section class="py-12 bg-gray-800">
		<div
			class="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4"
		>
			<div class="flex flex-col items-center space-x-4">
				<h2 class="text-2xl font-semibold text-white mb-4 md:mb-0">{service.serviceName}</h2>
				<img
					src="/placeholder.svg"
					alt="Service"
					height="400"
					width="400"
					class="rounded-lg bg-gray-700"
					style="aspect-ratio: 400 / 400; object-fit: cover;"
				/>
				<div class="flex flex-col space-y-4 mt-20 md:mt-0">
					<p class="text-lg text-white font-semibold">{service.description}</p>
					<p class="text-2xl text-white text-center">${service.price}</p>
				</div>
			</div>
		</div>
	</section>
</main>
