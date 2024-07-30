export interface Repo {
	id: string;
	description: string | null;
	default_branch: string;
	full_name: string;
	name: string;
	homepage: string;
	html_url: string;
	language: string;
	pushed_at: string;
	updated_at: string;
	visibility: 'public' | 'private';
	archived: boolean;
}

export interface IProjectRepo extends Repo {
	isImported?: boolean;
	displayName?: string;
}
