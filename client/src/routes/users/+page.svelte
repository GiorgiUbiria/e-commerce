<script lang="ts">
	export let data: any;

	console.log(data.data.data);
</script>

<section>
	<h1>Users</h1>
	<p>{data.data.data.username}</p>
</section>
