<svelte:head>
	<title>Create a Service</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Create a Service</h1>

	<form method="POST" class="form">
		<label for="serviceName">
			<input type="text" name="serviceName" placeholder="Service Name" />
		</label>
		<label for="description">
			<textarea name="description" placeholder="Service Description" />
		</label>
		<label for="price">
			<input type="number" name="price" placeholder="Service Price" />
		</label>

		<button type="submit" id="submit__button">Create Service</button>
	</form>
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

	.form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 400px;
	}

	label {
		border-radius: 5px;
		padding: 0.5rem;
		margin: 0.5rem;
		width: 100%;
		display: flex;
	}

	input,
	textarea {
		border-radius: 5px;
		padding: 0.5rem;
		margin: 0.5rem;
		width: 100%;
		border: 1px solid black;
		outline: none;
		resize: none;
	}

	#submit__button {
		border-radius: 5px;
		padding: 0.5rem;
		margin: 0.5rem;
		width: 100%;
		border: 1px solid black;
		outline: none;
		cursor: pointer;
		background-color: var(--color-theme-1);
		color: white;
		font-weight: bold;
		font-size: 1rem;
		transition: all 0.2s ease-in-out;
		box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
	}
</style>
