import axiosInstance from './axiosInstance';
import { AxiosInstance } from 'axios';
import Author from '../types/Author';

interface AuthorResponse<T> {
	successful: boolean;
	result: T;
}

class AuthorService {
	constructor(private axios: AxiosInstance) {}

	async createAuthor(author: string): Promise<Author> {
		const response = await axiosInstance.post<AuthorResponse<Author>>(
			`/authors/add`,
			{ author },
			{
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			}
		);
		return response.data.result;
	}
	async createAuthorBatch(authors: string[]): Promise<Author[]> {
		return await Promise.all(authors.map((a) => this.createAuthor(a)));
	}
}

export default new AuthorService(axiosInstance);
