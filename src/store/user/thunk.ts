import userService from '../../services/userService';
import { login, logout } from './userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';

export const getMeThunk = () => async (dispatch) => {
	try {
		const user = await userService.me();
		dispatch(login(user));
	} catch (e) {
		localStorage.clear();
	}
};

export const logoutThunk = () => async (dispatch) => {
	await userService.logout();
	dispatch(logout());
};
