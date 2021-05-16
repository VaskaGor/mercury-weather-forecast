import React from "react";
import "./WeatherCard.scss";
import forecastPlaceholderImage from "../../assets/placeholder/forecast-placeholder.svg";

function WeatherCard() {
	return (
		<div className="weather-card">
			<div className="weather-card__top">
				<p className="weather-card__date">29 sep 2021</p>
			</div>
			<div className="weather-card__middle">
				<img src={forecastPlaceholderImage} alt="Cloud" className="weather-card__weather-icon"></img>
			</div>
			<div className="weather-card__bottom">
				<p className="weather-card__temperature">+17°</p>
			</div>
		</div>
	);
}

export default WeatherCard;
