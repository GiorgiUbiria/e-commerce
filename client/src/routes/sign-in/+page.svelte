<section>
	<h1>Sign In</h1>

	<form method="POST">
		<label for="username"
			>Username
			<input type="text" name="username" id="username" placeholder="Username" required />
		</label>

		<label for="password"
			>Password
			<input type="password" name="password" id="password" placeholder="*******" required />
		</label>

		<button type="submit"> Sign In </button>
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
		gap: 0.5rem;
		max-width: 100%;
		width: 20rem;
		justify-content: space-between;
		align-items: center;
		font-weight: bold;
	}

	input {
		width: 100%;
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
