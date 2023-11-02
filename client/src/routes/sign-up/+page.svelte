<main class="flex flex-col flex-grow px-4 bg-gray-800">
	<section class="py-12">
		<div class="flex justify-between items-center mb-8">
			<h2 class="text-2xl font-bold text-white">Sign Up</h2>
		</div>
		<form method="POST" class="bg-gray-700 p-6 rounded-lg max-w-md mx-auto">
			<div class="mb-4">
				<label class="block text-white text-sm font-bold mb-2" for="firstName"> First Name </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					name="firstName"
					id="firstName"
					type="text"
				/>
				<p class="text-red-500 text-xs italic">Please enter your first name.</p>
			</div>
			<div class="mb-4">
				<label class="block text-white text-sm font-bold mb-2" for="lastName"> Last Name </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					name="lastName"
					id="lastName"
					type="text"
				/>
				<p class="text-red-500 text-xs italic">Please enter your last name.</p>
			</div>
			<div class="mb-4">
				<label class="block text-white text-sm font-bold mb-2" for="email"> Email </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					name="email"
					id="email"
					type="email"
				/>
				<p class="text-red-500 text-xs italic">Please enter your email.</p>
			</div>
			<div class="mb-4">
				<label class="block text-white text-sm font-bold mb-2" for="username"> Username </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					name="username"
					id="username"
					type="text"
				/>
				<p class="text-red-500 text-xs italic">Please enter your username.</p>
			</div>
			<div class="mb-4">
				<label class="block text-white text-sm font-bold mb-2" for="password"> Password </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="password"
					name="password"
					type="password"
				/>
				<p class="text-red-500 text-xs italic">Please enter your password.</p>
			</div>
			<button
				type="submit"
				class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/70 h-10 px-4 py-2 w-full mt-4"
			>
				Sign Up
			</button>
		</form>
	</section>
</main>
