import React, { FC, useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from 'src/common/Button/Button';
import './styles.scss';
import { BUTTON_VALUE_ADD_NEW_COURSE, mockedCoursesList } from 'src/constants';
import mapCoursesToCourseCardProps from './utils';
import { useNavigate } from 'react-router-dom';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

const Courses: FC = () => {
	const [search, setSearch] = useState('');
	const [courses, setCourses] = useState(mockedCoursesList);
	const navigate = useNavigate();

	if (!courses.length) {
		return <EmptyCourseList />;
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
					onClick={() => navigate('/courses/add')}
				/>
			</div>
			<div className='cards'>
				{mapCoursesToCourseCardProps(courses).map((c) => (
					<CourseCard
						{...c}
						onShowCourseClick={() => navigate(`/courses/${c.id}`)}
					/>
				))}
			</div>
		</div>
	);
};

export default Courses;
