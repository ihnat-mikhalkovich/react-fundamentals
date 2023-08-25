import React, { ChangeEvent, FC } from 'react';
import Button from '../../../../common/Button/Button';
import { ReactComponent as DeleteIcon } from './delete.svg';
import './styles.scss';

export interface AuthorItemProps {
	authorName: string;
	onDelete: () => void;
}

const AuthorItem: FC<AuthorItemProps> = (props: AuthorItemProps) => {
	return (
		<div className={'author-item'}>
			<span>{props.authorName}</span>
			<span>+</span>
			<Button value={<DeleteIcon />} onClick={props.onDelete} />
		</div>
	);
};

export default AuthorItem;
