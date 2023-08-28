import React, { FC, useEffect, useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from 'src/common/Button/Button';
import './styles.scss';
import { BUTTON_VALUE_ADD_NEW_COURSE } from 'src/constants';
import mapCoursesToCourseCardProps, {
	searchByNameOrByIdPredicate,
} from './utils';
import { useNavigate } from 'react-router-dom';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import courseService from '../../services/courseService';
import { useDispatch, useSelector } from 'react-redux';
import { RootType } from '../../store/rootReducer';
import { saveCourses } from '../../store/courses/coursesSlice';
import authorService from '../../services/authorService';
import { saveAuthors } from '../../store/authors/authorsSlice';

const Courses: FC = () => {
	const [search, setSearch] = useState('');
	const courses = useSelector((state: RootType) => state.courses.courses);
	const authors = useSelector((state: RootType) => state.authors.authors);
	const [filteredCourses, setFilteredCourses] = useState(courses);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {
		Promise.all([courseService.findAll(), authorService.findAll()])
			.then(([courseItems, authorItems]) => {
				dispatch(saveCourses(courseItems));
				dispatch(saveAuthors(authorItems));
			})
			.catch(() => {
				console.log('Failed to fetch data');
			});
	}, [dispatch]);

	useEffect(() => {
		setFilteredCourses(courses);
	}, [courses]);

	if (!courses.length) {
		return <EmptyCourseList />;
	}

	const handleSubmit = () => {
		setFilteredCourses(courses.filter(searchByNameOrByIdPredicate(search)));
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
				{mapCoursesToCourseCardProps(filteredCourses, authors).map((c) => (
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
