import type { Project } from '@prisma/client';

export type PortfolioStatistic = {
	averageAccessTime: number;
	users: number;
	views: number;
	visitTimeOfEachProject: { project: Project; visitTime: number }[];
};
