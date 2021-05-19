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
import IDayForecast from "../../models/IDayForecast";

function ForecastCard(props: any) {

	const { isSingleDateForecast, cities } = props;

	const [pastDayForcastSelectedCity, setPastDayForcastSelectedCity] = useState<ICity | null>(null);
	const [pastDayForcastSelectedDate, setPastDayForcastSelectedDate] = useState<number | null>(null);
	const [sevenDaysForcastSelectedCity, setSevenDaysForcastSelectedCity] = useState<ICity | null>(null);
	const [forecastData, setForecastData] = useState<Array<IDayForecast> | IDayForecast | null>(null);
	const [isScrolledToStart, setIsScrolledToStart] = useState<boolean>(true);
	const [isScrolledToEnd, setIsScrolledToEnd] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		if (isSingleDateForecast) {
			if (!!pastDayForcastSelectedCity && !!pastDayForcastSelectedDate) {
				setIsLoading(true);
				WeatherApiService.getPastDayForecast(pastDayForcastSelectedCity, pastDayForcastSelectedDate, (data: IDayForecast) => { setForecastData(data); setIsLoading(false) });
			}
		} else {
			if (!!sevenDaysForcastSelectedCity) {
				setIsLoading(true);
				WeatherApiService.getSevenDaysForecast(sevenDaysForcastSelectedCity, (data: IDayForecast[]) => { setForecastData(data); setIsLoading(false) });
			}
		}
	}, [isSingleDateForecast, pastDayForcastSelectedCity, pastDayForcastSelectedDate, sevenDaysForcastSelectedCity]);

	const today: Date = new Date();
	today.setTime(today.getTime() - DateHelper.oneDayOffset);
	const yesterday: string = DateHelper.getDateString(today);
	const dateFiveDaysAgo: Date = new Date();
	dateFiveDaysAgo.setTime(dateFiveDaysAgo.getTime() - DateHelper.oneDayOffset * 5);
	const fiveDaysAgo: string = DateHelper.getDateString(dateFiveDaysAgo);

	const weatherCardsSlides = useRef(null);
	const weatherCardWidth = 184;

	const slidesScrolled = (event: any) => {
		if (event.target.scrollLeft === 0) {
			setIsScrolledToStart(true);
			setIsScrolledToEnd(false);
		} else if (event.target.scrollLeft === (event.target.scrollWidth - event.target.offsetWidth)) {
			setIsScrolledToStart(false);
			setIsScrolledToEnd(true);
		} else {
			setIsScrolledToStart(false);
			setIsScrolledToEnd(false);
		}
	}

	const rightButtonClick = () => {
		if (!!weatherCardsSlides && !!weatherCardsSlides.current) {
			const slides = (weatherCardsSlides!.current! as Element);
			slides.scroll(slides.scrollLeft + weatherCardWidth, 0);
		}
	};
	const leftButtonClick = () => {
		if (!!weatherCardsSlides && !!weatherCardsSlides.current) {
			const slides = (weatherCardsSlides!.current! as Element);
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
			const selectedDateTimeUTC = DateHelper.convertDateTimeToUTCTime(selectedDate.getTime() + Math.round(DateHelper.oneDayOffset / 2));
			console.log(selectedDateTimeUTC);
			setPastDayForcastSelectedDate(selectedDateTimeUTC);
		}
	};

	const forecastView = isSingleDateForecast
		? (!!forecastData ? <div style={{ margin: '10px 0', width: '100%' }}>
			<WeatherCard
				isAdaptiveWidth={true}
				dayForecast={forecastData}
				isLoading={isLoading}>
			</WeatherCard>
		</div> : null)
		: (!!forecastData ? <div className="cards-carousel">
			<div className="cards-carousel__slides" ref={weatherCardsSlides} onScroll={slidesScrolled}>
				{forecastData && (forecastData as IDayForecast[]).map((f: any) =>
					<div>
						<WeatherCard
							dayForecast={f}
							isLoading={isLoading}
						></WeatherCard>
					</div>
				)}
			</div>
			<button className={'cards-carousel__switch-button cards-carousel__switch-button_left '
				+ (isScrolledToStart ? 'cards-carousel__switch-button_disabled' : '')}
				onClick={leftButtonClick}>
			</button>
			<button
				className={'cards-carousel__switch-button cards-carousel__switch-button_right '
					+ (isScrolledToEnd ? 'cards-carousel__switch-button_disabled' : '')}
				onClick={rightButtonClick}>
			</button>
		</div > : null);

	const placeholderView = (!forecastData &&
		<div className="forecast-card__placeholder">
			<img src={forecastPlaceholderImage} alt="Cloud" className="forecast-card__placeholder-image">
			</img>
			<span className="forecast-card__placeholder-title">
				Fill in all the fields and the weather will be displayed
			</span>
		</div>);

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
						maxDate={yesterday}
						onChangeDate={changeSelectedDate}>
					</BaseDateInput>}
			</div>
			<div className="forecast-card__information">
				{placeholderView}
				{forecastView}
				<div></div>
			</div>
		</div >
	);
}

export default ForecastCard;
