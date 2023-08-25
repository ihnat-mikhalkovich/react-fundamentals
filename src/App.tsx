import './App.css';
import React, { createContext, useContext, useState } from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';

interface AuthContextType {
	isUserAuthenticated: boolean;
	username: string;
	login: () => void;
	logout: () => void;
}

const isUserLogged = () => !!localStorage.getItem('token');

export const AuthContext = createContext<AuthContextType>({
	isUserAuthenticated: false,
	username: '',
	login: () => console.log('init data'),
	logout: () => console.log('init data'),
});

const getUsername = () => localStorage.getItem('username');

function App() {
	const [isUserAuthenticated, setAuthenticated] = useState(isUserLogged());
	const [username, setUsername] = useState(getUsername());
	const logout = () => {
		setAuthenticated(!isUserAuthenticated);
		localStorage.clear();
	};
	const login = () => {
		setAuthenticated(true);
		setUsername(getUsername());
	};
	return (
		<div className='App'>
			<AuthContext.Provider
				value={{ isUserAuthenticated, username, login, logout }}
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
