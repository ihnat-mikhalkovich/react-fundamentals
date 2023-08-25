import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Courses from './components/Courses/Courses';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path={'/'} element={<Navigate to={'/courses'} replace />} />
			<Route path='/' element={<App />}>
				<Route path='courses' element={<Courses />} />
				<Route path='courses/add' element={<CreateCourse />} />
				<Route path='courses/:courseId' element={<CourseInfo />} />
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Registration />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
