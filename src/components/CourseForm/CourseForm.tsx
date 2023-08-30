import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Input from '../../common/Input/Input';
import './styles.scss';
import Textarea from '../../common/Textarea/Textarea';
import Button from '../../common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';
import Course from '../../types/Course';
import { onInputChange, onTextareaChange } from '../../helpers/onInputChange';
import getCourseDuration from '../../helpers/getCourseDuration';
import { hasErrors, validateCourse } from '../../helpers/validation';
import ErrorMessagesIfPresent from '../../common/ErrorMessage/ErrorMessagesIfPresent';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import {
	createAuthorsAndCourseThunk,
	createAuthorsAndUpdateCourseThunk,
} from '../../store/courses/thunk';
import courseService from '../../services/courseService';
import { CREATE_COURSE_TITLE, EDIT_COURSE_TITLE } from '../../constants';
import authorService from '../../services/authorService';

interface CourseErrors {
	title: string[];
	description: string[];
	duration: string[];
	authors: string[];
}

const courseErrorsInitState: CourseErrors = {
	title: [],
	description: [],
	duration: [],
	authors: [],
};

const courseInitState: Course = {
	id: null,
	title: '',
	description: '',
	creationDate: null,
	duration: 0,
	authors: [],
};

const CourseForm: FC = () => {
	const [course, setCourse] = useState<Course>(courseInitState);
	const [errors, setErrors] = useState<CourseErrors>(courseErrorsInitState);
	const [author, setAuthor] = useState('');
	const dispatch = useAppDispatch();

	const { courseId } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		if (!courseId) {
			return;
		}
		const fetchCourse = async () => {
			try {
				const c = await courseService.getCourseById(courseId);
				const fetchAuthors = async () => {
					const map = c.authors.map((id) =>
						authorService.getAuthorById(id).then((a) => a.name)
					);
					const names = await Promise.all(map);
					c.authors = names;
					setCourse(c);
				};
				fetchAuthors();
			} catch (e) {
				navigate('/');
			}
		};
		fetchCourse();
	}, [courseId]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		onInputChange(course, setCourse)(e);
	};

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onTextareaChange(course, setCourse)(e);
	};

	const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setAuthor(e.target.value);
	};

	const handleAddAuthor = () => {
		if (!author) return;
		setCourse((prev) => ({
			...prev,
			authors: [...prev.authors, author],
		}));
		setAuthor('');
	};

	const handleSubmitAddAuthor = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleAddAuthor();
	};

	const handleRemoveAuthor = (authorName: string) => () => {
		setCourse((prev) => ({
			...prev,
			authors: prev.authors.filter((a) => a !== authorName),
		}));
	};

	const validateForm = () => {
		const e = validateCourse({ ...course });
		setErrors(e as CourseErrors);
		return e;
	};

	const handleCreateCourse = () => {
		const e = validateForm();
		if (hasErrors(e)) {
			console.log(e);
			return;
		}
		const createAuthorsAndCourse = async () => {
			try {
				await dispatch(createAuthorsAndCourseThunk(course.authors, course));
				navigate('/courses');
			} catch (e) {
				console.log(e);
				alert('i cant save the course, check console');
			}
		};
		createAuthorsAndCourse();
	};

	const handleEditCourse = () => {
		const e = validateForm();
		if (hasErrors(e)) {
			console.log(e);
			return;
		}
		const createAuthorsAndUpdateCourse = async () => {
			try {
				await dispatch(
					createAuthorsAndUpdateCourseThunk(course.authors, course)
				);
				navigate('/courses');
			} catch (e) {
				console.log(e);
				alert('i cant update the course, check console');
			}
		};
		createAuthorsAndUpdateCourse();
	};

	return (
		<div className={'course-container'}>
			<h1>{courseId ? EDIT_COURSE_TITLE : CREATE_COURSE_TITLE}</h1>
			<div className={'course-info'}>
				<div className={'create-course-form'}>
					<div className={'main-info-container'}>
						<h2>Main Info</h2>
						<Input
							label={'Title'}
							value={course.title}
							onChange={handleInputChange}
							type={'text'}
						/>
						{ErrorMessagesIfPresent(errors.title)}
						<Textarea
							label={'Description'}
							value={course.description}
							onChange={handleTextareaChange}
						/>
						{ErrorMessagesIfPresent(errors.description)}
					</div>
					<div className={'duration-and-authors'}>
						<div className={'duration'}>
							<h2>Duration</h2>
							<div className={'duration-input'}>
								<Input
									label={'Duration'}
									value={course.duration.toString()}
									onChange={handleInputChange}
									type={'number'}
								/>
								<span className={'hours'}>
									<span>{getCourseDuration(course.duration)}</span>
								</span>
							</div>
						</div>
						{ErrorMessagesIfPresent(errors.duration)}
						<div className={'authors'}>
							<h2>Authors</h2>
							<form
								className={'create-author'}
								onSubmit={handleSubmitAddAuthor}
							>
								<Input
									label={'Authors'}
									value={author}
									onChange={handleAuthorChange}
									type={'text'}
								/>
								<Button component={'Authors'} />
							</form>
							{ErrorMessagesIfPresent(errors.authors)}
							{!!course.authors.length && (
								<div className={'author-list'}>
									<h3>Author List</h3>
									<div className={'author-items'}>
										{course.authors.map((name) => (
											<AuthorItem
												key={name}
												authorName={name}
												onDelete={handleRemoveAuthor(name)}
											/>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className={'buttons'}>
				<Button component={'cancel'} onClick={() => navigate('/')} />
				{courseId ? (
					<Button component={'edit course'} onClick={handleEditCourse} />
				) : (
					<Button component={'create course'} onClick={handleCreateCourse} />
				)}
			</div>
		</div>
	);
};

export default CourseForm;
