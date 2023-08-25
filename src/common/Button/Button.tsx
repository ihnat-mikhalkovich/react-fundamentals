import React, { FC } from 'react';
import './styles.scss';

export interface ButtonProps {
	value: string | JSX.Element;
	onClick?: () => void;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => (
	<button onClick={props.onClick}>{props.value}</button>
);

export default Button;
