import React, { FC, useEffect, useState } from 'react';
import Button from 'src/common/Button/Button';
import './styles.scss';
import courseService from '../../services/courseService';
import { Link, useParams } from 'react-router-dom';
import Course from '../../types/Course';
import { BUTTON_VALUE_BACK } from '../../constants';

const courseInitState: Course = {
	title: '',
	description: '',
	id: '',
	duration: 0,
	creationDate: '',
	authors: [],
};

const CourseInfo: FC = () => {
	const { courseId } = useParams();
	const [course, setCourse] = useState<Course>(courseInitState);
	useEffect(() => {
		courseService
			.getCourseById(courseId)
			.then((course) => setCourse(course))
			.catch(() => alert('I cant give the page'));
	}, []);
	return (
		<div className='course-info-container'>
			<h1>{course.title}</h1>
			<div className='course-info'>
				<div className='course-info-description'>
					<h3>Description:</h3>
					<p>{course.description}</p>
				</div>
				<ul>
					<li key='id'>
						<span>ID: </span>
						{course.id}
					</li>
					<li key='duration'>
						<span>Duration: </span>
						{course.duration}
					</li>
					<li key='creationDate'>
						<span>Created: </span>
						{course.creationDate}
					</li>
					<li key='authors'>
						<span>Authors: </span>
						{course.authors}
					</li>
				</ul>
			</div>

			<Button component={<Link to={'/courses'}>{BUTTON_VALUE_BACK}</Link>} />
		</div>
	);
};

export default CourseInfo;
