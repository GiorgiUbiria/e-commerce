<script lang="ts">
	export let data: any;

	const users = data.data;
</script>

<main class="flex flex-col flex-grow px-4 bg-gray-800">
	<section class="py-12">
		<div class="flex justify-between items-center mb-8">
			<h2 class="text-2xl font-bold text-white">User Management</h2>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
			{#each users as user}
				<details class="p-4 bg-gray-700 rounded-lg">
					<summary>
						<h3 class="text-lg font-semibold mb-2 text-white">{user.username}</h3>
						<p class="text-gray-400 mb-2">Email: {user.email}</p>
						<p class="text-gray-400 mb-2">Role: {user.role}</p>
						<button
							class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 bg-red-400 h-10 px-4 py-2 mb-2"
						>
							Delete User
						</button>
					</summary>
					<div>
						<h4 class="text-lg font-semibold mb-2 text-white">Purchased Services:</h4>
						<p class="text-gray-400 mb-2">Service 1 - Date: 10/11/2023 - Price: $50</p>
						<p class="text-gray-400 mb-2">Service 2 - Date: 20/11/2023 - Price: $60</p>
						<p class="text-gray-400 mt-2">Time spent on website: 10 hours</p>
					</div>
				</details>
			{/each}
		</div>
	</section>
</main>
