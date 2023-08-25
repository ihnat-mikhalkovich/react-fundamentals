import React, { FC } from 'react';
import './styles.scss';
import Button from 'src/common/Button/Button';
import { BUTTON_VALUE_ADD_NEW_COURSE } from 'src/constants';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const adminView = (navigate: NavigateFunction) => (
	<>
		<p>Please use 'Add New Course' to add your first course</p>
		<Button
			onClick={() => navigate('/courses/add')}
			value={BUTTON_VALUE_ADD_NEW_COURSE}
		/>
	</>
);

const userView = () => (
	<>
		<p>Please use 'Add New Course' to add your first course</p>
		<p>You don't have permissions to create a course. Please log in as ADMIN</p>
	</>
);

const isUserAdmin = () => localStorage.getItem('role') === 'admin';

const EmptyCourseList: FC = () => {
	const navigate = useNavigate();
	return (
		<div className='empty-list'>
			<h1>Your List Is Empty</h1>
			{isUserAdmin() ? adminView(navigate) : userView()}
		</div>
	);
};

export default EmptyCourseList;
