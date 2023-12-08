<script lang="ts">
	export let data: any;

	console.log(data);

	const user = data.data;
</script>

<main class="flex flex-col flex-grow px-4 bg-gray-800">
	<section class="py-12 bg-gray-800">
		<div
			class="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4"
		>
			<div class="flex flex-col md:flex-row space-x-4 items-center md:items-start">
				<img
					src="/placeholder.svg"
					alt="User Profile"
					height="400"
					width="400"
					class="rounded-full bg-gray-700"
					style="aspect-ratio: 400 / 400; object-fit: cover;"
				/>
				<div class="flex flex-col space-y-4 mt-20 md:mt-0">
					<h2 class="text-2xl font-semibold text-white mb-4 md:mb-0">User Profile</h2>
					<input
						class="bg-gray-900 text-white px-3 py-2 rounded-lg"
						disabled
						type="text"
						value={user.firstName}
					/>
					<input
						class="bg-gray-900 text-white px-3 py-2 rounded-lg"
						disabled
						type="text"
						value={user.lastName}
					/>
					<input
						class="bg-gray-700 text-white px-3 py-2 rounded-lg"
						type="text"
						value={user.username}
					/>
					<input
						class="bg-gray-700 text-white px-3 py-2 rounded-lg"
						type="email"
						value={user.email}
					/>
					<input
						class="bg-gray-700 text-white px-3 py-2 rounded-lg"
						placeholder="Change Password"
						type="password"
					/>
				</div>
			</div>
		</div>
	</section>
	<section class="py-12 bg-gray-800">
		<div class="flex flex-col items-center space-y-4">
			<h2 class="text-2xl font-semibold text-white mb-4 md:mb-0">Bought Services</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="flex flex-col items-center space-y-4 bg-gray-700 rounded-lg p-8">
					<img
						src="/placeholder.svg"
						alt="Service 1"
						height="200"
						width="200"
						class="rounded-full bg-gray-900"
						style="aspect-ratio: 200 / 200; object-fit: cover;"
					/>
					<h3 class="text-lg font-semibold text-white">Service 1</h3>
					<p class="text-white">Bought on: 11/11/2023</p>
					<p class="text-white">Progress: 80%</p>
				</div>
				<div class="flex flex-col items-center space-y-4 bg-gray-700 rounded-lg p-8">
					<img
						src="/placeholder.svg"
						alt="Service 2"
						height="200"
						width="200"
						class="rounded-full bg-gray-900"
						style="aspect-ratio: 200 / 200; object-fit: cover;"
					/>
					<h3 class="text-lg font-semibold text-white">Service 2</h3>
					<p class="text-white">Bought on: 10/10/2023</p>
					<p class="text-white">Progress: 50%</p>
				</div>
				<div class="flex flex-col items-center space-y-4 bg-gray-700 rounded-lg p-8">
					<img
						src="/placeholder.svg"
						alt="Service 3"
						height="200"
						width="200"
						class="rounded-full bg-gray-900"
						style="aspect-ratio: 200 / 200; object-fit: cover;"
					/>
					<h3 class="text-lg font-semibold text-white">Service 3</h3>
					<p class="text-white">Bought on: 09/09/2023</p>
					<p class="text-white">Progress: 30%</p>
				</div>
			</div>
		</div>
	</section>
</main>
