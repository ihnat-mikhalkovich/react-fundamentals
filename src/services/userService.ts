import axiosInstance from './axiosInstance';
import { AxiosInstance } from 'axios';

export interface RegistrationData {
	name: string;
	email: string;
	password: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface User {
	email: string;
	name: string;
	role: string;
}

interface LoginResponse {
	user: User;
	successful: boolean;
	result: string;
}

interface MeResponse {
	result: User;
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
		if (loginResponse.successful) {
			localStorage.setItem('token', loginResponse.result);
			localStorage.setItem('username', loginResponse.user.name);
		}
		return loginResponse.user;
	}
	async logout(data: LoginData): Promise<boolean> {
		return new Promise(() => true);
	}

	async me(): Promise<User> {
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
