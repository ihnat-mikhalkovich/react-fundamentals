import './App.css';
import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { getMeThunk } from './store/user/thunk';

function App() {
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const dispatch = useAppDispatch();
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token && !isAuth) dispatch(getMeThunk());
	}, [dispatch]);
	return (
		<div className='App'>
			<Header />
			<div className={'container'}>
				<Outlet />
			</div>
		</div>
	);
}

export default App;
