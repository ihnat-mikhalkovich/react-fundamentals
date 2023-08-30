import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initStoreState from '../initStoreState';

const initialState = initStoreState.user;

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<{
				name: string;
				email: string;
				token: string;
				role: string;
			}>
		) => {
			state.isAuth = true;
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.token = action.payload.token;
			state.role = action.payload.role;
		},
		logout: () => {
			return initialState;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
