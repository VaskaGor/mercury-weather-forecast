import ICity from "../models/ICity";
import IDayForecast from "../models/IDayForecast";
import DateHelper from "./DateHelper";

const objToQueryString = (obj: any) => {
	const keyValuePairs = [];
	for (const key in obj) {
		keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
	}
	return keyValuePairs.join('&');
}

const apiKey = "dd0c5383ed3ef5146baae1a53c5225f6";
const weatherIconBaseURL = "http://openweathermap.org/img/wn/";

const WeatherApiService = {
	getWeatherIconURL: function (iconId: string): string {
		return `${weatherIconBaseURL}${iconId}@2x.png`;
	},
	getPastDayForecast: function (city: ICity, dateTime: number, callback: Function): void {
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
				let day: any = data.current;
				if (!day) {
					if (!!data.message) {
						alert(data.message);
					}
					callback(null);
					return;
				}
				const forecast: IDayForecast = {
					date: DateHelper.convertDateToUserView(DateHelper.convertUTCTimeToDate(day.dt)),
					temperature: Math.round(day.temp),
					weather: {
						title: day.weather[0].main,
						iconId: day.weather[0].icon
					}
				};
				callback(forecast);
			})
			.catch((err) => {
				console.log(err);
				callback(null);
			})
	},
	getSevenDaysForecast: function (city: ICity, callback: Function): void {
		const params = {
			lat: city.latitude,
			lon: city.longitude,
			appid: apiKey,
			units: "metric"
		};
		fetch(`https://api.openweathermap.org/data/2.5/onecall?${objToQueryString(params)}`,)
			.then(res => res.json())
			.then((data) => {
				if (!data.daily) {
					if (!!data.message) {
						alert(data.message);
					}
					callback(null);
					return;
				}
				const forecast: IDayForecast[] = data.daily.slice(1).map((day: any) => {
					return {
						date: DateHelper.convertDateToUserView(DateHelper.convertUTCTimeToDate(day.dt)),
						temperature: Math.round(day.temp.day),
						weather: {
							title: day.weather[0].main,
							iconId: day.weather[0].icon
						}
					}
				});
				callback(forecast);
			})
			.catch((err) => {
				console.log(err);
				callback(null);
			})
	},
}

export default WeatherApiService;