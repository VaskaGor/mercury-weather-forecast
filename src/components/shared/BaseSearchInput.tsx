import React, { useState } from "react";
import "./BaseSearchInput.scss";

function BaseSearchInput(props: any) {
	const { placeholder } = props;

	const [isActive, setIsActive] = useState(false);

	//TODO
	//create normal search-input

	return (
		<div className={'input-component ' + (isActive ? 'input-component_active' : '')} onBlur={() => setIsActive(false)}>
			<input list="cookies" placeholder={placeholder} className="input-component__input" onClick={() => setIsActive(true)} />

			<datalist id="cookies">
				<option value="Chocolate Chip" />
				<option value="Peanut Butter" />
				<option value="Raisin Oatmeal" />
				<option value="Chocolate Chip1" />
				<option value="Peanut Butter1" />
				<option value="Raisin Oatmeal1" />
				<option value="Chocolate Chip2" />
				<option value="Peanut Butter2" />
				<option value="Raisin Oatmeal2" />
				<option value="Chocolate Chip3" />
				<option value="Peanut Butter3" />
				<option value="Raisin Oatmeal3" />
			</datalist>
		</div>
	);
}

export default BaseSearchInput;
