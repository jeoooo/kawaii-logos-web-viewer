<script lang="ts">
	export let data: {
		sawaratsuki_data: any;
	};

	// Extract websites_data from the data object
	const { sawaratsuki_data } = data;

	console.log(sawaratsuki_data);
</script>

<h1>sawaratsuki kawaii logos</h1>

<!-- {#if isLoading}
	<p>Loading...</p>
{:else if folders.length > 0}
	<ul>
		{#each folders as folder}
			<h3>{folder.name}</h3>
			{#if folder.files.length > 0}
				<ul>
					{#each folder.files as file}
						<img src={file.url} style="height: 128px;" alt="" srcset="" />
					{/each}
				</ul>
			{:else}
				<p>No image files found in this folder.</p>
			{/if}
		{/each}
	</ul>
{:else}
	<p>No folders found.</p>
{/if} -->
