import { ChangeEvent, FormEvent, useCallback, useState } from "react";

import Weather from "./components/weather/Weather";
import {
	ALLOWED_DAILY_KEYS,
	COORDINATES,
	DEFAULT_DAILY_KEYS,
} from "./constants";

import s from "./App.module.css";

const App = () => {
	const [variables, setVariables] = useState<string[]>(DEFAULT_DAILY_KEYS);
	const [lastVariables, setLastVariables] =
		useState<string[]>(DEFAULT_DAILY_KEYS);
	const [query, setQuery] = useState("");

	const addVariable = () => {
		const value = query.trim();
		if (!value) return;
		setVariables(
			lastVariables.includes(value) ? lastVariables : [...lastVariables, value]
		);
		setQuery("");
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addVariable();
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.currentTarget.value);
	};

	const onSuccess = useCallback((vars: string[]) => {
		setLastVariables(vars);
	}, []);

	const onRestoreVariables = useCallback(() => {
		setVariables(lastVariables);
	}, [lastVariables]);

	const availableKeys = ALLOWED_DAILY_KEYS.filter(
		(key) => !variables.includes(key)
	);
	const exists = !!query.trim() && lastVariables.includes(query.trim());

	return (
		<div className={s.main}>
			<form className={s.form} onSubmit={onSubmit}>
				<input
					className={s.main__input}
					type="text"
					list="weather-vars"
					placeholder="Enter data"
					value={query}
					onChange={onChange}
				/>
				<datalist id="weather-vars">
					{availableKeys.map((value) => (
						<option key={value} value={value} />
					))}
				</datalist>
				{exists && <div className={s.alarm}>This field already exists</div>}
			</form>
			<Weather
				lat={COORDINATES.LAT}
				long={COORDINATES.LONG}
				variables={variables}
				onSuccess={onSuccess}
				onRestoreVariables={onRestoreVariables}
			/>
		</div>
	);
};

export default App;
