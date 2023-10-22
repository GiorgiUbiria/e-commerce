<script lang="ts">
	export let data: any;

	const users = data.data;
</script>

<section>
	<h1>Users</h1>
	<div class="card__container">
		{#if users.length > 0}
			{#each users as { id, firstName, lastName } (id)}
				<div class="card">
					<h2>{firstName} {lastName}</h2>
				</div>
			{/each}
		{:else}
			<p>No users found.</p>
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

	.card__container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.card {
		cursor: pointer;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		width: 30%;
		text-align: center;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	.card:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		opacity: 0.6;
		transition: 0.1s;
	}
</style>
