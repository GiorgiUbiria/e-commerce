<script lang="ts">
	export let data: any;

	const services = data.data;
</script>

<svelte:head>
	<title>Services</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Products</h1>
	<div class="card__container">
		{#if services.length > 0}
			{#each services as { id, serviceName, description, price } (id)}
				<div class="card">
					<img
						src="https://thumbs.dreamstime.com/b/service-button-means-help-support-assistance-meaning-32068730.jpg"
						alt="service image"
						class="card__image"
					/>
					<p>Service Name - <span>{serviceName}</span></p>
					<p>Description - <span>{description}</span></p>
					<p>Price - <span>{price}</span></p>
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
		font-size: 4rem;
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

	.card {
		display: flex;
		flex-direction: column;
		align-items: start;
		border: 1px solid var(--clr-primary-5);
		border-radius: var(--radius);
		padding: 1rem;
		text-align: left;
		width: 100%;
		min-width: 250px;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease-in-out;
	}

	.card__image {
		width: 100%;
		border-radius: var(--radius) var(--radius) 0 0;
		object-fit: cover;
	}

	.card p {
		font-size: 1.25rem;
		font-weight: 600;
		width: 100%;
	}

	.card span {
		font-size: 1.5rem;
		font-weight: 600;
		color: red;
	}
</style>
