import React, { useState } from "react";
import IBaseObject from "../../models/IBaseObject";
import "./BaseSearchInput.scss";

function BaseSearchInput(props: any) {
	const { placeholder, options, onChangeOption } = props;

	const [isActive, setIsActive] = useState(false);

	const optionsList = !!options ? options.map((option: IBaseObject) =>
		<option value={option.id} key={option.id}>{option.name}</option>
	) : null;

	const optionChanged = (event: any) => {
		const foundOption: IBaseObject = options.find((o: IBaseObject) => o.id.toString() === event.target.value.toString());
		onChangeOption(foundOption);
	};

	return (
		<div className={'input-component ' + (isActive ? 'input-component_active' : '')} onBlur={() => setIsActive(false)}>
			<select name="" id="" className="input-component__input"
				onFocus={() => setIsActive(true)}
				onChange={optionChanged}>
				<option value="" disabled hidden selected>{placeholder}</option>
				{optionsList}
			</select>
		</div>
	);
}

export default BaseSearchInput;
