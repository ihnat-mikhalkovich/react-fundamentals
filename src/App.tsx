import './App.css';
import React, { createContext, useState } from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './store/user/userSlice';

interface AuthContextType {
	isUserAuthenticated: boolean;
	username: string;
	onLoginClick: () => void;
	onLogoutClick: () => void;
}

const isUserLogged = () => !!localStorage.getItem('token');

export const AuthContext = createContext<AuthContextType>({
	isUserAuthenticated: false,
	username: '',
	onLoginClick: () => console.log('init data'),
	onLogoutClick: () => console.log('init data'),
});

const getUsername = () => localStorage.getItem('username');

function App() {
	const [isUserAuthenticated, setAuthenticated] = useState(isUserLogged());
	const [username, setUsername] = useState(getUsername());
	const dispatch = useDispatch();

	const onLogoutClick = () => {
		setAuthenticated(!isUserAuthenticated);
		dispatch(logout());
		localStorage.clear();
	};
	const onLoginClick = () => {
		setAuthenticated(true);
		setUsername(getUsername());
	};
	return (
		<div className='App'>
			<AuthContext.Provider
				value={{ isUserAuthenticated, username, onLoginClick, onLogoutClick }}
			>
				<Header />
				<div className={'container'}>
					<Outlet />
				</div>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
