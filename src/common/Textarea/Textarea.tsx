import React, { ChangeEvent, FC } from 'react';
import './styles.scss';
import { FORM_PLACEHOLDER } from '../../constants';

export interface TextareaProps {
	label: string;
	value: string;
	placeholder?: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
}

const Input: FC<TextareaProps> = (props: TextareaProps) => (
	<div className='textarea'>
		<label htmlFor={props.label}>{props.label}</label>
		<textarea
			id={props.label}
			value={props.value}
			placeholder={props.placeholder ? props.placeholder : FORM_PLACEHOLDER}
			onChange={props.onChange}
			className={props.className}
		/>
	</div>
);

export default Input;
