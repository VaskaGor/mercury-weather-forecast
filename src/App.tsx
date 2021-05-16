import React from "react";
import "./App.scss";
import ForecastCard from "./components/view/ForecastCard";

function App() {
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
					<ForecastCard></ForecastCard>
				</div>
				<div className="app__forecast-column">
					<ForecastCard></ForecastCard>
				</div>
			</main>

			<footer className="app__footer">
				C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT
			</footer>
		</div>
	);
}

export default App;
