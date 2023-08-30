import axiosInstance from './axiosInstance';
import { AxiosInstance } from 'axios';
import Author from '../types/Author';
import Course from '../types/Course';

interface AuthorResponse<T> {
	successful: boolean;
	result: T;
}

class AuthorService {
	constructor(private axios: AxiosInstance) {}

	async createAuthor(author: string): Promise<Author> {
		const response = await this.axios.post<AuthorResponse<Author>>(
			`/authors/add`,
			{ name: author },
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
	async getAuthorById(authorId: string): Promise<Author> {
		const response = await this.axios.get<AuthorResponse<Author>>(
			`/authors/${authorId}`
		);
		return response.data.result;
	}
	async findAll(): Promise<Author[]> {
		const response = await this.axios.get<AuthorResponse<Author[]>>(
			'/authors/all'
		);
		return response.data.result;
	}
}

export default new AuthorService(axiosInstance);
