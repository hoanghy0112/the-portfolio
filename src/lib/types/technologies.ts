export type TechnologyType = {
	name: string;
	altnames: string[];
	tags: string[];
	versions: {
		svg: string[];
		font: string[];
	};
	color: string;
	aliases: {
		base: string;
		alias: string;
	}[];
};

export type TagType =
	| 'language'
	| 'os'
	| 'framework'
	| 'database'
	| 'architecture'
	| 'nodejs'
	| 'java'
	| 'javascript'
	| 'cloud'
	| 'server'
	| 'hosting'
	| 'python'
	| 'mobile'
	| 'web'
	| 'automation'
	| 'provisioning'
	| 'deployment'
	| 'continuous-delivery'
	| 'data-science';
