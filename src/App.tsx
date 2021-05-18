import React from "react";
import "./App.scss";
import ForecastCard from "./components/view/ForecastCard";

function App() {
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
					<ForecastCard isSingleDateForecast={false} cities={cities}></ForecastCard>
				</div>
				<div className="app__forecast-column">
					<ForecastCard isSingleDateForecast={true} cities={cities}></ForecastCard>
				</div>
			</main>

			<footer className="app__footer">
				C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT
			</footer>
		</div>
	);
}

export default App;
