import React, { useEffect, useRef, useState } from "react";
import "./ForecastCard.scss";
import "./CardsCarousel.scss";
import forecastPlaceholderImage from "../../assets/placeholder/forecast-placeholder.svg";
import BaseSearchInput from "../shared/BaseSearchInput";
import BaseDateInput from "../shared/BaseDateInput";
import WeatherCard from "./WeatherCard";
import IBaseObject from "../../models/IBaseObject";
import WeatherApiService from "../../serveses/WeatherApiService";
import DateHelper from "../../serveses/DateHelper";
import ICity from "../../models/ICity";

function ForecastCard(props: any) {

	const { isSingleDateForecast, cities } = props;

	const [hasForecastData, setHasForecastData] = useState(false);
	const [pastDayForcastSelectedCity, setPastDayForcastSelectedCity] = useState<ICity | null>(null);
	const [pastDayForcastSelectedDate, setPastDayForcastSelectedDate] = useState<number | null>(null);
	const [sevenDaysForcastSelectedCity, setSevenDaysForcastSelectedCity] = useState<ICity | null>(null);
	const [forecastData, setForecastData] = useState<Array<any> | Object | null>(null);

	const updateForecastData = () => {
		if (isSingleDateForecast) {
			if (!!pastDayForcastSelectedCity && !!pastDayForcastSelectedDate) {
				WeatherApiService.getPastDayForecast(pastDayForcastSelectedCity, pastDayForcastSelectedDate, setForecastData);
				setHasForecastData(true);
			} else {
				setHasForecastData(false);
			}
		} else {
			if (!!sevenDaysForcastSelectedCity) {
				WeatherApiService.getSevenDaysForecast(sevenDaysForcastSelectedCity, setForecastData);
				setHasForecastData(true);
			} else {
				setHasForecastData(false);
			}
		}
	};

	useEffect(() => {
		updateForecastData();
	}, [pastDayForcastSelectedCity,
		pastDayForcastSelectedDate,
		sevenDaysForcastSelectedCity]);

	const today: string = DateHelper.getDateString(new Date());
	const dateFiveDaysAgo: Date = new Date();
	dateFiveDaysAgo.setTime(dateFiveDaysAgo.getTime() - DateHelper.oneDayOffset * 5);
	const fiveDaysAgo: string = DateHelper.getDateString(dateFiveDaysAgo);

	const weatherCardsSlides = useRef(null);
	const weatherCardWidth = 184;

	const rightButtonClick = () => {
		//TODO check all sroll width
		if (!!weatherCardsSlides && !!weatherCardsSlides.current) {
			const slides = (weatherCardsSlides!.current! as Element);

			slides.scroll(slides.scrollLeft + weatherCardWidth, 0);
		}
	};
	const leftButtonClick = () => {
		//TODO check all sroll width
		if (!!weatherCardsSlides && !!weatherCardsSlides.current) {
			const slides = (weatherCardsSlides!.current! as Element);
			const weatherCardWidth = 184;
			slides.scroll(slides.scrollLeft - weatherCardWidth, 0);
		}
	};

	const changeSelectedCity = (city: IBaseObject) => {
		if (isSingleDateForecast) {
			console.log(city);
			setPastDayForcastSelectedCity(city as ICity);
		} else {
			console.log(city);
			setSevenDaysForcastSelectedCity(city as ICity);
		}
	};

	const changeSelectedDate = (selectedDate: Date) => {
		if (isSingleDateForecast) {
			const selectedDateTimeUTC = DateHelper.convertDateToUTCTime(selectedDate);
			console.log(selectedDateTimeUTC);
			setPastDayForcastSelectedDate(selectedDateTimeUTC);
		}
	};

	const forecastView = isSingleDateForecast
		? (hasForecastData ? <div style={{ margin: '10px 0', width: '100%' }}>
			<WeatherCard
				isAdaptiveWidth={true}
				date={!!forecastData ? (forecastData! as any).date : 'empty'}
				temperature={!!forecastData ? (forecastData! as any).temperature : 0}>
			</WeatherCard>
		</div> : null)
		: (hasForecastData ? <div className="cards-carousel">
			<div className="cards-carousel__slides" ref={weatherCardsSlides}>
				{forecastData && (forecastData as Array<any>).map((f: any) =>
					<div><WeatherCard date={f.date} temperature={f.temperature}></WeatherCard></div>
				)}
			</div>
			{/* cards-carousel__switch-button_disabled */}
			<button className="cards-carousel__switch-button cards-carousel__switch-button_left" onClick={leftButtonClick}></button>
			<button className="cards-carousel__switch-button cards-carousel__switch-button_right" onClick={rightButtonClick}></button>
		</div> : null);

	return (
		<div className="forecast-card">
			<div className="forecast-card__header">
				<h1 className="forecast-card__title">{isSingleDateForecast ? 'Forecast for a Date in the Past' : '7 Days Forecast'}</h1>
			</div>
			<div className="forecast-card__search-bar">
				<BaseSearchInput placeholder={'Select city'} options={cities} onChangeOption={changeSelectedCity}></BaseSearchInput>
				{isSingleDateForecast &&
					<BaseDateInput placeholder={'Select date'}
						minDate={fiveDaysAgo}
						maxDate={today}
						onChangeDate={changeSelectedDate}>
					</BaseDateInput>}
			</div>
			<div className="forecast-card__information">
				{!hasForecastData && <div className="forecast-card__placeholder">
					<img src={forecastPlaceholderImage} alt="Cloud" className="forecast-card__placeholder-image">

					</img>
					<span className="forecast-card__placeholder-title">
						Fill in all the fields and the weather will be displayed
					</span>
				</div>}
				{forecastView}
			</div>
		</div >
	);
}

export default ForecastCard;
