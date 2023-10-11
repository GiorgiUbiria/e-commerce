<script lang="ts">
</script>

<section>
	<h1>Sign Up</h1>
	<form method="POST">
		<label>
			First Name
			<input type="text" name="firstName" placeholder="First Name" required />
		</label>
		<label>
			Last Name
			<input type="text" name="lastName" placeholder="Last Name" required />
		</label>
		<label>
			Email
			<input type="email" name="email" placeholder="email@email.com" required />
		</label>
		<label>
			Username
			<input type="text" name="username" placeholder="username" required />
		</label>
		<label>
			Password
			<input type="password" name="password" placeholder="*******" required />
		</label>

		<button type="submit">Sign Up</button>
	</form>
</section>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		max-width: 40rem;
		padding: 1rem;
		box-sizing: border-box;
		gap: 2rem;
	}

	label {
		display: flex;
		max-width: 100%;
		justify-content: space-between;
	}
</style>
