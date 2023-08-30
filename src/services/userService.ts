import axiosInstance from './axiosInstance';
import { AxiosInstance } from 'axios';
import User from '../types/User';

export interface RegistrationData {
	name: string;
	email: string;
	password: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface UserResponse {
	email: string;
	name: string;
	role: string;
}

interface LoginResponse {
	user: UserResponse;
	successful: boolean;
	result: string;
}

interface MeResponse {
	result: UserResponse;
}

class UserService {
	constructor(private axios: AxiosInstance) {}

	async register(data: RegistrationData): Promise<boolean> {
		try {
			await this.axios.post('/register', data);
		} catch (e) {
			return false;
		}
		return true;
	}

	async login(data: LoginData): Promise<User> {
		const response = await this.axios.post<LoginResponse>('/login', data);
		const loginResponse = response.data;
		return {
			role: '',
			email: loginResponse.user.email,
			name: loginResponse.user.name,
			token: loginResponse.result,
			isAuth: true,
		};
	}

	async logout(): Promise<void> {
		const token = localStorage.getItem('token');
		await this.axios.delete('/logout', {
			headers: {
				Authorization: token,
			},
		});
	}

	async me(): Promise<User> {
		const token = localStorage.getItem('token');
		const response = await this.axios.get<MeResponse>('/users/me', {
			headers: {
				Authorization: token,
			},
		});
		const user = response.data.result;

		return {
			name: user.name,
			email: user.email,
			token: token,
			isAuth: true,
			role: user.role,
		};
	}
}

export default new UserService(axiosInstance);
