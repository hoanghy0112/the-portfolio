<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Octokit } from 'octokit';
	import Select from './Select.svelte';

	type Props = {
		githubUser: any;
		token?: string;
	};

	const { githubUser, token }: Props = $props();

	const defaultSelectedOrganization = $page.url.searchParams.get('organization') || '';

	let selectedOrganization = $state(defaultSelectedOrganization);

	const items = $derived.by(async () => {
		if (!token) return [];

		const octokit = new Octokit({
			auth: token
		});
		const organizations = await octokit.request('GET /user/orgs', {
			headers: {
				'X-GitHub-Api-Version': '2022-11-28'
			}
		});
		return [
			{ id: githubUser.login, title: githubUser.login },
			...organizations.data.map((v) => ({ id: v.login, title: v.login }))
		];
	});
</script>

{#await items}
	<Select
		title="Choose organization"
		onSelect={({ id }) => {
			goto(`/main/create-project?organization=${id}`);
		}}
		bind:selected={selectedOrganization}
	/>
{:then items}
	<Select
		title="Choose organization"
		onSelect={({ id }) => {
			goto(`/main/create-project?organization=${id}`);
		}}
		bind:selected={selectedOrganization}
		{items}
	/>
{/await}
