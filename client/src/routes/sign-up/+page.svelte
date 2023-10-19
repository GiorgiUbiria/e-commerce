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
		justify-content: center;
		align-items: center;
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
		flex-direction: column;
		max-width: 100%;
		gap: 0.5rem;
		width: 20rem;
		justify-content: space-between;
		align-items: center;
		font-weight: bold;
	}

	input {
		padding: 0.5rem;
		box-sizing: border-box;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	button {
		width: 25%;
		padding: 0.5rem;
		box-sizing: border-box;
		border-radius: 5px;
		border: 1px solid #ccc;
		cursor: pointer;
		background-color: #ccc;
		color: #000;
		font-weight: bold;
		transition: 0.1s;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-top: 1rem;
	}

	button:hover {
		opacity: 0.6;
		transition: 0.1s;
	}
</style>
