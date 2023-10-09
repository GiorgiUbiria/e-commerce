<script lang="ts">
	export let data: any;
	export let error: any;

	const { services } = data;

	if (error) {
		console.error('An error occurred:', error);
	}
</script>

<svelte:head>
	<title>Services</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Products</h1>
	<div class="card__container">
		{#if services.length > 0}
			{#each services as { id, serviceName, description } (id)}
				<div class="card">
					<h2>{serviceName} {description}</h2>
				</div>
			{/each}
		{:else}
			<p>No services found.</p>
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.card {
		min-width: 220px;
		height: 400px;
		border: 3px solid black;
		border-radius: 10px;
		margin: 1rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.card__container {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		justify-content: center;
		column-gap: 2rem;
		row-gap: 2rem;
		margin: 0 auto;
		max-width: 1200px;
	}
</style>
