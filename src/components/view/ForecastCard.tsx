import React, { useRef } from "react";
import "./ForecastCard.scss";
import "./CardsCarousel.scss";
import forecastPlaceholderImage from "../../assets/placeholder/forecast-placeholder.svg";
import BaseSearchInput from "../shared/BaseSearchInput";
import BaseDateInput from "../shared/BaseDateInput";
import WeatherCard from "./WeatherCard";

function ForecastCard(props: any) {

	const { isSingleDateForecast } = props;

	const hasForecastData = false;

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

	return (
		<div className="forecast-card">
			<div className="forecast-card__header">
				<h1 className="forecast-card__title">{isSingleDateForecast ? 'Forecast for a Date in the Past' : '7 Days Forecast'}</h1>
			</div>
			<div className="forecast-card__search-bar">
				<BaseSearchInput placeholder={'Select city'}></BaseSearchInput>
				{isSingleDateForecast && <BaseDateInput placeholder={'Select date'}></BaseDateInput>}
			</div>
			<div className="forecast-card__information">
				{!hasForecastData && <div className="forecast-card__placeholder">
					<img src={forecastPlaceholderImage} alt="Cloud" className="forecast-card__placeholder-image">

					</img>
					<span className="forecast-card__placeholder-title">
						Fill in all the fields and the weather will be displayed
					</span>
				</div>}
				{!!hasForecastData && isSingleDateForecast &&
					<div style={{ margin: '10px 0', width: '100%' }}>
						<WeatherCard isAdaptiveWidth={true}>
						</WeatherCard>
					</div>
				}
				{!!hasForecastData && !isSingleDateForecast && <div className="cards-carousel">

					<div className="cards-carousel__slides" ref={weatherCardsSlides}>
						<div><WeatherCard></WeatherCard></div>
						<div><WeatherCard></WeatherCard></div>
						<div><WeatherCard></WeatherCard></div>
						<div><WeatherCard></WeatherCard></div>
						<div><WeatherCard></WeatherCard></div>
						<div><WeatherCard></WeatherCard></div>
						<div><WeatherCard></WeatherCard></div>
					</div>
					{/* cards-carousel__switch-button_disabled */}
					<button className="cards-carousel__switch-button cards-carousel__switch-button_left" onClick={leftButtonClick}></button>
					<button className="cards-carousel__switch-button cards-carousel__switch-button_right" onClick={rightButtonClick}></button>
				</div>}

			</div>
		</div >
	);
}

export default ForecastCard;
