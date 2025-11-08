const ALLOWED_DAILY_KEYS = [
	"weathercode",
	"temperature_2m_max",
	"temperature_2m_min",
	"apparent_temperature_max",
	"apparent_temperature_min",
	"sunrise",
	"sunset",
	"precipitation_sum",
	"rain_sum",
	"showers_sum",
	"snowfall_sum",
	"precipitation_hours",
	"windspeed_10m_max",
	"windgusts_10m_max",
	"winddirection_10m_dominant",
	"shortwave_radiation_sum",
	"et0_fao_evapotranspiration",
] as const;

const DEFAULT_DAILY_KEYS = [
	"rain_sum",
	"snowfall_sum",
	"weathercode",
	"temperature_2m_max",
];

const COORDINATES = {
	LAT: 55.751244,
	LONG: 37.618423,
};

export { COORDINATES, DEFAULT_DAILY_KEYS, ALLOWED_DAILY_KEYS };
