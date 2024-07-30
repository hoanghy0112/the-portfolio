import { TECHNOLOGIES } from '$lib/constants/technologies';
import type { TechnologyType } from '$lib/types/technologies';

export function searchTechnologies(keyword: string): TechnologyType[] {
	const regex = new RegExp(keyword, 'ig');

	return TECHNOLOGIES.filter(
		(v) => v.name.match(regex) || v.altnames.some((altname) => altname.match(regex))
	);
}
