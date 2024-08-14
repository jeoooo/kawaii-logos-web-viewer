<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let data: {
		sawaratsuki_data: any;
	};

	// Initial data and state
	let itemsPerPage = 9;
	let currentPage = 1;
	let items = data.sawaratsuki_data.slice(0, itemsPerPage); // Initially show items per page
	let allItems = data.sawaratsuki_data; // Store all items
	let totalPages = Math.ceil(allItems.length / itemsPerPage); // Calculate total pages

	// Function to fetch data for the current page
	function fetchPageData(page: number) {
		// Calculate the starting and ending index for the page
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		// Update items for the current page
		items = allItems.slice(start, end);
	}

	// Function to change page
	function changePage(newPage: number) {
		if (newPage >= 1 && newPage <= totalPages) {
			currentPage = newPage;
			fetchPageData(currentPage);
		}
	}
</script>

<!-- Content display -->
<div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
	{#each items as data}
		<div class="bg-white border border-gray-200 rounded-lg text-center shadow-sm">
			<h3 class="font-semibold mb-4">{data.name}</h3>
			{#if data.files.length > 0}
				<div class="flex flex-wrap justify-center gap-2">
					{#each data.files as file}
						<img class="h-[100px] max-w-full rounded-lg" src={file.url} alt={file.name} />
					{/each}
				</div>
			{:else}
				<p class="text-gray-500">No image files found in this folder.</p>
			{/if}
		</div>
	{/each}
</div>

<!-- Pagination controls -->
<nav aria-label="Page navigation example" class="flex justify-center mt-4">
	<ul class="inline-flex -space-x-px text-base h-10">
		<li>
			<a
				href="#"
				class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				aria-disabled={currentPage === 1}
				on:click={() => changePage(currentPage - 1)}>Previous</a
			>
		</li>
		{#each Array(totalPages) as _, index}
			<li>
				<a
					href="#"
					class="flex items-center justify-center px-4 h-10 leading-tight {index + 1 === currentPage
						? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
						: 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'} dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
					aria-current={index + 1 === currentPage ? 'page' : undefined}
					on:click={() => changePage(index + 1)}
				>
					{index + 1}
				</a>
			</li>
		{/each}
		<li>
			<a
				href="#"
				class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				aria-disabled={currentPage === totalPages}
				on:click={() => changePage(currentPage + 1)}>Next</a
			>
		</li>
	</ul>
</nav>

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
