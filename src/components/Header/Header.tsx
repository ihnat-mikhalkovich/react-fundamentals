import React, { FC } from 'react';
import Logo from './components/logo/Logo';
import Button from 'src/common/Button/Button';
import './header.scss';
import { BUTTON_VALUE_LOGIN, BUTTON_VALUE_LOGOUT } from 'src/constants';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootType } from '../../store/rootReducer';
import { useAppDispatch } from '../../hooks';
import { logoutThunk } from '../../store/user/thunk';

const userAuthenticatedHeader = (username: string, logout: () => void) => (
	<>
		<span>{username}</span>
		<Button onClick={logout} component={BUTTON_VALUE_LOGOUT} />
	</>
);

const userNotAuthenticatedHeader = (login: () => void) => (
	<>
		<Button onClick={login} component={BUTTON_VALUE_LOGIN} />
	</>
);

const isLoginOrRegistration = (pathname: string) =>
	['/login', '/registration'].includes(pathname);

const redirectAfterLogin = (navigate: NavigateFunction): void =>
	navigate('/login');

const onLogoutClick = (dispatch) => {
	dispatch(logoutThunk());
	localStorage.clear();
};

const Header: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuth, name } = useSelector((state: RootType) => state.user);
	const dispatch = useAppDispatch();
	return (
		<div className='header'>
			<div>
				<Logo />
			</div>
			<div className='navbar'>
				{!isLoginOrRegistration(location.pathname) &&
					(isAuth
						? userAuthenticatedHeader(name, () => onLogoutClick(dispatch))
						: userNotAuthenticatedHeader(() => redirectAfterLogin(navigate)))}
			</div>
		</div>
	);
};

export default Header;
