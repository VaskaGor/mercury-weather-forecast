import ICity from "../models/ICity";
import DateHelper from "./DateHelper";

const objToQueryString = (obj: any) => {
	const keyValuePairs = [];
	for (const key in obj) {
		keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
	}
	return keyValuePairs.join('&');
}

const apiKey = "47059c77f16288ad28c4a6f1e475471f";

const WeatherApiService = {
	getPastDayForecast: function (city: ICity, dateTime: number, callback: Function): any {
		const params = {
			lat: city.latitude,
			lon: city.longitude,
			appid: apiKey,
			dt: dateTime,
			units: "metric"
		};
		fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?${objToQueryString(params)}`,)
			.then(res => res.json())
			.then((data) => {
				console.log(data);
				let day: any = data.current;
				const forecast = {
					date: DateHelper.convertDateToUserView(DateHelper.convertUTCTimeToDate(day.dt)),
					temperature: Math.round(day.temp),
					weather: {
						title: day.weather[0].main,
						iconId: day.weather[0].icon
					}
				};
				console.log(forecast);
				callback(forecast);
				return forecast;
			})
			.catch((err) => {
				console.log(err);
				return null;
			})
	},
	getSevenDaysForecast: function (city: ICity, callback: Function): any {
		const params = {
			lat: city.latitude,
			lon: city.longitude,
			appid: apiKey,
			units: "metric"
		};
		fetch(`https://api.openweathermap.org/data/2.5/onecall?${objToQueryString(params)}`,)
			.then(res => res.json())
			.then((data) => {
				console.log(data);
				const forecast = data.daily.slice(1).map((day: any) => {
					return {
						date: DateHelper.convertDateToUserView(DateHelper.convertUTCTimeToDate(day.dt)),
						temperature: Math.round(day.temp.day),
						weather: {
							title: day.weather[0].main,
							iconId: day.weather[0].icon
						}
					}
				});
				console.log(forecast);
				callback(forecast);
				return forecast;
			})
			.catch((err) => {
				console.log(err);
				return null;
			})
	},
}

export default WeatherApiService;