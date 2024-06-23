import { writable } from 'svelte/store';
import { env } from '$env/dynamic/private';

const githubFolders = writable([]);
const isLoading = writable(true);
export const load = async () => {
	try {
		// Set loading state to true at the start of data fetching
		isLoading.set(true);

		// Check if cached data exists in localStorage and is not expired
		// const cachedData = localStorage.getItem('githubFolders');
		// if (cachedData) {
		// 	const { data, timestamp } = JSON.parse(cachedData);
		// 	// Check if data is less than 1 hour old (adjust as needed)
		// 	if (Date.now() - timestamp < 3600000) {
		// 		githubFolders.set(data);
		// 		isLoading.set(false);
		// 		return {
		// 			sawaratsuki_data: data
		// 		};
		// 	}
		// }

		// Fetch repository contents
		let response = await fetch(`${env.GITHUB_API_BASE_URL}/repos/jeoooo/KawaiiLogos/contents`, {
			headers: {
				Authorization: `token ${env.GITHUB_API_TOKEN}`
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
		let folders = data
			.filter(
				(item: { type: string; name: string }) => item.type === 'dir' && !item.name.startsWith('.')
			)
			.map((item: { name: any }) => ({
				name: item.name,
				files: [] // Placeholder for files
			}));
		console.log('Filtered folders:', folders);

		// Fetch files inside each folder
		await Promise.all(
			folders.map(async (folder: { name: any; files: any }) => {
				// Fetch contents of each folder
				let folderResponse = await fetch(
					`${env.GITHUB_API_BASE_URL}/repos/jeoooo/KawaiiLogos/contents/${folder.name}`,
					{
						headers: {
							Authorization: `token ${env.GITHUB_API_TOKEN}`
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
					.filter(
						(item: { type: string; name: string }) =>
							item.type === 'file' && item.name.match(/\.(jpeg|jpg|png|gif)$/i)
					)
					.map((item: { name: any; download_url: any }) => ({
						name: item.name,
						url: item.download_url
					}));
			})
		);

		console.log('Final folders with files:', folders);

		// Cache the fetched data in localStorage
		// localStorage.setItem('githubFolders', JSON.stringify({ data: folders, timestamp: Date.now() }));

		// Update the Svelte store with the fetched data
		githubFolders.set(folders);

		return {
			sawaratsuki_data: folders
		};
	} catch (error) {
		console.error(error);
	} finally {
		// Set loading state to false after data fetching is complete
		isLoading.set(false);
	}
};
