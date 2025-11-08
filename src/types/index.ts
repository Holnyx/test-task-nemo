export type Daily = {
	time: string[];
	[key: string]: number[] | string[] | undefined;
};

export type DataFromServer = {
	daily: Daily;
	latitude: number;
	longitude: number;
	timezone: string;
};
