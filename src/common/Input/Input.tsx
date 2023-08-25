import React, { ChangeEvent, FC } from 'react';
import './styles.scss';
import { FORM_PLACEHOLDER } from '../../constants';

export interface InputProps {
	label: string;
	value: string;
	placeholder?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	type: string;
}

const Input: FC<InputProps> = (props: InputProps) => (
	<div className='input'>
		<label htmlFor={props.label}>{props.label}</label>
		<input
			id={props.label}
			type={props.type}
			value={props.value}
			placeholder={props.placeholder ? props.placeholder : FORM_PLACEHOLDER}
			onChange={props.onChange}
			className={props.className}
		/>
	</div>
);

export default Input;
