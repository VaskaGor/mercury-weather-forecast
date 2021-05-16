import React from "react";
import "./ForecastCard.scss";
import forecastPlaceholderImage from "../../assets/placeholder/forecast-placeholder.svg";
import BaseSearchInput from "../shared/BaseSearchInput";
import BaseDateInput from "../shared/BaseDateInput";
import WeatherCard from "./WeatherCard";

function ForecastCard() {
	return (
		<div className="forecast-card">
			<div className="forecast-card__header">
				<h1 className="forecast-card__title">Forecast for a Date in the Past</h1>
			</div>
			<div className="forecast-card__search-bar">
				<BaseSearchInput placeholder={'Select city'}></BaseSearchInput>
				<BaseDateInput placeholder={'Select date'}></BaseDateInput>
			</div>
			<div className="forecast-card__information">
				{/* weather cards or empty preview */}
				<div className="forecast-card__placeholder">
					<img src={forecastPlaceholderImage} alt="Cloud" className="forecast-card__placeholder-image">

					</img>
					<span className="forecast-card__placeholder-title">
						Fill in all the fields and the weather will be displayed
					</span>
				</div>
				{/* 				<div style={{ display: 'flex', overflowX: 'auto', overflow: 'hidden' }}><WeatherCard></WeatherCard>
					<WeatherCard></WeatherCard>
					<WeatherCard></WeatherCard>
					<WeatherCard></WeatherCard>
					<WeatherCard></WeatherCard>
					<WeatherCard></WeatherCard>
					<WeatherCard></WeatherCard></div> */}

			</div>
		</div>
	);
}

export default ForecastCard;
