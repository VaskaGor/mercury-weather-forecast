import React, { useEffect, useState } from "react";
import "./App.scss";
import ForecastCard from "./components/view/ForecastCard";
import IBaseObject from "./models/IBaseObject";
import ICity from "./models/ICity";
import IDayForecast from "./models/IDayForecast";
import DateHelper from "./serveses/DateHelper";
import WeatherApiService from "./serveses/WeatherApiService";

function App() {

	const [pastDayForcastSelectedCity, setPastDayForcastSelectedCity] = useState<ICity | null>(null);
	const [pastDayForcastSelectedDate, setPastDayForcastSelectedDate] = useState<number | null>(null);
	const [pastDayForecastData, setPastDayForecastData] = useState<IDayForecast | null>(null);
	const [isPastDayForecastData, setIsPastDayForecastDataLoading] = useState<boolean>(false);

	const [sevenDaysForcastSelectedCity, setSevenDaysForcastSelectedCity] = useState<ICity | null>(null);
	const [sevenDaysForecastData, setSevenDaysForecastData] = useState<Array<IDayForecast> | null>(null);
	const [isSevenDaysForecastDataLoading, setIsSevenDaysForecastDataLoading] = useState<boolean>(false);


	useEffect(() => {
		if (!!pastDayForcastSelectedCity && !!pastDayForcastSelectedDate) {
			setIsPastDayForecastDataLoading(true);
			WeatherApiService.getPastDayForecast(pastDayForcastSelectedCity,
				pastDayForcastSelectedDate, (data: IDayForecast) => {
					setPastDayForecastData(data);
					setIsPastDayForecastDataLoading(false);
				});
		}
	}, [pastDayForcastSelectedCity, pastDayForcastSelectedDate]);

	useEffect(() => {
		if (!!sevenDaysForcastSelectedCity) {
			setIsSevenDaysForecastDataLoading(true);
			WeatherApiService.getSevenDaysForecast(sevenDaysForcastSelectedCity,
				(data: IDayForecast[]) => {
					setSevenDaysForecastData(data);
					setIsSevenDaysForecastDataLoading(false);
				});
		}
	}, [sevenDaysForcastSelectedCity]);

	const changeSelectedCity = (city: IBaseObject, isSingleDateForecast: boolean) => {
		if (isSingleDateForecast) {
			setPastDayForcastSelectedCity(city as ICity);
		} else {
			setSevenDaysForcastSelectedCity(city as ICity);
		}
	};

	const changeSelectedDate = (selectedDate: Date) => {
		const selectedDateTimeUTC = DateHelper.convertDateTimeToUTCTime(selectedDate.getTime() + Math.round(DateHelper.oneDayOffset / 2));
		setPastDayForcastSelectedDate(selectedDateTimeUTC);
	};

	const cities = [{
		id: 0,
		name: "Самара",
		latitude: 53.195873,
		longitude: 50.100193
	}, {
		id: 1,
		name: "Тольятти",
		latitude: 53.507836,
		longitude: 49.420393,
	}, {
		id: 2,
		name: "Саратов",
		latitude: 51.533557,
		longitude: 46.034257,
	}, {
		id: 3,
		name: "Казань",
		latitude: 55.796127,
		longitude: 49.106405
	}, {
		id: 4,
		name: "Краснодар",
		latitude: 45.035470,
		longitude: 38.975313
	},];

	return (
		<div className="app">
			<header className="app__header">
				<p className="app__title">
					<span>Weather</span>
					<span>forecast</span>
				</p>
			</header>

			<main className="app__main">
				<div className="app__forecast-column">
					<ForecastCard
						isSingleDateForecast={false}
						cities={cities}
						forecastData={sevenDaysForecastData}
						isLoading={isSevenDaysForecastDataLoading}
						changeSelectedCity={changeSelectedCity}
						changeSelectedDate={changeSelectedDate}></ForecastCard>
				</div>
				<div className="app__forecast-column">
					<ForecastCard
						isSingleDateForecast={true}
						cities={cities}
						forecastData={pastDayForecastData}
						isLoading={isPastDayForecastData}
						changeSelectedCity={changeSelectedCity}
						changeSelectedDate={changeSelectedDate}></ForecastCard>
				</div>
			</main>

			<footer className="app__footer">
				C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT
			</footer>
		</div>
	);
}

export default App;
