import React, { FC } from 'react';
import Button from 'src/common/Button/Button';
import { ReactComponent as EditIcon } from './edit.svg';
import { ReactComponent as RemoveIcon } from './remove.svg';
import {
	ALERT_BUTTON_DONT_WORK,
	BUTTON_VALUE_SHOW_COURSE,
} from 'src/constants';
import './styles.scss';
import { deleteCourse } from '../../../../store/courses/coursesSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteCourseThunk } from '../../../../store/courses/thunk';
import { Navigate, useNavigate } from 'react-router-dom';
import { forAdminView } from '../../../../common/ForRole/ForRole';

export interface CourseCardProps {
	id: string;
	title: string;
	description: string;
	authorsList: string[];
	duration: string;
	creationDate: string;
	onShowCourseClick: () => void;
}

const adminButtons = (onDelete, navigate, courseId) => (
	<>
		<Button onClick={onDelete} component={<RemoveIcon />} />
		<Button
			onClick={() => navigate(`/courses/${courseId}/update`)}
			component={<EditIcon />}
		/>
	</>
);

const CourseCard: FC<CourseCardProps> = (props: CourseCardProps) => {
	const dispatch = useAppDispatch();
	const role = useAppSelector((state) => state.user.role);
	const navigate = useNavigate();
	const onDeleteClick = (courseId: string) => {
		dispatch(deleteCourseThunk(courseId));
	};
	return (
		<div className='courseCard'>
			<h2>{props.title}</h2>
			<div className='payload'>
				<p>{props.description}</p>
				<div className='info'>
					<ul>
						<li>
							<span>Authors: </span>
							{props.authorsList.join(', ')}
						</li>
						<li>
							<span>Duration: </span>
							{props.duration}
						</li>
						<li>
							<span>Created: </span>
							{props.creationDate}
						</li>
					</ul>
					<div className='buttons'>
						<Button
							onClick={props.onShowCourseClick}
							component={BUTTON_VALUE_SHOW_COURSE}
						/>
						{forAdminView(
							adminButtons(() => onDeleteClick(props.id), navigate, props.id)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
