import React, { FC } from 'react';
import Logo from './components/logo/Logo';
import Button from 'src/common/Button/Button';
import './header.scss';
import { ALERT_BUTTON_DONT_WORK, BUTTON_VALUE_LOGOUT } from 'src/constants';

const Header: FC = () => (
	<div className='header'>
		<div>
			<Logo />
		</div>
		<div className='navbar'>
			<span>Harry Potter</span>
			<Button
				onClick={() => alert(ALERT_BUTTON_DONT_WORK)}
				value={BUTTON_VALUE_LOGOUT}
			/>
		</div>
	</div>
);

export default Header;
