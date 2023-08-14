import React, { FC, useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import CourseInfo from '../CourseInfo/CourseInfo';
import SearchBar from './components/SearchBar/SearchBar';
import Button from 'src/common/Button/Button';
import './styles.scss';
import {
	ALERT_BUTTON_DONT_WORK,
	BUTTON_VALUE_ADD_NEW_COURSE,
	mockedCoursesList,
} from 'src/constants';
import mapCoursesToCourseCardProps from './utils';

const Courses: FC = () => {
	const [course, setCourse] = useState(null);
	const [search, setSearch] = useState('');
	const [courses, setCourses] = useState(mockedCoursesList);
	if (course) {
		return (
			<CourseInfo
				{...course}
				authors={course.authorsList.join(', ')}
				onBackClick={() => setCourse(null)}
			/>
		);
	}

	const handleSubmit = () => {
		// setSearch(search.toLowerCase());
		const filtered = mockedCoursesList.filter((c) => {
			const isSearchInputInTitle = c.title
				.toLowerCase()
				.includes(search.toLowerCase());
			const isSearchInputEqualsId = c.id === search;
			return isSearchInputInTitle || isSearchInputEqualsId;
		});
		setCourses(filtered);
	};

	const handleOnChange = (inputValue: string) => {
		setSearch(inputValue);
	};

	return (
		<div className='courses'>
			<div className='options'>
				<SearchBar
					value={search}
					onSubmit={handleSubmit}
					onChange={handleOnChange}
				/>
				<Button
					value={BUTTON_VALUE_ADD_NEW_COURSE}
					onClick={() => alert(ALERT_BUTTON_DONT_WORK)}
				/>
			</div>
			<div className='cards'>
				{mapCoursesToCourseCardProps(courses).map((c) => (
					<CourseCard {...c} onShowCourseClick={() => setCourse(c)} />
				))}
			</div>
		</div>
	);
};

export default Courses;
