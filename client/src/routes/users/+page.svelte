<script lang="ts">
	export let data: any;
	console.log(data.data.data);
</script>

<section>
	<h1>Users</h1>
	<div class="card__container">
		{#if data.data.data.length > 0}
			{#each data.data.data as { id, firstName, lastName } (id)}
				<div class="card">
					<h2>{firstName} {lastName}</h2>
				</div>
			{/each}
		{:else}
			<p>No users found.</p>
		{/if}
	</div>
</section>
