<script lang="ts">
	export let data: any;

	const array = data.data.slice(0, 3);

	import { onMount } from 'svelte';

	onMount(async () => {
		const { Carousel, initTE } = await import('tw-elements');
		initTE({ Carousel });
	});
</script>

<main class="flex flex-col flex-grow">
	<section
		class="flex flex-col items-center justify-center bg-center bg-cover h-[500px] py-20 text-white"
		style="background-image: url(&quot;https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&quot;);"
	>
		<h1 class="text-4xl font-bold text-white text-center">Welcome to our Personal Services</h1>
		<p class="text-lg mt-2 mb-4 text-white text-center">
			We offer the best services tailored to your needs.
		</p>
	</section>
	<section class="py-12 px-4 bg-gray-800">
		<h2 class="text-2xl font-bold text-center mb-8 text-white">Our Services</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
			{#each array as service}
				<div class="flex flex-col items-center text-center">
					<img
						src="https://thumbs.dreamstime.com/b/service-button-means-help-support-assistance-meaning-32068730.jpg"
						width="200"
						height="200"
						alt="Service"
						class="rounded-full"
						style="aspect-ratio: 200 / 200; object-fit: cover;"
					/>
					<h3 class="text-lg font-semibold mt-4 mb-2 text-white">{service.serviceName}</h3>
					<p class="text-gray-400">{service.description}</p>
				</div>
			{/each}
		</div>
	</section>
	<section class="py-12 px-4 bg-gray-800">
		<h2 class="text-2xl font-bold text-center mb-8 text-white">Latest News</h2>
		<div id="carouselDarkVariant" class="relative" data-te-carousel-init data-te-ride="carousel">
			<div
				class="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
				data-te-carousel-indicators
			>
				<button
					data-te-target="#carouselDarkVariant"
					data-te-slide-to="0"
					data-te-carousel-active
					class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
					aria-current="true"
					aria-label="Slide 1"
				/>
				<button
					data-te-target="#carouselDarkVariant"
					class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
					data-te-slide-to="1"
					aria-label="Slide 1"
				/>
				<button
					data-te-target="#carouselDarkVariant"
					class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
					data-te-slide-to="2"
					aria-label="Slide 1"
				/>
			</div>

			<div class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
				{#each array as service, id}
					{#if id === 0}
						<div
							class="relative float-left -mr-[100%] w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
							data-te-carousel-fade
							data-te-carousel-item
							data-te-carousel-active
						>
							<img
								src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(40).webp"
								class="block w-full"
								alt="Woman Reading a Book"
							/>
							<div
								class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block"
							>
								<h5 class="text-xl">{service.serviceName}</h5>
								<p>{service.description}</p>
							</div>
						</div>
					{:else}
						<div
							class="relative float-left -mr-[100%] w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
							data-te-carousel-fade
							data-te-carousel-item
						>
							<img
								src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(40).webp"
								class="block w-full"
								alt="Woman Reading a Book"
							/>
							<div
								class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block"
							>
								<h5 class="text-xl">{service.serviceName}</h5>
								<p>{service.description}</p>
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<!-- Carousel controls - prev item-->
			<button
				class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
				type="button"
				data-te-target="#carouselDarkVariant"
				data-te-slide="prev"
			>
				<span class="inline-block h-8 w-8 dark:grayscale">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</span>
				<span
					class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
					>Previous</span
				>
			</button>
			<!-- Carousel controls - next item-->
			<button
				class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
				type="button"
				data-te-target="#carouselDarkVariant"
				data-te-slide="next"
			>
				<span class="inline-block h-8 w-8 dark:grayscale">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</span>
				<span
					class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
					>Next</span
				>
			</button>
		</div>
	</section>
</main>
