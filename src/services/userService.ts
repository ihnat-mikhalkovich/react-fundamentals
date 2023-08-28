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
		await this.axios.post('/register', data);
		return new Promise(() => true);
	}

	async login(data: LoginData): Promise<User> {
		const response = await this.axios.post<LoginResponse>('/login', data);
		const loginResponse = response.data;
		return {
			email: loginResponse.user.email,
			name: loginResponse.user.name,
			token: loginResponse.result,
			isAuth: true,
		};
	}

	async me(): Promise<UserResponse> {
		const response = await this.axios.get<MeResponse>('/users/me', {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		});
		const user = response.data.result;
		localStorage.setItem('role', user.role);
		return user;
	}
}

export default new UserService(axiosInstance);
