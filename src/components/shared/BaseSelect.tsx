import React, { useState } from "react";
import IBaseObject from "../../models/IBaseObject";
import "./BaseSelect.scss";

interface BaseSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder: string,
	options: IBaseObject[],
	onChangeOption: Function
};

function BaseSelect(props: BaseSelectProps) {
	const { placeholder, options, onChangeOption } = props;

	const [isActive, setIsActive] = useState(false);
	const [value, setValue] = useState("");

	const optionsList = options?.map((option: IBaseObject) =>
		<option value={option.id} key={option.id}>{option.name}</option>
	);

	const optionChanged = (event: any) => {
		const foundOption: IBaseObject | undefined = options.find((o: IBaseObject) => o.id.toString() === event.target.value.toString());
		setValue(event.target.value.toString());
		if (!!foundOption) {
			onChangeOption(foundOption);
		}
	};

	return (
		<div className={'select-component ' + (isActive ? 'select-component_active' : '')} onBlur={() => setIsActive(false)}>
			<select
				className={'select-component__select ' + (value === "" ? 'select-component__select_empty' : '')}
				onFocus={() => setIsActive(true)}
				onChange={optionChanged}>
				<option value="" hidden style={{ color: 'red' }}>{placeholder}</option>
				{optionsList}
			</select>
		</div>
	);
}

export default BaseSelect;
