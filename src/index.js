import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import Courses from './components/Courses/Courses';
import store from './store';
import { Provider } from 'react-redux';
import { forAdmin, forGuest, forUser } from './common/ForRole/ForRole';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path={'/'} element={<Navigate to={'/courses'} replace />} />
				<Route path='/' element={<App />}>
					<Route path='courses' element={forUser(<Courses />)} />
					<Route path='courses/add' element={forAdmin(<CourseForm />)} />
					<Route path='courses/:courseId' element={forUser(<CourseInfo />)} />
					<Route
						path='courses/:courseId/update'
						element={forAdmin(<CourseForm />)}
					/>
					<Route path='login' element={forGuest(<Login />)} />
					<Route path='registration' element={forGuest(<Registration />)} />
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
);
