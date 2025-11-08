interface getContentProps {
	lat: number;
	long: number;
	variables: string[];
}

export const getContent = ({ lat, long, variables }: getContentProps) => {
	const arrayVariables = variables.join(",");

	return fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=${arrayVariables}&timezone=Europe/Moscow&past_days=0`,
		{ method: "GET" }
	)
		.then((resp) => {
			if (!resp.ok) {
				throw new Error("Error fetching weather data");
			}
			return resp.json();
		})
};
