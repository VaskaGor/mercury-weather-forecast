import React from "react";
import "./WeatherCard.scss";
import forecastPlaceholderImage from "../../assets/placeholder/forecast-placeholder.svg";

function WeatherCard(props: any) {

	const { isAdaptiveWidth, date, temperature } = props;

	return (
		<div className={'weather-card ' + (isAdaptiveWidth ? 'weather-card_adaptive-width' : '')}>
			<div className="weather-card__top">
				<p className="weather-card__date">{date}</p>
			</div>
			<div className="weather-card__middle">
				<img src={forecastPlaceholderImage} alt="Cloud" className="weather-card__weather-icon"></img>
			</div>
			<div className="weather-card__bottom">
				<p className="weather-card__temperature">{(temperature > 0 ? '+' : '') + temperature}°</p>
			</div>
		</div>
	);
}

export default WeatherCard;
