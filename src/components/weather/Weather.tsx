import React, { memo, useCallback, useEffect, useState } from "react";

import ErrorBox from "../error/Error";
import Loader from "../loader/Loader";

import { getContent } from "../../api";
import { DataFromServer } from "../../types";
import { ALLOWED_DAILY_KEYS } from "../../constants";

import s from "./Weather.module.css";

interface WeatherProps {
	lat: number;
	long: number;
	variables: string[];
	onSuccess: (vars: string[]) => void;
	onRestoreVariables: () => void;
}

const Weather: React.FC<WeatherProps> = ({
	lat,
	long,
	variables,
	onSuccess,
	onRestoreVariables,
}) => {
	const [weather, setWeather] = useState<DataFromServer | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchWeather = useCallback(async () => {
		const invalidVars = variables.find(
			(value) => !(ALLOWED_DAILY_KEYS as readonly string[]).includes(value)
		);
		if (invalidVars) {
			setIsLoading(false);
			setError(`Unsupported field: "${invalidVars}"`);
			return;
		}
		try {
			setIsLoading(true);
			const data = await getContent({ lat, long, variables });
			setWeather(data);
			onSuccess(variables);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Error fetching weather data"
			);
		} finally {
			setIsLoading(false);
		}
		setError(null);
	}, [lat, long, variables, onSuccess]);

	useEffect(() => {
		fetchWeather();
	}, [fetchWeather]);

	if (isLoading) return <Loader />;
	if (error) return <ErrorBox message={error} onBack={onRestoreVariables} />;

	return (
		<table className={s.table}>
			<thead>
				<tr>
					<th scope="col">date</th>
					{variables.map((variable) => (
						<th scope="col" key={variable}>
							{variable}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{weather?.daily.time.map((item, i) => (
					<tr key={item}>
						<th scope="row">{item}</th>
						{variables.map((variable) => (
							<td key={variable}>{weather.daily[variable]?.[i]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default memo(Weather);
