import React, { ChangeEvent, FC, useState } from 'react';
import Input from '../../common/Input/Input';
import './styles.scss';
import Textarea from '../../common/Textarea/Textarea';
import Button from '../../common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';
import Course from '../../types/Course';
import { onInputChange, onTextareaChange } from '../../helpers/onInputChange';
import getCourseDuration from '../../helpers/getCourseDuration';
import { hasErrors, validateCourse } from '../../helpers/validation';
import errorMessagesIfPresent from '../../helpers/errorMessagesIfPresent';
import courseService from '../../services/courseService';
import authorService from '../../services/authorService';
import { useNavigate } from 'react-router-dom';

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

const CreateCourse: FC = () => {
	const [course, setCourse] = useState<Course>(courseInitState);
	const [errors, setErrors] = useState<CourseErrors>(courseErrorsInitState);
	const [author, setAuthor] = useState('');

	const navigate = useNavigate();

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
		alert('everything is fine');
		authorService
			.createAuthorBatch(course.authors)
			.then((authors) => authors.map((a) => a.id))
			.then((authorIds) =>
				courseService.createCourse({
					...course,
					authors: authorIds,
				})
			)
			.then(() => navigate('/courses'));
	};

	return (
		<div className={'course-container'}>
			<h1>Create Course</h1>
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
						{errorMessagesIfPresent(errors.title)}
						<Textarea
							label={'Description'}
							value={course.description}
							onChange={handleTextareaChange}
						/>
						{errorMessagesIfPresent(errors.description)}
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
						{errorMessagesIfPresent(errors.duration)}
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
								<Button value={'Authors'} />
							</form>
							{errorMessagesIfPresent(errors.authors)}
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
				<Button value={'cancel'} />
				<Button value={'create course'} onClick={handleCreateCourse} />
			</div>
		</div>
	);
};

export default CreateCourse;
