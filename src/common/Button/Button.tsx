import React, { FC } from 'react';
import './styles.scss';

export interface ButtonProps {
	component: React.ReactNode;
	onClick?: () => void;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => (
	<button onClick={props.onClick}>{props.component}</button>
);

export default Button;
