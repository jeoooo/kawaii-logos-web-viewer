// // page.server.ts
// import { GITHUB_API_BASE_URL, GITHUB_API_TOKEN } from '$env/static/private';
// import type { RequestHandler } from '@sveltejs/kit';

// // Define the GitHub repository and API token (replace with your actual values)
// const repository = 'jeoooo/KawaiiLogos';

// export async function getKawaiiLogos(): Promise<Response> {
// 	try {
// 		// Fetch repository contents
// 		const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${repository}/contents`, {
// 			headers: {
// 				Authorization: `token ${GITHUB_API_TOKEN}`
// 			}
// 		});

// 		if (!response.ok) {
// 			throw new Error(`Failed to fetch data from GitHub API. Status: ${response.status}`);
// 		}

// 		// Parse response to JSON
// 		const githubData = await response.json();

// 		// Filter folders excluding those starting with a dot, and map them with their respective files
// 		const folders = githubData
// 			.filter((item: any) => item.type === 'dir' && !item.name.startsWith('.'))
// 			.map((item: any) => ({
// 				name: item.name,
// 				files: [] // Placeholder for files
// 			}));

// 		// Fetch files inside each folder
// 		await Promise.all(
// 			folders.map(async (folder: { name: any; files: any }) => {
// 				const folderResponse = await fetch(
// 					`https://api.github.com/repos/${repository}/contents/${folder.name}`,
// 					{
// 						headers: {
// 							Authorization: `token ${GITHUB_API_TOKEN}`
// 						}
// 					}
// 				);

// 				if (!folderResponse.ok) {
// 					console.error(
// 						`Failed to fetch contents of folder ${folder.name}: ${folderResponse.status}`
// 					);
// 					return;
// 				}

// 				const folderData = await folderResponse.json();

// 				// Filter and map image files
// 				folder.files = folderData
// 					.filter((item: any) => item.type === 'file' && /\.(jpeg|jpg|png|gif)$/i.test(item.name))
// 					.map((item: any) => ({
// 						name: item.name,
// 						url: item.download_url
// 					}));
// 			})
// 		);

// 		// Return the fetched data to render the page
// 		return {
// 			status: 200,
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: {
// 				folders
// 			}
// 		};
// 	} catch (error) {
// 		console.error('Error fetching data:', error);

// 		// Return an error response
// 		return {
// 			status: 500,
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: {
// 				error: 'Failed to fetch data from GitHub API'
// 			}
// 		};
// 	}
// }
