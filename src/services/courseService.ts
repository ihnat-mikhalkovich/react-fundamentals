import axiosInstance from './axiosInstance';
import { AxiosInstance } from 'axios';
import Course from '../types/Course';

interface CourseResponse<T> {
	successful: boolean;
	result: T;
}

class CourseService {
	constructor(private axios: AxiosInstance) {}

	async createCourse(course: Course): Promise<Course> {
		const response = await this.axios.post<CourseResponse<Course>>(
			`/courses/add`,
			{
				title: course.title,
				description: course.description,
				authors: course.authors,
				duration: Number(course.duration),
			},
			{
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			}
		);
		return response.data.result;
	}

	async getCourseById(courseId: string): Promise<Course> {
		const response = await this.axios.get<CourseResponse<Course>>(
			`/courses/${courseId}`
		);
		return response.data.result;
	}

	async findAll(): Promise<Course[]> {
		const response = await this.axios.get<CourseResponse<Course[]>>(
			'/courses/all'
		);
		return response.data.result;
	}

	async delete(courseId: string) {
		await this.axios.delete(`/courses/${courseId}`, {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		});
	}

	async update(course: Course) {
		const data = {
			title: course.title,
			description: course.description,
			authors: course.authors,
			duration: Number(course.duration),
		};
		const response = await this.axios.put<CourseResponse<Course>>(
			`/courses/${course.id}`,
			data,
			{
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			}
		);
		return response.data.result;
	}
}

export default new CourseService(axiosInstance);
