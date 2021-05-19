import React, { useState } from "react";
import "./BaseDateInput.scss";

interface BaseDateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder: string,
	minDate: string,
	maxDate: string,
	onChangeDate: Function
};


function BaseDateInput(props: BaseDateInputProps) {
	const { placeholder, minDate, maxDate, onChangeDate } = props;

	const [isActive, setIsActive] = useState(false);

	const dateChanged = (event: any) => {
		const selectedDate = new Date(event.target.value);
		onChangeDate(selectedDate);
	}

	return (
		<div className={'date-input-component ' + (isActive ? 'date-input-component_active' : '')} onBlur={() => setIsActive(false)}>
			<input type="date"
				min={minDate}
				max={maxDate}
				placeholder={placeholder}
				className="date-input-component__input"
				onClick={() => setIsActive(true)}
				onChange={dateChanged} />
		</div>
	);
}

export default BaseDateInput;
