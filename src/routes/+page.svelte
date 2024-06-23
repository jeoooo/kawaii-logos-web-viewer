<script lang="ts">
	import { onMount } from 'svelte';

	export let data: {
		sawaratsuki_data: any;
	};

	// Initial data and state
	let items = data.sawaratsuki_data.slice(0, 3); // Initially show first 3 items
	let allItems = data.sawaratsuki_data; // Store all items
	let loading = false;
	let offset = 8; // Track the number of items loaded so far

	// Function to fetch more data
	async function fetchMoreData() {
		// Simulate data fetching with a delay
		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Append new data to the existing data
		const newItems = allItems.slice(offset, offset + 3); // Fetch next 3 items
		items = [...items, ...newItems];
		offset += 3;

		loading = false;
	}

	// Function to handle scroll event
	function handleScroll() {
		const scrollableDiv = document.documentElement;
		const scrollTop = scrollableDiv.scrollTop;
		const scrollHeight = scrollableDiv.scrollHeight;
		const clientHeight = scrollableDiv.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight && !loading) {
			fetchMoreData();
		}
	}

	// Add scroll event listener on mount
	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="space-y-8">
	{#each items as data}
		<div class="bg-white border border-gray-200 mx-80 rounded-lg text-center shadow-sm">
			<h3 class="font-semibold mb-4">{data.name}</h3>
			{#if data.files.length > 0}
				<div class="">
					{#each data.files as file}
						<img class="h-80 w-auto mx-auto" src={file.url} alt={file.name} />
					{/each}
				</div>
			{:else}
				<p class="text-gray-500">No image files found in this folder.</p>
			{/if}
		</div>
	{/each}
</div>

{#if loading}
	<div class="loading">Loading more...</div>
{/if}

<style>
	.loading {
		text-align: center;
		padding: 16px;
		font-size: 16px;
		color: #666;
	}

	.poppins-thin {
		font-family: 'Poppins', sans-serif;
		font-weight: 100;
		font-style: normal;
	}

	.poppins-extralight {
		font-family: 'Poppins', sans-serif;
		font-weight: 200;
		font-style: normal;
	}

	.poppins-light {
		font-family: 'Poppins', sans-serif;
		font-weight: 300;
		font-style: normal;
	}

	.poppins-regular {
		font-family: 'Poppins', sans-serif;
		font-weight: 400;
		font-style: normal;
	}

	.poppins-medium {
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		font-style: normal;
	}

	.poppins-semibold {
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-style: normal;
	}

	.poppins-bold {
		font-family: 'Poppins', sans-serif;
		font-weight: 700;
		font-style: normal;
	}

	.poppins-extrabold {
		font-family: 'Poppins', sans-serif;
		font-weight: 800;
		font-style: normal;
	}

	.poppins-black {
		font-family: 'Poppins', sans-serif;
		font-weight: 900;
		font-style: normal;
	}

	.poppins-thin-italic {
		font-family: 'Poppins', sans-serif;
		font-weight: 100;
		font-style: italic;
	}

	.poppins-extralight-italic {
		font-family: 'Poppins', sans-serif;
		font-weight: 200;
		font-style: italic;
	}

	.poppins-light-italic {
		font-family: 'Poppins', sans-serif;
		font-weight: 300;
		font-style: italic;
	}

	.poppins-regular-italic {
		font-family: 'Poppins', sans-serif;
		font-weight: 400;
		font-style: italic;
	}

	.poppins-medium-italic {
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		font-style: italic;
	}

	.poppins-semibold-italic {
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-style: italic;
	}

	.poppins-bold-italic {
		font-family: 'Poppins', sans-serif;
		font-weight: 700;
		font-style: italic;
	}

	.poppins-extrabold-italic {
		font-family: 'Poppins', sans-serif;
		font-weight: 800;
		font-style: italic;
	}

	.poppins-black-italic {
		font-family: 'Poppins', sans-serif;
		font-weight: 900;
		font-style: italic;
	}
</style>
