import React, { FC, useContext } from 'react';
import Logo from './components/logo/Logo';
import Button from 'src/common/Button/Button';
import './header.scss';
import { BUTTON_VALUE_LOGIN, BUTTON_VALUE_LOGOUT } from 'src/constants';
import { AuthContext } from '../../App';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

const userAuthenticatedHeader = (username: string, logout: () => void) => (
	<>
		<span>{username}</span>
		<Button onClick={logout} value={BUTTON_VALUE_LOGOUT} />
	</>
);

const userNotAuthenticatedHeader = (login: () => void) => (
	<>
		<Button onClick={login} value={BUTTON_VALUE_LOGIN} />
	</>
);

const isLoginOrRegistration = (pathname: string) =>
	pathname === '/login' || pathname === '/registration';

const redirectAfterLogin = (navigate: NavigateFunction): void =>
	navigate('/login');

const Header: FC = () => {
	const { isUserAuthenticated, username, login, logout } =
		useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<div className='header'>
			<div>
				<Logo />
			</div>
			<div className='navbar'>
				{!isLoginOrRegistration(location.pathname) &&
					(isUserAuthenticated
						? userAuthenticatedHeader(username, logout)
						: userNotAuthenticatedHeader(() => redirectAfterLogin(navigate)))}
			</div>
		</div>
	);
};

export default Header;
