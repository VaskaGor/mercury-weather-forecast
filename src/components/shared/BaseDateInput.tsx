import React, { useState } from "react";
import "./BaseDateInput.scss";

function BaseDateInput(props: any) {
	const { placeholder } = props;

	const [isActive, setIsActive] = useState(false);
	
	let today: any = new Date();
	let dd: any = today.getDate();
	let mm: any = today.getMonth() + 1;
	const yyyy: any = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	today = yyyy + '-' + mm + '-' + dd;

	//TODO

	return (
		<div className={'date-input-component ' + (isActive ? 'date-input-component_active' : '')} onBlur={() => setIsActive(false)}>
			<input type="date" max={today.toString()} placeholder={placeholder} className="date-input-component__input" onClick={() => setIsActive(true)} />
		</div>
	);
}

export default BaseDateInput;
