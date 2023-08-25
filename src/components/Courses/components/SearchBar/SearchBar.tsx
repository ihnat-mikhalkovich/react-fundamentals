import React, { ChangeEvent, FC } from 'react';
import Button from 'src/common/Button/Button';
import Input from 'src/common/Input/Input';
import {
	BUTTON_VALUE_SEARCH,
	FORM_PLACEHOLDER,
	SEARCH_FORM_LABEL,
} from 'src/constants';
import './styles.scss';

export interface SearchBarProps {
	value: string;
	onChange: (inputValue: string) => void;
	onSubmit: () => void;
}

const SearchBar: FC<SearchBarProps> = (props: SearchBarProps) => {
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		props.onChange(e.target.value);
	};

	const handleClick = () => {
		props.onSubmit();
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleClick();
	};

	return (
		<form className='search-bar' onSubmit={handleSubmit}>
			<Input
				type='search'
				label={SEARCH_FORM_LABEL}
				placeholder={FORM_PLACEHOLDER}
				onChange={handleOnChange}
				value={props.value}
			/>
			<Button value={BUTTON_VALUE_SEARCH} onClick={handleClick} />
		</form>
	);
};

export default SearchBar;
