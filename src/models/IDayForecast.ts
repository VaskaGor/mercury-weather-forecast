interface IDayForecast {
	date: string,
	temperature: number,
	weather: {
		title: string,
		iconId: string
	}
}

export default IDayForecast;