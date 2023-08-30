import React, { FC, useEffect, useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from 'src/common/Button/Button';
import './styles.scss';
import { BUTTON_VALUE_ADD_NEW_COURSE } from 'src/constants';
import mapCoursesToCourseCardProps from './utils';
import { useNavigate } from 'react-router-dom';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import { RootType } from '../../store/rootReducer';
import { getCourses } from '../../store/courses/thunk';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthors } from '../../store/authors/thunk';
import { selectByNameOrByIdPredicate } from '../../store/courses/coursesSlice';
import { forAdminView } from '../../common/ForRole/ForRole';

const Courses: FC = () => {
	const [search, setSearch] = useState('');
	const [currentSearch, setCurrentSearch] = useState('');
	const courses = useAppSelector((state) =>
		selectByNameOrByIdPredicate(state, currentSearch)
	);
	const authors = useAppSelector((state: RootType) => state.authors.authors);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchData = async () => {
			await dispatch(getAuthors());
			dispatch(getCourses());
		};
		fetchData();
	}, [dispatch]);

	if (!courses.length) {
		return <EmptyCourseList />;
	}

	const handleSubmit = () => {
		setCurrentSearch(search);
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
				{forAdminView(
					<Button
						component={BUTTON_VALUE_ADD_NEW_COURSE}
						onClick={() => navigate('/courses/add')}
					/>
				)}
			</div>
			<div className='cards'>
				{mapCoursesToCourseCardProps(courses, authors).map((c) => (
					<CourseCard
						key={c.id}
						{...c}
						onShowCourseClick={() => navigate(`/courses/${c.id}`)}
					/>
				))}
			</div>
		</div>
	);
};

export default Courses;
