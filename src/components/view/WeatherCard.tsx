import React from "react";
import WeatherApiService from "../../serveses/WeatherApiService";
import "./WeatherCard.scss";

function WeatherCard(props: any) {

	const { isAdaptiveWidth, isLoading, dayForecast } = props;

	return (
		<div className={'weather-card ' + (isAdaptiveWidth ? 'weather-card_adaptive-width ' : '') + (isLoading ? 'weather-card_loading ' : '')}>
			<div className="weather-card__top">
				<p className="weather-card__date">{!!dayForecast ? dayForecast.date : ''}</p>
			</div>
			<div className="weather-card__middle">
				{!!dayForecast &&
					<img src={WeatherApiService.getWeatherIconURL(dayForecast.weather.iconId)}
						alt={dayForecast.weather.title}
						title={dayForecast.weather.title}
						className="weather-card__weather-icon">
					</img>}
			</div>
			<div className="weather-card__bottom">
				<p className="weather-card__temperature">{!!dayForecast ? ((dayForecast.temperature > 0 ? '+' : '') + dayForecast.temperature + '°') : ''}</p>
			</div>
		</div>
	);
}

export default WeatherCard;
