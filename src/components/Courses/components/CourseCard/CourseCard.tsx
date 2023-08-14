import React, { FC } from 'react';
import Button from 'src/common/Button/Button';
import { ReactComponent as EditIcon } from './edit.svg';
import { ReactComponent as RemoveIcon } from './remove.svg';
import {
	BUTTON_VALUE_SHOW_COURSE,
	ALERT_BUTTON_DONT_WORK,
} from 'src/constants';
import './styles.scss';

export interface CourseCardProps {
	id: string;
	title: string;
	description: string;
	authorsList: string[];
	duration: string;
	creationDate: string;
	onShowCourseClick: () => void;
}

const CourseCard: FC<CourseCardProps> = (props: CourseCardProps) => (
	<div className='courseCard'>
		<h2>{props.title}</h2>
		<div className='payload'>
			<p>{props.description}</p>
			<div className='info'>
				<ul>
					<li key={props.id + '-authors'}>
						<span>Authors: </span>
						{props.authorsList.join(', ')}
					</li>
					<li key={props.id + '-duration'}>
						<span>Duration: </span>
						{props.duration}
					</li>
					<li key={props.id + '-creationDate'}>
						<span>Created: </span>
						{props.creationDate}
					</li>
				</ul>
				<div className='buttons'>
					<Button
						onClick={props.onShowCourseClick}
						value={BUTTON_VALUE_SHOW_COURSE}
					/>
					<Button
						onClick={() => alert(ALERT_BUTTON_DONT_WORK)}
						value={<RemoveIcon />}
					/>
					<Button
						onClick={() => alert(ALERT_BUTTON_DONT_WORK)}
						value={<EditIcon />}
					/>
				</div>
			</div>
		</div>
	</div>
);

export default CourseCard;
