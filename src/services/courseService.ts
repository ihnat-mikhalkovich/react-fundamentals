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
		const response = await axiosInstance.post<CourseResponse<Course>>(
			`/courses/add`,
			course,
			{
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			}
		);
		return response.data.result;
	}
	async getCourseById(courseId: string): Promise<Course> {
		const response = await axiosInstance.get<CourseResponse<Course>>(
			`/courses/${courseId}`
		);
		return response.data.result;
	}

	async findAll(): Promise<Course[]> {
		const response = await axiosInstance.get<CourseResponse<Course[]>>(
			'/courses/all'
		);
		return response.data.result;
	}
}

export default new CourseService(axiosInstance);
