import React from "react";
import "./ForecastCard.scss";
import forecastPlaceholderImage from "../src/assets/placeholder/forecast-placeholder.svg";

function ForecastCard() {
	return (
		<div className="forecast-card">
			<div className="forecast-card__header">
				<h1 className="forecast-card__title">Forecast for a Date in the Past</h1>
			</div>
			<div className="forecast-card__search-bar">
				<div style={{ width: '252px', minWidth: '252px', height: '48px', background: '#8083A4', borderRadius: '8px', opacity: 0.6 }}></div>
				<div style={{ width: '252px', minWidth: '252px', height: '48px', background: '#8083A4', borderRadius: '8px', opacity: 0.6 }}></div>
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
			</div>
		</div>
	);
}

export default ForecastCard;
