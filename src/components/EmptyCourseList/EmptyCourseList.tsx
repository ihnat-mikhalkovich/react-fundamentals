import React, { FC } from 'react';
import './styles.scss';
import Button from 'src/common/Button/Button';
import {
	ALERT_BUTTON_DONT_WORK,
	BUTTON_VALUE_ADD_NEW_COURSE,
} from 'src/constants';

const EmptyCourseList: FC = () => (
	<div className='empty-list'>
		<h1>Your List Is Empty</h1>
		<p>Please use 'Add New Course' to add your first couse</p>
		<Button
			onClick={() => alert(ALERT_BUTTON_DONT_WORK)}
			value={BUTTON_VALUE_ADD_NEW_COURSE}
		/>
	</div>
);

export default EmptyCourseList;
