import React, { ChangeEvent, FC } from 'react';
import './styles.scss';

export interface InputProps {
	value: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (props: InputProps) => (
	<input
		value={props.value}
		placeholder={props.placeholder}
		onChange={props.onChange}
	/>
);

export default Input;
