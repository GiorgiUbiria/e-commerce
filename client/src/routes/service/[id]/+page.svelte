<script lang="ts">
	export let data: any;

	const service = data.data;
	const message = data.message;
</script>

<section>
	<h1>Service</h1>

	<div class="card">
		<img
			src="https://thumbs.dreamstime.com/b/service-button-means-help-support-assistance-meaning-32068730.jpg"
			alt="service"
			class="card__image"
		/>
		<div class="card__content">
			<div class="card__content__item">
				<p>Service Name:</p>
				<p>{service.serviceName}</p>
			</div>
			<div class="card__content__item">
				<p>Description:</p>
				<p>{service.description}</p>
			</div>
			<div class="card__content__item">
				<p>Price:</p>
				<p>{service.price}$</p>
			</div>
		</div>
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
		display: flex;
		align-items: evenly;
		justify-content: evenly;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		max-width: 40rem;
		padding: 1rem;
		box-sizing: border-box;
		gap: 2rem;
	}

	.card__image {
		width: 50%;
		height: auto;
		object-fit: contain;
		border-radius: var(--radius) var(--radius) 0 0;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
	}

	.card__content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		max-width: 40rem;
		padding: 1rem;
		box-sizing: border-box;
		gap: 2rem;
		text-align: center;
	}

	.card__content__item {
		display: flex;
		width: 100%;
		justify-content: between;
		text-align: center;
		gap: 2rem;
	}
</style>
