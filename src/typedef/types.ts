export type Researchers = {
	name: string;
	department: string;
	project: string;
	stored: boolean;
};

export type ResearcherList = Researchers[];
export type EChange = React.ChangeEvent<HTMLInputElement>;
