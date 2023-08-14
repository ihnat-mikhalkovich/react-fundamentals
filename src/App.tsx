import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Course from './types/Course';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';
import { mockedCoursesList } from './constants';

function App() {
	const findComponent = (courses: Course[]) => {
		if (courses.length) {
			return <Courses />;
		} else {
			return <EmptyCourseList />;
		}
	};
	return (
		<div className='App'>
			<Header />
			<div className='container'>{findComponent(mockedCoursesList)}</div>
		</div>
	);
}

export default App;
