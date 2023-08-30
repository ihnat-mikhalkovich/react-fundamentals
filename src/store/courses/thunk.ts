import courseService from '../../services/courseService';
import { addCourse, deleteCourse, saveCourses } from './coursesSlice';
import Course from '../../types/Course';
import authorService from '../../services/authorService';
import { addAuthor } from '../authors/authorsSlice';

export const getCourses = () => async (dispatch) => {
	const courses = await courseService.findAll();
	dispatch(saveCourses(courses));
};

export const deleteCourseThunk = (courseId: string) => async (dispatch) => {
	await courseService.delete(courseId);
	dispatch(deleteCourse(courseId));
};

export const createAuthorsAndCourseThunk =
	(authorNames: string[], course: Course) => async (dispatch) => {
		const authors = await authorService.createAuthorBatch(authorNames);

		new Promise(() => authors.forEach((a) => dispatch(addAuthor(a))));

		course.authors = authors.map((a) => a.id);
		const backendCourse = await courseService.createCourse(course);
		dispatch(addCourse(backendCourse));
	};

export const createAuthorsAndUpdateCourseThunk =
	(authorNames: string[], course: Course) => async (dispatch) => {
		const authors = await authorService.createAuthorBatch(authorNames);
		new Promise(() => authors.forEach((a) => dispatch(addAuthor(a))));
		course.authors = authors.map((a) => a.id);
		const backendCourse = await courseService.update(course);
		dispatch(deleteCourse(course.id));
		dispatch(addCourse(backendCourse));
	};
