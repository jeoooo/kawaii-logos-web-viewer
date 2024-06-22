<script>
	// @ts-nocheck
	import { GITHUB_API_BASE_URL, GITHUB_API_TOKEN } from '$env/static/public';

	let folders = []; // Array to store folder data
	let isLoading = true; // Flag to track loading state

	// Function to fetch data from GitHub API
	async function fetchData() {
		try {
			// Check if cached data exists in localStorage and is not expired
			const cachedData = localStorage.getItem('githubFolders');
			if (cachedData) {
				const { data, timestamp } = JSON.parse(cachedData);
				// Check if data is less than 1 hour old (adjust as needed)
				if (Date.now() - timestamp < 3600000) {
					folders = data;
					isLoading = false;
					return;
				}
			}

			// Fetch repository contents
			let response = await fetch('https://api.github.com/repos/jeoooo/KawaiiLogos/contents', {
				headers: {
					Authorization: `token ${GITHUB_API_TOKEN}`
				}
			});

			// Handle HTTP errors
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Parse response to JSON
			let data = await response.json();
			console.log('Initial data from GitHub API:', data);

			// Filter out folders from the response, excluding those starting with a dot
			folders = data
				.filter((item) => item.type === 'dir' && !item.name.startsWith('.'))
				.map((item) => ({
					name: item.name,
					files: [] // Placeholder for files
				}));
			console.log('Filtered folders:', folders);

			// Fetch files inside each folder
			await Promise.all(
				folders.map(async (folder) => {
					// Fetch contents of each folder
					let folderResponse = await fetch(
						`https://api.github.com/repos/jeoooo/KawaiiLogos/contents/${folder.name}`,
						{
							headers: {
								Authorization: `token ${GITHUB_API_TOKEN}`
							}
						}
					);

					// Handle HTTP errors
					if (!folderResponse.ok) {
						console.error(
							`Failed to fetch contents of folder ${folder.name}: ${folderResponse.status}`
						);
						return;
					}

					// Parse folder contents to JSON
					let folderData = await folderResponse.json();
					console.log(`Contents of folder ${folder.name}:`, folderData);

					// Filter and map image files
					folder.files = folderData
						.filter((item) => item.type === 'file' && item.name.match(/\.(jpeg|jpg|png|gif)$/i))
						.map((item) => ({
							name: item.name,
							url: item.download_url
						}));
				})
			);

			console.log('Final folders with files:', folders);

			// Cache the fetched data in localStorage
			localStorage.setItem(
				'githubFolders',
				JSON.stringify({ data: folders, timestamp: Date.now() })
			);

			// Set loading flag to false after data is fetched
			isLoading = false;
		} catch (error) {
			console.error('Error fetching data:', error);
			isLoading = false; // Make sure loading state is updated on error
		}
	}

	// Fetch data when the component is mounted
	fetchData();
</script>

<h1>sawaratsuki kawaii logos</h1>

{#if isLoading}
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
{/if}
