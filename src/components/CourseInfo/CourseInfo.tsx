import React, { FC } from 'react';
import Button from 'src/common/Button/Button';
import { BUTTON_VALUE_BACK } from 'src/constants';
import './styles.scss';

export interface CourseInfoProps {
	title: string;
	description: string;
	id: string;
	duration: string;
	creationDate: string;
	authors: string;
	onBackClick: () => void;
}

const CourseInfo: FC<CourseInfoProps> = (props: CourseInfoProps) => (
	<div className='course-info-container'>
		<h1>{props.title}</h1>
		<div className='course-info'>
			<div className='course-info-description'>
				<h3>Description:</h3>
				<p>{props.description}</p>
			</div>
			<ul>
				<li key='id'>
					<span>ID: </span>
					{props.id}
				</li>
				<li key='duration'>
					<span>Duration: </span>
					{props.duration}
				</li>
				<li key='creationDate'>
					<span>Created: </span>
					{props.creationDate}
				</li>
				<li key='authors'>
					<span>Authors: </span>
					{props.authors}
				</li>
			</ul>
		</div>
		<Button onClick={props.onBackClick} value={BUTTON_VALUE_BACK} />
	</div>
);

export default CourseInfo;
